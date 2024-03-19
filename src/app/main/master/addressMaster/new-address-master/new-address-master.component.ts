import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addressMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-new-address-master',
  templateUrl: './new-address-master.component.html',
  styleUrls: ['./new-address-master.component.scss']
})
export class NewAddressMasterComponent implements OnInit {
  submitted !: true
  formMaster: any = FormGroup
  addressMasterList: any
  geofenceStatusList: any
  cityMasterList: any
  stateMasterList: any
  countryMasterList: any
  pinCodeList: any
  addressMasterDetailsById: any = ""
  UserId: any
  addressIdDetails:any
  cityList: any = []
  generalMasterList: any
  stateList: any

  checCitkList: any = []
  checSitkList: any = []
  checCOitkList: any = []

  constructor(private masterservice: CountryMasterService, private routes: Router,
    private activeroute: ActivatedRoute, private toastrService: ToastrService, private cs: CommonServiceService,//for id
    private formbuilder: FormBuilder, private router: Router) {
    this.UserId = this.cs.login_User_Code()//for id
  }
  ngOnInit(): void {
    this.formMaster = this.formbuilder.group({
      addressLine1: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9\s,.'-]{3,}$/)]],
      addressLine2: ['',Validators.pattern(/^[a-zA-Z0-9\s,.'-]{3,}$/)],
      addressLine3: ['',Validators.pattern(/^[a-zA-Z0-9\s,.'-]{3,}$/)],
      pincodeId: ['',Validators.required],
      cityId: ['', Validators.required],
      stateId: ['', Validators.required],
      countryId: ['', Validators.required],
      addressTypeId: ['', Validators.required],
      phoneNumber: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      emailId: ['', [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      longitude:  ['', [Validators.pattern(/^(\d{1,2}(\.\d{1,4})?|90(\.0{1,4})?)$/)]],
      latitude:  ['', [Validators.pattern(/^(\d{1,2}(\.\d{1,4})?|90(\.0{1,4})?)$/)]],
      isNewPickupWithoutExist: [false],
      isLock: [false],
      geofanceStatusId: ['', Validators.required],
      isActive: [true]
    })
    this.getAddressMaster()
    this.getGeofenceStatus()
    // this.getpinCodeList(0)
    this.getcityMasterList(0)
    this.getstateMasterList(0)
    this.getcountryMasterList()
    this.activeroute.params.subscribe((res) => {
     this.addressIdDetails = res.data
      if (this.addressIdDetails) { 
        this.masterservice.getAddressMasterById(this.addressIdDetails).subscribe((res: any) => {
          this.addressMasterDetailsById = res.data 
          debugger
          this.getpinCodeList(res.data.pinCode)
        setTimeout(() => {
          this.formMaster.patchValue(res.data)     
        }, 200);    
        })
      }
    })
  }
  get f() {
    return this.formMaster.controls
  }
  OnSubmit() {
    debugger
    this.submitted = true;
    if (this.formMaster.invalid) {
      return
    }
    var addressJson = new addressMaster
    addressJson = this.formMaster.value
    if (this.addressMasterDetailsById.addressId == undefined) { addressJson.createdBy = +this.UserId }
    else { addressJson.updatedBy = +this.UserId; addressJson.addressId = this.addressMasterDetailsById.addressId }
    console.log(addressJson)
    if (this.addressMasterDetailsById == "") {
      this.masterservice.createAddressMaster(addressJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/address-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formMaster.get(err.error.Errors[prop]?.PropertyName);
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
      this.masterservice.editAddressMaster(addressJson).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/address-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formMaster.get(err.error.Errors[prop]?.PropertyName);
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
  getAddressMaster() {
    let codeTypeId = 39
    this.masterservice.getGeneralMasterByCodeTyoeId(codeTypeId).subscribe((res: any) => {
      this.addressMasterList = res.data
    })
  }
  getGeofenceStatus() {
    let codeTypeId = 40
    this.masterservice.getGeneralMasterByCodeTyoeId(codeTypeId).subscribe((res: any) => {
      this.geofenceStatusList = res.data
    })
  }
  getcityMasterList(data?: any) {
    this.masterservice.getAllCityMasterList(data).subscribe((res: any) => {
      this.checCitkList = res.data
     this.cityMasterList=res.data
    })
  }
  getstateMasterList(data?: any) {
    this.masterservice.getAllStateMasterList(data).subscribe((res: any) => {
      this.checSitkList = res.data
    this.stateList=res.data
    })
  }
  getcountryMasterList(data?: any) {
    this.masterservice.getAllCountryList().subscribe((res: any) => {
      this.checCOitkList = res.data
    this.countryMasterList=res.data

    })
  }
  getpinCodeList(textSearch: any) {
    let data = {
      cityId: 0,
      pageNumber: 0, // Use this.p for page number
      pageSize: 0,
      searchD: textSearch//==0?'5000':textSearch
    };
    this.masterservice.getAllPincodeMasterListTest(data).subscribe((res:any)=>{
      this.pinCodeList= res.data
    })
  }
  dropDownForbinding(selectedItem: any, eventTes: string) {
    debugger
    if (eventTes == 'pincode') {
      if(selectedItem?.target?.value.length>4)this.getpinCodeList(selectedItem?.target?.value)
      let selectedPinCodeItem = this.pinCodeList?.find((item: any) => item.pincodeId === selectedItem);
      this.cityMasterList = this.checCitkList.filter((x: { cityId: any; }) => x?.cityId == selectedPinCodeItem?.cityId)
      this.formMaster.controls['cityId'].setValue('')
      this.formMaster.controls['countryId'].setValue('')
      this.formMaster.controls['stateId'].setValue('')
    } else if (eventTes == 'cityName') {
      let selectedCityCodeItem = this.checCitkList?.find((item: any) => item.cityId === selectedItem);
      this.stateList = this.checSitkList.filter((x: { stateId: any; }) => x?.stateId == selectedCityCodeItem?.stateId)
      this.formMaster.controls['countryId'].setValue('')
      this.formMaster.controls['stateId'].setValue('')

    } else if (eventTes == 'stateName') {
      let selectedstateCodeItem = this.checSitkList?.find((item: any) => item.stateId === selectedItem);
      this.countryMasterList = this.checCOitkList.filter((x: { countryId: any; }) => x?.countryId == selectedstateCodeItem?.countryId)
      this.formMaster.controls['countryId'].setValue('')
      this.formMaster.controls['countryId'].setValue('')
    }
  }


}
