import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from 'src/app/models/api-response';
import { pinCodeMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-new-pincode',
  templateUrl: './new-pincode.component.html',
  styleUrls: ['./new-pincode.component.scss']
})
export class NewPincodeComponent implements OnInit {

  constructor(private formbuilder: FormBuilder,
    public masterservice: CountryMasterService,
    private toastrService: ToastrService,
    public routes: Router,private cs:CommonServiceService,//for id
    private router: ActivatedRoute) { 
      this.UserId=this.cs.login_User_Code()//for id
    }
    UserId:any
  formPinCodeMaster!: FormGroup;
  submitted!: true;
  stateList: any;
  pinCodeDetailsById: any = ""
  countryList: any = []
  cityList: any = []
  ngOnInit(): void {
    this.formPinCodeMaster = this.formbuilder.group({
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      area: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern("[1-9][0-9]{4,5}")]],
      cityId: ['', Validators.required],
    })
    this.getCountryList()
    this.router.params.subscribe((res) => {
      debugger
      let stateMasterId = res.data
      if (stateMasterId) {
        this.masterservice.getPincodeListDetailsById(stateMasterId).subscribe((res: any) => {
          this.pinCodeDetailsById = res.data
          this.getStateList(res.data.countryId)
          this.getcityList(res.data.stateId)
          this.formPinCodeMaster.patchValue(res.data)
        })
      }
    })
  }
  get f() {
    return this.formPinCodeMaster.controls;
  }
  pinCodesubmit() {
    this.submitted = true;
    if (this.formPinCodeMaster.invalid) {
      return
    }
    var stateJson = new pinCodeMaster
    stateJson = this.formPinCodeMaster.value
    if (this.pinCodeDetailsById.pincodeId == undefined) { stateJson.createdBy = +this.UserId }
    else { stateJson.updatedBy = +this.UserId ; stateJson.pincodeId = this.pinCodeDetailsById.pincodeId }

    console.log(stateJson)
    if (this.pinCodeDetailsById == "") {
      this.masterservice.createPincode(stateJson).subscribe((result) => {

        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/pin-code']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formPinCodeMaster.get(err.error.Errors[prop]?.PropertyName);
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

    } else {
      this.masterservice.editPincodeMaster(stateJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/pin-code']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formPinCodeMaster.get(err.error.Errors[prop]?.PropertyName);
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
  }
  getStateList(data?:any) {
    this.masterservice.getAllStateMasterList(data).subscribe((res: any) => {
      this.stateList = res.data;
    })
  }

  getcityList(data:any) {
    this.masterservice.getAllCityByStateId(data).subscribe((res: any) => {
      this.cityList = res.data as ApiResponse;

    })

  }
  getCountryList() {
    this.masterservice.getAllCountryList().subscribe((res: any) => {
      this.countryList = res.data
    })
  }
  dropdownBindState(data: any,a:any) {
  if(a==1){
    this.formPinCodeMaster.controls['stateId'].setValue('')
    this.getStateList(data)
    return
  }else{
    this.formPinCodeMaster.controls['cityId'].setValue('')
    this.getcityList(data)
  }
  }
}
