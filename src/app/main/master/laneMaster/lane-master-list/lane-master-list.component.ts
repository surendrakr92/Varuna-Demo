import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { laneMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import * as XLSX from 'xlsx'
declare var $ :any
@Component({
  selector: 'app-lane-master-list',
  templateUrl: './lane-master-list.component.html',
  styleUrls: ['./lane-master-list.component.scss']
})
export class LaneMasterListComponent implements OnInit {

  laneMasterList:any
  UserId:any
  constructor(private masterservice:CountryMasterService, private route:Router, private cs:CommonServiceService,//for id
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
    this.getAllLaneMaster()
  }

getAllLaneMaster(){
this.masterservice.getAllLaneMaster().subscribe((res:any)=>{
this.laneMasterList=res.data
this.dtTrigger.next(null)
})
}
activeInactive(id: any) {
  var json =new laneMaster
  json.laneId=id
  json.updatedBy=this.UserId //for Id  
  this.masterservice.disableAndEnableLaneMaster(json).subscribe((res: any) => {
    if (res.succeeded) {
      this.toastrService.success('succesfully changed status', 'Success-200 !');
      $('#MyTable').DataTable().destroy();
      this.getAllLaneMaster()
    }
  }, err => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 422) {  
        this.toastrService.error(err.error.Message, 'Error !');
      }

    }
  })
}

redirectionEdit(id: any) {
this.route.navigate(['master/lane-master-list/update-lane-master/', id])
}
  downloadExcel(tablerefrece:any){
    let fileName='landMaster.xLsx'
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
