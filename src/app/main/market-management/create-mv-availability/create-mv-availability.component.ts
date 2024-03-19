import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';

@Component({
  selector: 'app-create-mv-availability',
  templateUrl: './create-mv-availability.component.html',
  styleUrls: ['./create-mv-availability.component.scss']
})
export class CreateMvAvailabilityComponent implements OnInit {
  vendorList: any=[]
  vehicleList: any
  rateUnit: any
  clityList: any
  filterJson: any
  userId: any
  formArrayList: any = {
    "unionVehicleData": [{
      "locationId": 0,
      "placementDt": "2023-11-03T09:55:20.735Z",
      "vendorId": 0,
      "vendorMobileNo": "",
      "vendorName": "",
      "vehicleNo": "",
      "vehicleTypeId": 0,
      "fromCityId": 0,
      "toCityId": 0,
      "rate": 0,
      "rateTypeId": 0,
      "orderId": 11,
      "createdBy": 0
    }]
  }
  constructor(private masterservice: CountryMasterService, private formbuilder: FormBuilder,
    private toastrService: ToastrService,
    private mrktserv: EventMasterService,
    private cs: CommonServiceService,
    private routes: Router) {
    this.userId = this.cs.login_User_Code()
  }
  ngOnInit(): void {
    this.GetAllVendorList()
    this.GeneralMasterDropDown()
    this.GetAllCityList()
    sessionStorage.removeItem('landiingPageMv')
    let data: any = sessionStorage.getItem('mvVehicleListJson')
    this.filterJson = JSON.parse(data)
    this.formArrayList.unionVehicleData[0].locationId = this.filterJson.locationId
    this.formArrayList.unionVehicleData[0].createdBy = this.userId
    this.formArrayList.unionVehicleData[0].placementDt = this.filterJson.placementDt
    if(this.filterJson.unionVehDetailId){
      debugger
      this.formArrayList.unionVehicleData[0]=this.filterJson
    }
  }
  GetAllVendorList() {
    this.masterservice.getAllVendorMaster().subscribe((res: any) => {
      this.vendorList = res.data
    })

  }

  GetAllCityList() {
    this.masterservice.getAllCityMasterList().subscribe((res: any) => {
      this.clityList = res.data
    })
  }
  GeneralMasterDropDown() {
    this.masterservice.getGeneralMasterByCodeTyoeId(63).subscribe((res: any) => {
      this.vehicleList = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(118).subscribe((res: any) => {
      this.rateUnit = res.data
    })
  }
  OnSubmit() {
    // this.routes.navigate(['/market/mv-availability/mv-availability-list'])
  }
  addRow() {
    debugger
    this.formArrayList.unionVehicleData.push({
      "locationId": this.filterJson.locationId,
      "placementDt": this.filterJson.placementDt,
      "vendorId": 0,
      "vendorMobileNo": "",
      "vendorName": "",
      "vehicleNo": "",
      "vehicleTypeId": 0,
      "fromCityId": 0,
      "toCityId": 0,
      "rate": 0,
      "rateTypeId": 0,
      "orderId": 11,
      "createdBy": this.userId
    })
  }
  changeVendorName(data: any, index: any, cond: any) {
    debugger
    if (cond == 'vendorName') {
     let patchD=this.vendorList.filter((x: { vendorId: any; })=>x.vendorId==data)
      this.formArrayList.unionVehicleData[index]['vendorName'] = patchD[0]?.vendorName
      this.formArrayList.unionVehicleData[index]['vendorId'] = patchD[0]?.vendorId
      this.formArrayList.unionVehicleData[index]['vendorMobileNo'] = patchD[0]?.contactPersonMobileNo
    }
    else if (cond == 'vendorMobileNo') this.formArrayList.unionVehicleData[index]['vendorMobileNo'] = data
    else if (cond == 'vehicleNo') this.formArrayList.unionVehicleData[index]['vehicleNo'] = data
    else if (cond == 'vehicleTypeId') this.formArrayList.unionVehicleData[index]['vehicleTypeId'] = data
    else if (cond == 'fromCityId') this.formArrayList.unionVehicleData[index]['fromCityId'] = data
    else if (cond == 'toCityId') this.formArrayList.unionVehicleData[index]['toCityId'] = data
    else if (cond == 'rateTypeId') this.formArrayList.unionVehicleData[index]['rateTypeId'] = data
    else if (cond == 'rate') this.formArrayList.unionVehicleData[index]['rate'] = data
    else if (cond == 'entryRemarks') this.formArrayList.unionVehicleData[index]['entryRemarks'] = data

  }
  finalJsonSubmission() {
    console.log(this.formArrayList)
  if(this.filterJson.unionVehDetailId){
    this.formArrayList.unionVehicleData[0]['updatedBy']=this.userId
    this.mrktserv.updateMvAvlblty(this.formArrayList.unionVehicleData[0]).subscribe((result) => {
      this.toastrService.success('succesfully Updated !', 'Success-200 !');
      this.routes.navigate(['master/route-master-list']);
      $('#MyTable').DataTable().destroy();
      this.routes.navigate(['/market/mv-availability'])
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger
        }
        this.toastrService.error(`${err.error.Message}`, `Staus Code-${err.status}`);
      }
    })
  }else{
    this.mrktserv.createMvAvlblty(this.formArrayList).subscribe((result) => {
      this.toastrService.success('succesfully Created !', 'Success-200 !');
      this.routes.navigate(['master/route-master-list']);
      $('#MyTable').DataTable().destroy();
      this.routes.navigate(['/market/mv-availability'])
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger
        }
        this.toastrService.error(`${err.error.Message}`, `Staus Code-${err.status}`);
      }
    })
  }
  sessionStorage.setItem('landiingPageMv',JSON.stringify(this.filterJson))

  }
backToList(){
  sessionStorage.setItem('landiingPageMv',JSON.stringify(this.filterJson))
}
}
