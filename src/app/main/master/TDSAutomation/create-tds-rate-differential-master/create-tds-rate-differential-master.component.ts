import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cityMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-create-tds-rate-differential-master',
  templateUrl: './create-tds-rate-differential-master.component.html',
  styleUrls: ['./create-tds-rate-differential-master.component.scss']
})
export class CreateTdsRateDifferentialMasterComponent implements OnInit {
  constructor(private formbuilder: FormBuilder, private masterservice: CountryMasterService,
    private routes: Router,
    private toastrService: ToastrService, private cs: CommonServiceService,//for id
    private router: ActivatedRoute) {
    this.UserId = this.cs.login_User_Code()//for id
  }
  UserId: any
  formCityMaster!: FormGroup;
  submitted!: true
  cityDetailsById: any = ""
  stateList: any = []
  countryList: any = []

  finYear:any
  ownerList:any
  specificPersonList:any
  ngOnInit(): void {
this.getAllFinYear()
this.getAllOwnerMaster()
this.generalMasterDropDown()

    this.formCityMaster = this.formbuilder.group({

      ownerId:['', Validators.required],
      businessVoulume:['', Validators.required],
      tdsRateTypeId:['', Validators.required],
      validFrom:['', Validators.required],
      validUpto:['', Validators.required],
      tdsFileUpload:['', Validators.required],
      specificPersonId:['', Validators.required],

      
      finYearId:[''],
      ackNo:[""],
      dateOfReturn:[""],
      tdsGrather50000:[""],


      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      cityName: [''],
      isActive: [true]

    })
    this.getCountryList()
    this.router.params.subscribe((res) => {

      let stateMasterId = res.data
      if (stateMasterId) {
        this.masterservice.getCityListDetailsById(stateMasterId).subscribe((res: any) => {
          this.cityDetailsById = res.data
          this.getStateList(res.data.countryId)
          this.formCityMaster.patchValue(res.data)
        })
      }
    })
  }
  get f() {
    return this.formCityMaster.controls;
  }
  OnSubmit() {
    this.submitted = true;
    if (this.formCityMaster.invalid) {
      return

    }
    var stateJson = new cityMaster
    stateJson = this.formCityMaster.value
    if (this.cityDetailsById.stateId == undefined) { stateJson.createdBy = +this.UserId }
    else { stateJson.updatedBy = +this.UserId; stateJson.cityId = this.cityDetailsById.cityId }

    console.log(stateJson)
    if (this.cityDetailsById == "") {
      this.masterservice.createCity(stateJson).subscribe((result) => {

        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/city-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formCityMaster.get(err.error.Errors[prop]?.PropertyName);
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
      this.masterservice.editCityMaster(stateJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/city-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formCityMaster.get(err.error.Errors[prop]?.PropertyName);
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

getAllFinYear(){
  this.masterservice.getAllFinancialYear().subscribe((res:any)=>{
    this.finYear=res.data
  })
}
getAllOwnerMaster(){
this.masterservice.getAll_owner_master().subscribe((res:any)=>{
  this.ownerList= res.data
  console.log( this.ownerList)
})
}


  getStateList(data?: any) {

  }
  getCountryList() {

  }
  dropdownBindState(data: any) {
    this.formCityMaster.controls['stateId'].setValue('')
    this.getStateList(data)
  }

  generalMasterDropDown(){
    this.masterservice.getGeneralMasterByCodeTyoeId(134).subscribe((res:any)=>{
this.specificPersonList= res.data
    })
  }


  Total_TDS_TCS_Amount=[

    {id:1, type:'Yes'},
    {id:2, type:'No'},
  ]
}
