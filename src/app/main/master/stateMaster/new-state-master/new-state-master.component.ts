import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { stateMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-create-state-master-new',
  templateUrl: './new-state-master.component.html',
  styleUrls: ['./new-state-master.component.scss']
})
export class NewStateMasterComponent implements OnInit {
  constructor(private formbuilder:FormBuilder,private masterservice:CountryMasterService,
    private toastrService:ToastrService, 
    private routes:Router, private cs:CommonServiceService,//for id
    private router:ActivatedRoute){
      
      this.UserId=this.cs.login_User_Code()//for id
    }
    UserId:any
  formStateMaster!: FormGroup;
  submitted!: true
  countryList:any=[]
  statwDetailsById:any=""
  ngOnInit(): void {
    this.formStateMaster = this.formbuilder.group({
      countryId:['',Validators.required],
      shortCode: ['', [Validators.required, Validators.pattern("^[a-zA-Z]{2,}")]],
      stateName: ['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z]{3,}(?: [a-zA-Z]+)*$')]],
      stateCode: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{2,}")]],
      gstIn: ['',[Validators.required, 
        Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)]],
      isActive: [true]
    })
    this.getCountryList()
    this.router.params.subscribe((res) => {
      
      let stateMasterId = res.data
      if (stateMasterId) {
        this.masterservice.getAllStateListDetailsById(stateMasterId).subscribe((res: any) => {
          this.statwDetailsById = res.data
          this.formStateMaster.patchValue(res.data)
        })
      }
    })
  }
  get f() {
    return this.formStateMaster.controls;
  }
  getCountryList() {
    this.masterservice.getAllCountryList().subscribe((res: any) => {
      this.countryList = res.data
    })
  }
  StateSubmit(){
    this.submitted = true;
    if (this.formStateMaster.invalid) {
      return
    }
    var stateJson = new stateMaster
    stateJson = this.formStateMaster.value
    if(this.statwDetailsById.stateId==undefined){stateJson.createdBy =  +this.UserId}
    else{stateJson.updatedBy =  +this.UserId ;stateJson.stateId=this.statwDetailsById.stateId}
    
    console.log(stateJson)
    if(this.statwDetailsById==""){
      this.masterservice.createState(stateJson).subscribe((result) => {

        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/state-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
  
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formStateMaster.get(err.error.Errors[prop]?.PropertyName);
              //wrong key comes 
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: err.error.Errors[prop]?.ErrorMessage
                });
              }
            });
  
          }
          this.toastrService.error(err.error.Message, `Error statu:${err.status}`);
        }
      })
     
    }else{
      this.masterservice.editStateMaster(stateJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/state-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
  
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formStateMaster.get(err.error.Errors[prop]?.PropertyName);
              //wrong key comes 
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: err.error.Errors[prop]?.ErrorMessage
                });
              }
            });
  
          }
          this.toastrService.error(err.error.Message, `Error statu:${err.status}`);
        }
      })
    }

}}
