import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { subCityMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-new-sub-city-master',
  templateUrl: './new-sub-city-master.component.html',
  styleUrls: ['./new-sub-city-master.component.scss']
})
export class NewSubCityMasterComponent implements OnInit {
  cityList: any
  stateList: any
  pinCodeList: any
  subCityMasterDetailsById: any = ""
  formSubCityMaster: any = FormGroup
  submitted = false;
  UserId: any
  checCitkList: any;
  fleetCityList: any = [];
  checSitkList: any;
  constructor(private masterservice: CountryMasterService,
    private ActivatedRoute: ActivatedRoute, private cs: CommonServiceService,//for id
    private formbuilder: FormBuilder, private routes: Router, private toastrService: ToastrService) {
    this.UserId = this.cs.login_User_Code()//for id
  }
  ngOnInit(): void {
    // this.getAllPinCodeList(0)
    this.getAllCityList(0)
    this.getAllStateList(0)
    this.formSubCityMaster = this.formbuilder.group({
      subCityName: ['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z]{2,}(?: [a-zA-Z]+)*$')]],
      fleetCityId: ['', [Validators.required]],
      oda: ['', Validators.required],
      ola: ['', Validators.required],
      cityId: ['', Validators.required],
      stateId: ['', Validators.required],
      pinCodeId: ['', Validators.required],
      isActive: [true]
    })
    this.ActivatedRoute.params.subscribe((res) => {
      let subCityId = res.data
      if (subCityId) {
        this.masterservice.getSubCityMasterListDetailsById(subCityId).subscribe((res: any) => {
          debugger
          this.subCityMasterDetailsById = res.data
          this.getAllPinCodeList(res.data.pinCode)//give me pincode
          this.getAllCityList()
          debugger
          // this.getAllPinCodeList(res.data.cityId);
          this.formSubCityMaster.patchValue(res.data)
        })
      }
    })
  }
  get f() {
    return this.formSubCityMaster.controls
  }
  onSubmit() {
    this.submitted = true
    if (this.formSubCityMaster.invalid) {
      return
    }
    var SubCityMasterJson = new subCityMaster
    SubCityMasterJson = this.formSubCityMaster.value
    if (this.subCityMasterDetailsById.subCityId == undefined) { SubCityMasterJson.createdBy = +this.UserId }
    else { SubCityMasterJson.updatedBy = +this.UserId; SubCityMasterJson.subCityId = this.subCityMasterDetailsById.subCityId }
    console.log(SubCityMasterJson)
    if (this.subCityMasterDetailsById == "") {
      this.masterservice.createSubCityMaster(SubCityMasterJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/sub-city-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formSubCityMaster.get(err.error.Errors[prop]?.PropertyName);
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
      this.masterservice.editSubCityMaster(SubCityMasterJson).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/sub-city-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formSubCityMaster.get(err.error.Errors[prop]?.PropertyName);
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
  getAllCityList(data?: any) {
    this.masterservice.getAllCityMasterList(data).subscribe((res: any) => {
      this.cityList = res.data
      this.checCitkList = res.data
      this.fleetCityList = res.data
    })
  }
  getAllStateList(data?: any) {
    this.masterservice.getAllStateMasterList().subscribe((res: any) => {
      this.stateList = res.data
      this.checSitkList = res.data
    })
  }
  getAllPinCodeList(textSearch: any) {
    let data = {
      cityId: 0,
      pageNumber: 0, // Use this.p for page number
      pageSize: 0,
      searchD: textSearch//==0?'5000':textSearch
    };
    this.masterservice.getAllPincodeMasterListTest(data).subscribe((res: any) => {
      this.pinCodeList = res.data
    })
  }
  dropDownForbinding(selectedItem: any, eventTes: string) {
    debugger
    if (eventTes == 'pincode') {
      if (selectedItem?.target?.value.length > 4) this.getAllPinCodeList(selectedItem?.target?.value)
      let selectedPinCodeItem = this.pinCodeList?.find((item: any) => item.pincodeId === selectedItem);
      this.cityList = this.checCitkList.filter((x: { cityId: any; }) => x?.cityId == selectedPinCodeItem?.cityId)
      this.formSubCityMaster.controls['cityId'].setValue('')
      this.formSubCityMaster.controls['stateId'].setValue('')
    } else if (eventTes == 'cityName') {
      let selectedCityCodeItem = this.checCitkList?.find((item: any) => item.cityId === selectedItem);
      this.stateList = this.checSitkList.filter((x: { stateId: any; }) => x?.stateId == selectedCityCodeItem?.stateId)
      this.formSubCityMaster.controls['stateId'].setValue('')

      // } else if (eventTes == 'stateName') {
      //   let selectedstateCodeItem = this.checSitkList?.find((item: any) => item.stateId === selectedItem);
      //   this.countryMasterList = this.checCOitkList.filter((x: { countryId: any; }) => x?.countryId == selectedstateCodeItem?.countryId)
      //   this.formMaster.controls['countryId'].setValue('')
      //   this.formMaster.controls['countryId'].setValue('')
      // }
    }
  }
}