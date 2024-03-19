import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';
declare var $ :any
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-main-and-sub-event-master-list',
  templateUrl: './main-and-sub-event-master-list.component.html',
  styleUrls: ['./main-and-sub-event-master-list.component.scss']
})
export class MainAndSubEventMasterListComponent implements OnInit {
  MainAndSubEventMasterList:any
  UserId:any
  constructor(private eventService:EventMasterService,
    private cs:CommonServiceService,
    private toastrService:ToastrService){
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
    this.getAllMainAndSubEventMaster()
  }

  getAllMainAndSubEventMaster(){
this.eventService.getAllSubEventMaster().subscribe((res:any)=>{
this.MainAndSubEventMasterList=res.data
this.dtTrigger.next(null)
})
  }
  //excel_converter_download
  downloadExcel(tablerefrece:any){
    let fileName='mainAndSubEventMaster.xLsx'
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
  activeInactive(id: any) {
    debugger
    var json :any ={}
    json.eventId=id
    json.updatedBy=this.UserId
    this.eventService.disableAndEnableSubEvent(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getAllMainAndSubEventMaster()
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {  
          this.toastrService.error(err.error.Message, 'Error !');
        }
  
      }
    })
  }
}
