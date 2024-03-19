import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { get } from 'jquery';
import { Subject } from 'rxjs';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';

@Component({
  selector: 'app-mv-availability',
  templateUrl: './mv-availability.component.html',
  styleUrls: ['./mv-availability.component.scss']
})
export class MvAvailabilityComponent implements OnInit {
  show = false
  zoneList: any
  submitted = false
  formMaster!: FormGroup
  branchList: any
  cityzoneList: any
  cityList: any
  UserId: any
  minDatePast: any = new Date().toISOString().slice(0, 10);
  mvVehicleList: any = []
  constructor(private masterservice: CountryMasterService, private formbuilder: FormBuilder,
    private routes: Router,
    private marketServ: EventMasterService,
    private cs: CommonServiceService,) {

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

    this.getCityMaster()
    this.GetcityMaster()
    this.formMaster = this.formbuilder.group({
      selectionZone: [''],
      locationId: ['', Validators.required],
      placementDt: ['', Validators.required],
    })
    sessionStorage.removeItem('mvVehicleListJson')
    debugger
    let data:any=sessionStorage.getItem('landiingPageMv')
    this.formMaster.patchValue(JSON.parse(data))
    this.formMaster.controls['placementDt'].setValue((JSON.parse(data)?.placementDt)?.slice(0,10))
   if(data) this.showDetailsAcc('json')
  }
  get f() {
    return this.formMaster.controls
  }
  toggle() {
    this.show = !this.show
  }
  GetcityMaster() {
    this.masterservice.getAllCityMasterList().subscribe((res: any) => {
      this.cityzoneList = res.data
    })
  }
  getCityMaster() {
    this.masterservice.getAllBranchMasterList().subscribe((res: any) => {
      let data=res.data
      debugger
      this.cityList=data.filter((x: { branchCode: string; })=>x.branchCode==this.cs.login_UserCurrBranch())
    })
  }
  showDetailsAcc(data:any) {
    this.submitted=true
  if(data=='json'){
    if (this.formMaster.invalid) return
    else if (this.formMaster.valid) {
      $('#MyTable').DataTable().destroy();
      this.marketServ.getAllMvLById(this.formMaster.value).subscribe((res: any) => {
        this.mvVehicleList = res.data
        this.dtTrigger.next(null);
      })
    }
  }
  }
  nextPage(cond: any, data: any) {
    this.routes.navigate(['/market/mv-availability/create-mv-availability'])
    if(cond=='create'){
      sessionStorage.setItem('mvVehicleListJson', JSON.stringify(this.formMaster.value))
    }else {
      sessionStorage.setItem('mvVehicleListJson', JSON.stringify(data))
    }
  }
}
