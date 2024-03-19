import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { itemMaster } from 'src/app/models/Class/stationary';

import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { StationaryService } from 'src/app/services/master-service/stationary.service';

@Component({
  selector: 'app-ticketentry-master',
  templateUrl: './ticket-entry.component.html',
  styleUrls: ['./ticket-entry.component.scss']
})
export class CreateTicketComponent implements OnInit {
  constructor(private formbuilder:FormBuilder,private masterservice:CountryMasterService,private stryservice:StationaryService,
    private toastrService:ToastrService, 
    private routes:Router, private cs:CommonServiceService,//for id
    private router:ActivatedRoute){
    
      this.UserId=this.cs.login_User_Code()//for id
    }
    UserId:any
    formTicketaster!: FormGroup ;
  submitted!: true
  countryList:any=[]
  unitTypeList: any = []
  itemCodeList: any = []

  itemDetailsById:any=""
  ngOnInit(): void {
    this.formTicketaster = this.formbuilder.group({
      itemCode:['',Validators.required],
      itemName: ['', Validators.required],
      defaultUnitType:['',Validators.required],
      numberOfSheet: ['',Validators.required],
      isNumbered : ["Y"],
      isActive: [true],
      categoryId : ['',Validators.required],
      itemDescription : [,Validators.required]
      })
   // this.getCountryList()
    this.getAllGeneralMasterDropDown()
    this.router.params.subscribe((res) => {
     let itemMasterId = res.data
      if (itemMasterId) {
        this.stryservice.getAllItemListDetailsById(itemMasterId).subscribe((res: any) => {
          this.itemDetailsById = res.data
          this.formTicketaster.patchValue(res.data)
        })
      }
    })
  }

  getAllGeneralMasterDropDown() {

    this.masterservice.getGeneralMasterByCodeTyoeId(97).subscribe((res: any) => {
      this.itemCodeList = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(98).subscribe((res: any) => {
      this.unitTypeList = res.data
    })
  
  }
  get f() {
    return this.formTicketaster.controls;
  }

  ItemSubmit(){
    this.submitted = true;
    if (this.formTicketaster.invalid) {
      return
    }
    var itemJson = new itemMaster
    itemJson = this.formTicketaster.value
    if(this.itemDetailsById.itemId==undefined){itemJson.createdBy =  1}
    else{itemJson.updatedBy =  1 ;itemJson.itemId=this.itemDetailsById.itemId}
    
    console.log(itemJson)
    if(this.itemDetailsById==""){
      this.stryservice.createItem(itemJson).subscribe((result) => {

        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/item-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
  
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formTicketaster.get(err.error.Errors[prop]?.PropertyName);
              //wrong key comes 
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: err.error.Errors[prop]?.ErrorMessage
                });
              }
            });
  
          }
          this.toastrService.error('some thing went wrong', 'Error !');
        }
      })
     
    }else{
      this.stryservice.editItemMaster(itemJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/item-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
  
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formTicketaster.get(err.error.Errors[prop]?.PropertyName);
              //wrong key comes 
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: err.error.Errors[prop]?.ErrorMessage
                });
              }
            });
  
          }
          this.toastrService.error('some thing went wrong', 'Error !');
        }
      })
    }

}}

