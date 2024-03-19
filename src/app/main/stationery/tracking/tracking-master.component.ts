import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { StationaryService } from 'src/app/services/master-service/stationary.service';
declare var $: any
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-state-master',
  templateUrl: './tracking-master.component.html',
  styleUrls: ['./tracking-master.component.scss']
})
export class TrackingComponent implements OnInit {
  trackingList: any = [];
  UserId: any
  flag = 0;
  submitted!: true
  formtrackingMaster!: FormGroup
  constructor(private formbuilder: FormBuilder, private itemService: StationaryService, private routes: Router,
    private cs: CommonServiceService,//for id
    private toastrService: ToastrService) {
    this.dtOptions = {
      lengthMenu: [5, 10, 20, 50, 100],
    }
    this.UserId = this.cs.login_User_Code()//for id
  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.formtrackingMaster = this.formbuilder.group({
      docno: ['', Validators.required],
    })
  }
  gettrackingList(doccno: number) {
    this.itemService.getAllTrackingData(doccno).subscribe((res: any) => {
      this.trackingList = res.data;
      // console.warn(this.trackingList);
      this.dtTrigger.next(null)
    })
  }
  get f() {
    return this.formtrackingMaster.controls;
  }
  ondocChange(e: any) {
    // alert(this.formtrackingMaster.controls.docno.value)
    this.gettrackingList(this.formtrackingMaster.controls.docno.value)
  }
  downloadExcel(tablerefrece: any) {
    let fileName = 'trackingMaster.xLsx'
    let element = document.getElementById(tablerefrece.id);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    Object.keys(ws).forEach(key => {
      if (ws[key].v === "Action") {
        delete ws[key];
      }
    });
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, fileName);
  }
}

