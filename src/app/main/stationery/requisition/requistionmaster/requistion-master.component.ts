
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { StationaryService } from 'src/app/services/master-service/stationary.service';
declare var $ :any
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-state-master',
  templateUrl: './requistion-master.component.html',
  styleUrls: ['./requistion-master.component.scss']
})
export class RequistionMasterComponent implements OnInit {
    requistionList: any = [];
  UserId:any
  flag = 0;
  constructor(private itemService: StationaryService, private routes: Router,
    private cs:CommonServiceService,//for id
    private toastrService:ToastrService) {

    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
    this.UserId=this.cs.login_User_Code()//for id
  }

  dtTrigger:Subject<any>=new Subject<any>()

  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.getRequistionList()
  }

  getRequistionList() {
    this.itemService.getAllRequistion().subscribe((res: any) => {
      this.requistionList =res.data;
      console.log('JSON.stringify(this.requistionList)');
      console.log(JSON.stringify(this.requistionList));
      this.dtTrigger.next(null)
    })
  }

  

  redirectionEdit(id: any) {
    this.routes.navigate(['/stationery/requistion-master/updaterequistion-master', id])
  }

downloadExcel(tablerefrece:any){
  let fileName='Master.xLsx'
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

