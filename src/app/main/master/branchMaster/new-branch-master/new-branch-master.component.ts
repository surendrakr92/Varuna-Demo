import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from 'src/app/models/api-response';
import { branchMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-new-branch-master',
  templateUrl: './new-branch-master.component.html',
  styleUrls: ['./new-branch-master.component.scss']
})
export class NewBranchMasterComponent implements OnInit {
  branchDetailsById: any = ""
  stateList: any = []
  countryList: any = []
  cityList: any = []
  zoneList: any = []
  divisionLevelList: any = []
  testDate=new Date().toISOString().slice(0, 10)
  branchLevelList: any = []
  branchMasterList: any = []
  constructor(private formbuilder: FormBuilder,
    private masterservice: CountryMasterService, private cs: CommonServiceService,//for id
    public router: ActivatedRoute,
    private toastrService: ToastrService, private routes: Router) {
    this.UserId = this.cs.login_User_Code()//for id
  }
  UserId: any
  formBranchMaster: any = FormGroup
  submitted: true | undefined
  ngOnInit(): void {
    debugger
    this.formBranchMaster = this.formbuilder.group({
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      cityId: ['', Validators.required],
      zoneId: ['', Validators.required],
      branchLevelId: ['', Validators.required],
      divisionId: ['', Validators.required],
      reportbranchLevelId: ['', Validators.required],
      reportTobranchId: ['', Validators.required],
      accountbranchId: ['', Validators.required],
      branchCode: ['', [Validators.required, Validators.pattern("^[a-zA-Z]{2,}")]],
      branchName: ['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9]{3,}(?: [a-zA-Z0-9]+)*$')]],
      mobileNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      emailId: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$")]],
      stdCode: ['', [ Validators.pattern("^[0-9]{4,}")]],
      telno: ['', [ Validators.pattern("^[0-9]{7,}")]],
      addressLine1: ['', [Validators.required, Validators.pattern(/^(?!\s).*/)]],
      addressLine2: [],
      branchStartdt: ['', Validators.required],
      branchEnddt: [''],
      airService: [true],
      railService: [true],
      surfaceService: [true],
      opBkg: [true],
      opTranship: [true],
      isOutSourceBranch: [true],
      isFleetHub: [true],
      isActive: [true]

    })
    this.getStateList()
    this.getCountryList()
    this.getcityList()
    this.getZoneList()
    this.getBranchLevelList()
    this.getDivisionList()
    this.getBtranchMasterList()
    this.router.params.subscribe((res) => {

      let branchMasterId = res.data
      if (branchMasterId) {
        this.masterservice.getBranchMasterDetailsById(branchMasterId).subscribe((res: any) => {
          this.branchDetailsById = res.data
          this.getStateList(res.data.countryId)
          this.getcityList(res.data.stateId)
          this.formBranchMaster.patchValue(res.data)
          this.formBranchMaster.controls['branchStartdt'].patchValue((res.data.branchStartdt).slice(0, 10))
          this.formBranchMaster.controls['branchEnddt'].patchValue((res.data.branchEnddt).slice(0, 10))
        })
      }
    })
  }
  get f() {
    return this.formBranchMaster.controls
  }


  getCountryList() {
    this.masterservice.getAllCountryList().subscribe((res: any) => {
      this.countryList = res.data
    })
  }

  getStateList(data?: any) {
    this.masterservice.getAllStateMasterList(data).subscribe((res: any) => {
      this.stateList = res.data;
    })
  }
  getcityList(data?: any) {
    this.masterservice.getAllCityByStateId(data).subscribe((res: any) => {
      this.cityList = res.data as ApiResponse;

    })

  }
  getZoneList() {
    this.masterservice.getAllZoneList().subscribe((res: any) => {
      this.zoneList = res.data;
    })
  }
  getBranchLevelList() {
    this.masterservice.getAllBranchLevelList().subscribe((res: any) => {
      this.branchLevelList = res.data;
    })

  }
  getDivisionList() {
    this.masterservice.getAllDivisionList().subscribe((res: any) => {
      this.divisionLevelList = res.data;
    })
  }
  getBtranchMasterList() {
    this.masterservice.getAllBranchMasterList().subscribe((res: any) => {
      this.branchMasterList = res.data;
    })
  }
  OnSubmit() {
    this.submitted = true;
    if (this.formBranchMaster.invalid) {
      return
    }
    var stateJson = new branchMaster
    stateJson = this.formBranchMaster.value
    if (this.branchDetailsById.branchId == undefined) { stateJson.createdBy = +this.UserId }
    else { stateJson.updatedBy = +this.UserId; stateJson.branchId = this.branchDetailsById.branchId }

    console.log(stateJson)
    if (this.branchDetailsById == "") {
      this.masterservice.createBranchemaster(stateJson).subscribe((result) => {

        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/branch-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formBranchMaster.get(err.error.Errors[prop]?.PropertyName);
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
      this.masterservice.editBranchMaster(stateJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/branch-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formBranchMaster.get(err.error.Errors[prop]?.PropertyName);
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
  dropdownBindState(data: any, a: any) {
    if (a == 1) {
      this.formBranchMaster.controls['stateId'].setValue('')
      this.getStateList(data)
      return
    } else {
      this.formBranchMaster.controls['cityId'].setValue('')
      this.getcityList(data)
    }
  }
  branchEndDate(ev: any) {
    debugger
    if (ev.target.checked == false) {
      const control = this.formBranchMaster.get("branchEnddt");
      control.setValidators([Validators.required]);
      this.formBranchMaster.controls['branchEnddt'].setValue(this.testDate)
      control.updateValueAndValidity();
    }else{
      const control = this.formBranchMaster.get("branchEnddt");
      control.clearValidators()
      control.updateValueAndValidity();
    }
  }
}
