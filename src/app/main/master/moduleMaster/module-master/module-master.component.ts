import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CountryMaster, ModuleMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
declare var $ :any
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-module-master',
  templateUrl: './module-master.component.html',
  styleUrls: ['./module-master.component.scss']
})
export class ModuleMasterComponent implements OnInit{
constructor(private masterservice:CountryMasterService,
  private routes:Router,private cs:CommonServiceService,//for id
  private toastrService:ToastrService){
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
    this.UserId=this.cs.login_User_Code()//for id
  }
  UserId:any
  dtTrigger:Subject<any>=new Subject<any>()
  dtOptions: DataTables.Settings = {};
modulemasterList:any=[]
ngOnInit(): void {
  this.getmodule()
}
getmodule() {
  this.masterservice.getAllModuleMasterList().subscribe((res: any) => {
    this.modulemasterList = res.data
    this.dtTrigger.next(null)
  })
}

activeInactive(id: any) {
  var json=new ModuleMaster
  json.moduleId=id
  json.updatedBy=this.UserId
  this.masterservice.disableAndEnableModuleMaster(json).subscribe((res: any) => {
    if (res.succeeded) {
      this.toastrService.success('succesfully changed status', 'Success-200 !');
      $('#MyTable').DataTable().destroy();
      
      this.getmodule()
    }
  }, err => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 422) {  
        this.toastrService.error(err.error.Message, 'Error !');
      }

    }
  })
}
  //excel_converter_download
  downloadExcel(tablerefrece:any){
    let fileName='moduleMaster.xLsx'
    let element = document.getElementById(tablerefrece.id);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.modulemasterList);
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
