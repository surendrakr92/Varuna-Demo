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
  selector: 'app-createitem-master',
  templateUrl: './create-item-master.component.html',
  styleUrls: ['./create-item-master.component.scss']
})
export class CreateMasterComponent implements OnInit {
  constructor(private formbuilder: FormBuilder, private masterservice: CountryMasterService, private stryservice: StationaryService,
    private toastrService: ToastrService,
    private routes: Router, private cs: CommonServiceService,//for id
    private router: ActivatedRoute) {

    this.UserId = this.cs.login_User_Code()//for id
  }
  UserId: any
  formItemMaster!: FormGroup;
  submitted!: true
  countryList: any = []
  unitTypeList: any = []
  itemCodeList: any = []
  itemChecked:boolean=false;

  itemDetailsById: any = ""
  ngOnInit(): void {
    this.formItemMaster = this.formbuilder.group({
      itemCode: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]+$/)]],
      itemName: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]+$/)]],
      defaultUnitType: ['', [Validators.required]],
      numberOfSheet: ['', [Validators.required, Validators.max(500), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      isNumbered: ['N'],
      isActive: [true],
      categoryId: ['', Validators.required],
      itemDescription: [, [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]]
    })
    // this.getCountryList()
    this.getAllGeneralMasterDropDown()
    this.router.params.subscribe((res) => {
      let itemMasterId = res.data
      if (itemMasterId) {
        this.stryservice.getAllItemListDetailsById(itemMasterId).subscribe((res: any) => {
          this.itemDetailsById = res.data
          this.formItemMaster.patchValue(res.data)
          if(res.data.isNumbered == 'Y'){
            this.itemChecked = true;
          }
          else
          {
            this.itemChecked = false;
          }
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
    return this.formItemMaster.controls;
  }
  isNumberedEvent(values: any): void {
    if(values.currentTarget.checked == true)
    {
      this.formItemMaster.get('isNumbered')?.setValue('Y');
    }
    else
    {
      this.formItemMaster.get('isNumbered')?.setValue('N');
    }
  }

  ItemSubmit() {
    this.submitted = true;
    if (this.formItemMaster.invalid) {
      return
    }
    var itemJson = new itemMaster
    itemJson = this.formItemMaster.value
    if (this.itemDetailsById.itemId == undefined) { itemJson.createdBy = 1 }
    else { itemJson.updatedBy = 1; itemJson.itemId = this.itemDetailsById.itemId }

    console.log(itemJson)
    if (this.itemDetailsById == "") {
      this.stryservice.createItem(itemJson).subscribe((result) => {

        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['stationery/item-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formItemMaster.get(err.error.Errors[prop]?.PropertyName);
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

    } else {
      this.stryservice.editItemMaster(itemJson).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['stationery/item-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formItemMaster.get(err.error.Errors[prop]?.PropertyName);
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

  }
}

