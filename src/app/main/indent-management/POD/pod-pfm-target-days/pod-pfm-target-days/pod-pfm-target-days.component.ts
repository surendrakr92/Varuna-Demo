import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';
declare var $: any
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-pod-pfm-target-days',
  templateUrl: './pod-pfm-target-days.component.html',
  styleUrls: ['./pod-pfm-target-days.component.scss']
})


export class PODPFMTargetDaysComponent implements OnInit {
  UserId: any
  targetList: any
  constructor(private indentService: IndentServiceService, private cs: CommonServiceService,
    private routes: Router) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
    this.UserId = this.cs.login_User_Code()//for id
  }

  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.APIBinding()
  }
  downloadExcel(tablerefrece: any) {
    let fileName = 'podpfmtargetdays.xLsx'
    let element = document.getElementById(tablerefrece.id);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.targetList);
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

  APIBinding() {
    this.indentService.getPODpfmTargetDays().subscribe((res: any) => {
      this.targetList = res.data
      console.log(this.targetList)
      this.dtTrigger.next(null)
    })
  }
  redirectionEdit(id: any) {
    this.routes.navigate(['indent/POD-PFM-Target-days/edit-POD-PFM-Target-days/', id.scanDaysId])
  sessionStorage.setItem('scanData',JSON.stringify(id))
  }
}
