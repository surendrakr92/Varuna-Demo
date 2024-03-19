import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';

@Component({
  selector: 'app-create-mv-non-vehicle',
  templateUrl: './create-mv-non-vehicle.component.html',
  styleUrls: ['./create-mv-non-vehicle.component.scss']
})
export class CreateMvNonVehicleComponent implements OnInit {
  vendorList: any
  vehicleList: any
  rateUnit: any
  submitted = false
  clityList: any
  UserId: any
  filterJson: any
  mvVehicleCancellationRes: any
  cancelBoo: any = false
  cancelledReason: any = 0
  formArrayList: any = []
  cancelledRemarks: any;
  cancelledOn: any;
  minDatePast: any = new Date().toISOString().slice(0, 10);
  tommarrow:any= new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  constructor(private masterservice: CountryMasterService, private formbuilder: FormBuilder, private cs: CommonServiceService,
    private mrktserv: EventMasterService,
    private toastrService: ToastrService,
    private routes: Router) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [10, 20, 30, 50, 100],
      // processing:true,
    }
    this.UserId = this.cs.login_User_Code()//for id

  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.GetAllVendorList()
    this.GeneralMasterDropDown()
    this.GetAllCityList()
    sessionStorage.removeItem('landiingPageMvForCancel')
    let data: any = sessionStorage.getItem('mvVehicleListJsonForCancel')
    debugger
    this.filterJson = JSON.parse(data)
    if (this.filterJson.unionVehDetailId) {
      debugger
      this.formArrayList.push(this.filterJson)
      this.cancelBoo=this.formArrayList[0].cancelled
      this.cancelledReason=this.formArrayList[0].cancelledReasonId
      this.cancelledRemarks=this.formArrayList[0].cancelledRemarks??''
      console.log(this.formArrayList)
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
    this.masterservice.getGeneralMasterByCodeTyoeId(80).subscribe((res: any) => {
      this.mvVehicleCancellationRes = res.data
    })
  }
  OnSubmit() {
    let json = {
      "unionVehDetailId": this.filterJson.unionVehDetailId,
      "cancelled": this.cancelBoo,
      "cancelledReason": this.cancelledReason,
      "cancelledRemarks": this.cancelledRemarks,
      "cancelledOn": this.cancelledOn,
      "cancelledBy": this.UserId
    }
    if (this.filterJson.unionVehDetailId) {
      this.mrktserv.cancelMvAvlblty(json).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/route-master-list']);
        $('#MyTable').DataTable().destroy();
        this.routes.navigate(['/market/mv-non-placed-vehicle'])
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
          }
          this.toastrService.error(`${err.error.Message}`, `Staus Code-${err.status}`);
        }
      })
    }
    sessionStorage.setItem('landiingPageMvForCancel', JSON.stringify(this.filterJson))
  }
  addRow() {
    this.formArrayList.push({ "vendor": "12" })
  }


  CancelledList = [
    { id:true, type: 'Yes' },
    { id: false, type: 'Carry Forward' }
  ]
  changeCancelId(data: any, cond: any) {
    debugger
    if (cond == 'cancelled') this.cancelBoo = data == true ? true : false;
    else if (cond == 'cancelledReason') this.cancelledReason = data
    else if (cond == 'cancelledOn') this.cancelledOn = data
    else if (cond == 'cancelledRemarks') this.cancelledRemarks = data
  }
  backToList() {
    sessionStorage.setItem('landiingPageMvForCancel', JSON.stringify(this.filterJson))
  }
}
