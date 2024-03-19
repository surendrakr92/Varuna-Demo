import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { itemMaster } from 'src/app/models/Class/stationary';

import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { TicketMasterService } from 'src/app/services/master-service/ticket-master-service';
declare var $ :any
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-state-master',
  templateUrl: './dept-mapping.component.html',
  styleUrls: ['./dept-mapping.component.scss']
})
export class DepartmentMappingComponent implements OnInit {
  deptList: any = [];
  UserId:any
  flag = 0;
  constructor(private itemService: TicketMasterService, private routes: Router,
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
    this.getItemList()
  }

  getItemList() {
    this.itemService.getAllDeptMappingMasterList().subscribe((res: any) => {
      this.deptList =res.data;
      this.dtTrigger.next(null)
    })
  }

  
  rediredctionView(id: any) {
    this.routes.navigate(['master/item-master/view-item-master', id])
  }
  redirectionEdit(id: any) {
    this.routes.navigate(['/master/item-master/update-item-master', id])
  }
  activeInactive(id: any) {
    var json =new itemMaster
    json.itemId=id
    json.updatedBy=1 //for Id  
    this.itemService.disableAndEnableItem(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getItemList()
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {  
          this.toastrService.error(err.error.Message, 'Error !');
        }

      }
    })
}
downloadExcel(tablerefrece:any){
  let fileName='itemMaster.xLsx'
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

