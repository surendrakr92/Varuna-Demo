import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import * as XLSX from 'xlsx'
declare var $: any
@Component({
  selector: 'app-route-rate-master',
  templateUrl: './route-rate-master.component.html',
  styleUrls: ['./route-rate-master.component.scss']
})
export class RouteRateMasterComponent implements OnInit {

  formMaster!: FormGroup
  submitted = false
  cityList: any
  routeGroupList: any
  groupNameList: any
  UserId: any
  show = false
  constructor(private formbuilder: FormBuilder, private cs: CommonServiceService,
    public router: Router,
    private masterService: CountryMasterService) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    };
    this.UserId = this.cs.login_User_Code(); //for id
  }
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.formMaster = this.formbuilder.group({
      groupId: [null, Validators.required],
      fromCityId: [null],
      toCityId: [null],

    })
    this.dropDownList()
  }
  get f() {
    return this.formMaster.controls
  }

  searchFilter() {
    this.submitted = true
    if (this.formMaster.invalid) {
      return
    } else {
      this.show = true
      let json: any = {
        groupId: this.formMaster.controls.groupId.value ?? 0,
        fromCityId: this.formMaster.controls.fromCityId.value ?? 0,
        toCityId: this.formMaster.controls.toCityId.value ?? 0,
      }
      $('#MyTable').DataTable().destroy();
      this.masterService.getRouteRateGroupDetailById(json).subscribe((res: any) => {
        this.groupNameList = res.data
        this.dtTrigger.next(null);

      })
    }
  }

  Reset() {
    this.formMaster.reset()
  }

  dropDownList() {
    this.masterService.getAllCityMasterList().subscribe((res: any) => {
      this.cityList = res.data
    })
    this.masterService.getAllRouteGroupList().subscribe((res: any) => {
      this.routeGroupList = res.data
    })
  }
  edit(rateId: any) {
    let json = {
      rateId: rateId,
      setupJ: 'updateJson'
    }
    this.router.navigate(['master/route-rate-master/create-route-rate-master/' + rateId], { queryParams: json })
  }
}
