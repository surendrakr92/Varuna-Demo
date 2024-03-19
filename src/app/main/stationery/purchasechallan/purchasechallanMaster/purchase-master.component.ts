import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { purchaseMaster } from 'src/app/models/Class/stationary';

import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { StationaryService } from 'src/app/services/master-service/stationary.service';
declare var $: any
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-state-master',
  templateUrl: './purchase-master.component.html',
  styleUrls: ['./purchase-master.component.scss']
})
export class PurchaseMasterComponent implements OnInit {
  purchaseList: any = [];
  UserId: any
  flag = 0;
  branchid: any = "";
  constructor(private itemService: StationaryService, private routes: Router,
    private cs: CommonServiceService,//for id
    private toastrService: ToastrService) {

    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
    this.UserId = this.cs.login_User_Code()//for id
    this.branchid = this.cs.login_UserCurrBranchId();
    //this.branchid = this.cs.login_UserBranchId();
  }

  dtTrigger: Subject<any> = new Subject<any>()

  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.getPCList();
  }

  getPCList() {
    this.itemService.getAllPurchaseMaster().subscribe((res: any) => {
      this.purchaseList = res.data;
      this.dtTrigger.next(null)
    })
  }

  btnAdd() {
    if (this.branchid === 1) {
      this.routes.navigate(['stationery/purchase-master/create-pc-master'])
    }
    else {
      this.toastrService.error('sorry for the inconvenience that this is authentication for Head Office', 'Error !');     
    }
  }

  rediredctionView(id: any) {
    this.routes.navigate(['stationery/purchase-master/view-pc-master', id])
  }
  redirectionEdit(id: any) {
    this.routes.navigate(['/stationery/purchase-master/update-pc-master', id])
  }
  activeInactive(id: any) {
    var json = new purchaseMaster
    json.challanId = id
    json.updatedBy = 1 //for Id  
    this.itemService.disableAndEnablePChallan(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getPCList()
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          this.toastrService.error(err.error.Message, 'Error !');
        }
      }
    })
  }
  downloadExcel(tablerefrece: any) {
    let fileName = 'purchasechallanMaster.xLsx'
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

