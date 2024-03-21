import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routeMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';
 
 
@Component({
  selector: 'app-create-route-master',
  templateUrl: './create-route-master.component.html',
  styleUrls: ['./create-route-master.component.scss']
})
export class CreateRouteMasterComponent implements OnInit {
  UserId: any
  flag = 0
  routeMasterList: any
  cityList: any
  submitted = false
  formMaster: any = FormGroup
  routeCategoryList: any
  routeMasterById: any = ""
  routeCategoryList2:any=[]
  branchMasterList: any = []
  Arrayindex: any = [{
    "fromCityId": 0,
    "toCityId": 0,
    "routeCategoryId": 278,
    "routeCategoryRemarks":"",
    "routeCategoryTypeId":278,
    "routeKm": 0,
    "routeStartDate": null,
    "contrlBranchId": 1,
    "transitHour": 0,
    "expressHour": 0,
    "isTwoPointDieselAllow": true,
    "isEmptyAllow": false,
    "supperExpressHour": 0,
    "isMultiPointDieselAllow": true,
    "isActive": true,
    "suggestion": 'YTR',
    "createdBy": +(this.cs.login_User_Code())
  }]
  constructor(private masterservice: CountryMasterService, private Activateroute: ActivatedRoute,
    private modalService: ModalPopupService, private formbuider: FormBuilder
    , private routes: Router, private cs: CommonServiceService,//for id
    private toastrService: ToastrService) {
 
    this.UserId = this.cs.login_User_Code()//for id
  }
 
  ngOnInit(): void {
    this.getAllCityMaster()
    this.getGeneralMasterDropDown()
    this.getCOntrlBranchList()
  }
  get f() {
    return this.formMaster.controls
  }
  getAllCityMaster() {
    this.masterservice.getAllCityMasterList().subscribe((res: any) => {
      this.cityList = res.data
    })
  }
 
  getGeneralMasterDropDown() {
    this.masterservice.getGeneralMasterByCodeTyoeId(65).subscribe((res: any) => {
      this.routeCategoryList = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(136).subscribe((res: any) => {
      this.routeCategoryList2 = res.data
    })
  }
  getCOntrlBranchList() {
    this.masterservice.getAllBranchMasterList().subscribe((res: any) => {
      this.branchMasterList = res.data
    })
  }
  // addRowForTables(data: any) {
  //   debugger
  //   if (data == '' || data == 0) return
  //   if (data < 60) {
  //     const newLength = data;
  //     this.Arrayindex = Array.from({ length: newLength }, () => ({
  //       "fromCityId": 0,
  //       "toCityId": 0,
  //       "routeCategoryId": 278,
  //       "routeCategoryTypeId": 278,
  //       "routeCategoryRemarks": "",
  //       "routeKm": 0,
  //       "routeStartDate": null,
  //       "contrlBranchId": 1,
  //       "transitHour": 0,
  //       "expressHour": 0,
  //       "isTwoPointDieselAllow": true,
  //       "isEmptyAllow": false,
  //       "supperExpressHour": 0,
  //       "isMultiPointDieselAllow": true,
  //       "isActive": true,
  //       "suggestion": "YTR",
  //       "createdBy": +(this.UserId)
  //     }));
  //     console.log(this.Arrayindex);
  //   }
  // }

  addRowForTables(data: any) {
    debugger;
    if (data == '' || data == 0) return;
    if (data < 60) {
      const newLength = data;
      const newArray = Array.from({ length: newLength }, () => ({
        "fromCityId": 0,
        "toCityId": 0,
        "routeCategoryId": 278,
        "routeCategoryTypeId": 278,
        "routeCategoryRemarks": "",
        "routeKm": 0,
        "routeStartDate": null,
        "contrlBranchId": 1,
        "transitHour": 0,
        "expressHour": 0,
        "isTwoPointDieselAllow": true,
        "isEmptyAllow": false,
        "supperExpressHour": 0,
        "isMultiPointDieselAllow": true,
        "isActive": true,
        "suggestion": "YTR",
        "createdBy": +(this.UserId)
      }));
 
      // Concatenate the new array with the existing array
      this.Arrayindex = this.Arrayindex.concat(newArray);
 
      console.log(this.Arrayindex);
    }
  }

  deleteArray(index: any) {
    debugger
    if (this.Arrayindex.length == 1) {
      this.toastrService.warning('At least one list should be needed', 'Error 302')
    } else {
      this.Arrayindex.splice(index, 1)
    }
  }
  ValueForFromCity(event: any, index: any) {
    debugger
    const selectedCityId = event;
    console.log(selectedCityId);
    this.Arrayindex[index]['fromCityId'] = selectedCityId
    console.log(this.Arrayindex);
    // ... Other code
  }
  ValueForToCity(event: any, index: any) {
    debugger
    const selectedCityId = event;
    console.log(selectedCityId);
    this.Arrayindex[index]['toCityId'] = selectedCityId
    console.log(this.Arrayindex);
    // ... Other code
  }
  ValueFordistance(value: any, index: any) {
    this.Arrayindex[index]['routeKm'] = value.value;
    console.log(this.Arrayindex)
  }
  ValueForStartDate(value: any, index: any) {
    this.Arrayindex[index]['routeStartDate'] = value.value;
    console.log(this.Arrayindex)
  }
  ValueForEndDate(value: any, index: any) {
    this.Arrayindex[index]['routeEndDate'] = value.value;
    console.log(this.Arrayindex)
  }
  ValueForTransitHours(value: any, index: any) {
    this.Arrayindex[index]['transitHour'] = value.value;
    console.log(this.Arrayindex)
  }
  ValueForexpressHours(value: any, index: any) {
    this.Arrayindex[index]['expressHour'] = value.value;
    console.log(this.Arrayindex)
  }
  ValueForsupperExpressHour(value: any, index: any) {
    this.Arrayindex[index]['supperExpressHour'] = value.value;
    console.log(this.Arrayindex)
  }

  ValueForemptyAllowed(value: any, index: any) {
    this.Arrayindex[index]['isEmptyAllow'] = value.checked ? true : false;
    console.log(this.Arrayindex)
  }
  ValueForRoute(value: any, index: any) {
    debugger
    this.Arrayindex[index]['routeCategoryTypeId'] = value
   if(value==278) this.Arrayindex[index]['remarkss']="High Profit"
   else if(value==279) this.Arrayindex[index]['remarkss']="General Profit"
   else if(value==611) this.Arrayindex[index]['remarkss']="No Profit"
    console.log(this.Arrayindex)
  }
  ValueForRoute2(value: any, index: any) {
    debugger
    this.Arrayindex[index]['routeCategoryId'] = value
    }
  ValueForRemarks(value: any, index: any) {
    this.Arrayindex[index]['routeCategoryRemarks'] = value
    console.log(this.Arrayindex)
  }
  finalSubmission() {
    // alert(JSON.stringify(this.Arrayindex))
    const json:any = {
      "commands": this.Arrayindex
    }
    // if (json.commands.some((x: any) => x.fromCityId == 0 || x.toCityId == 0 || x.routeStartDate == '' || x.routeEndDate=='')) {
    //   this.toastrService.warning('Form city, to city,from date and start date can not be blank')
    //   return
    // }
    // if (json.commands.some((x: any) => x.routeStartDate >= x.routeEndDate)) {
    //   this.toastrService.warning('From Date must be less than or equal to To Date', 'Error 302')
    //    return
    // }
    this.masterservice.createRouteMaster(json).subscribe((result) => {
      this.toastrService.success('succesfully Created !', 'Success-200 !');
      this.routes.navigate(['master/route-master-list']);
      this.modalService.closeModal()
      // this.formMaster.reset()
      $('#MyTable').DataTable().destroy();
      this.routes.navigate(['/master/route-master-list'])
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger
          // Object.keys(err.error.Errors).forEach((prop: any) => {
          //   const formControl = this?.formMaster?.get(err?.error.Errors[prop]?.PropertyName);
          //   //wrong key comes
          //   if (formControl) {
          //     // activate the error message
          //     formControl.setErrors({
          //       serverError: err.error.Errors[prop]?.ErrorMessage
          //     });
          //   }
          // });
        }
        this.toastrService.error(`${err.error.Message}`, `Staus Code-${err.status}`);
      }
    })
 
  }
}