import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  templateUrl: './receipt-master.component.html',
  styleUrls: ['./receipt-master.component.scss']
})
export class ReceiptComponent implements OnInit {
  itemList: any = [];
  UserId: any
  branchid: any
  branchname: any = ""
  flag = 0;
  constructor(private itemService: StationaryService, private routes: Router,
    private cs: CommonServiceService,//for id
    private toastrService: ToastrService) {
    this.dtOptions = {
      lengthMenu: [5, 10, 20, 50, 100],
    }
    this.UserId = this.cs.login_User_Code()//for id
    this.branchid = this.cs.login_UserBranchId()
    this.branchname = this.cs.login_UserBranch()
  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.getItemList()
  }
  getItemList() {
    this.itemService.getAllReceiptMaster(this.branchid).subscribe((res: any) => {
      let data = res.data.receiptDetailsView;
      let indexData: Array<number> = [];
      res.data.forEach((val: any, index: number) => {
        val.receiptDetailsView.forEach((val2: any, index2: number) => {
          if (val2.issuedToBranchId > 0 || val2.issuedToUserId > 0) {
            indexData.push(val2.receiptId);
          }
        })
      })
      res.data.forEach((val: any, index: number) => {
        indexData.forEach((val2: number) => {
          if (val2 === val.receiptId) {
            this.itemList.push(val);
          }
        })
      })
      this.dtTrigger.next(null)
    })
  }


  rediredctionView(id: any) {
    console.warn(id);
    this.routes.navigate(['stationery/receipt-master/viewreceiptitem-master', id])
  }

  downloadExcel(tablerefrece: any) {
    let fileName = 'receiptMaster.xLsx'
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

