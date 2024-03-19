import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';

@Component({
  selector: 'app-mv-non-vehicle',
  templateUrl: './mv-non-vehicle.component.html',
  styleUrls: ['./mv-non-vehicle.component.scss']
})
export class MvNonVehicleComponent implements OnInit {
  show = false
  cityzoneList: any
  submitted = false
  formMaster!: FormGroup
  branchList: any = ""
  UserId: any
  mvVehicleList: any = []
  minDatePast: any = new Date().toISOString().slice(0, 10);
  constructor(private masterservice: CountryMasterService, private routes: Router,
    private cs: CommonServiceService,
    private marketServ: EventMasterService,
    private formbuilder: FormBuilder) {

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
    this.GetAllBranchList()
    this.formMaster = this.formbuilder.group({
      locationId: ['', Validators.required],
      placementDt: ['', Validators.required]
    })
    let data:any=sessionStorage.getItem('landiingPageMvForCancel')
    this.formMaster.patchValue(JSON.parse(data))
    this.formMaster.controls['placementDt'].setValue((JSON.parse(data)?.placementDt)?.slice(0,10))
    if(data)this.showDetailsAcc('json')
  }

  get f() {
    return this.formMaster.controls
  }
  toggle() {
    this.show = !this.show
  }
  GetAllBranchList() {
    this.masterservice.getAllBranchMasterList().subscribe((res: any) => {
      let data = res.data
      this.branchList=data.filter((x: { branchCode: string; })=>x.branchCode==this.cs.login_UserCurrBranch())
    })
  }
  showDetailsAcc(data: any) {
    debugger
    this.submitted = true
    if (data == 'json') {
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
  nextPage(data: any) {
    if (data.unionVehDetailId) {
      this.routes.navigate(['/market/mv-non-placed-vehicle/create-mv-non-placed-vehicle'])
      sessionStorage.setItem('mvVehicleListJsonForCancel', JSON.stringify(data))
    }
  }

}
