import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { branchLevel } from 'src/app/models/master';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
declare var $ :any
import * as XLSX from 'xlsx'
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
@Component({
  selector: 'app-branch',
  templateUrl: './branchLevel.component.html',
  styleUrls: ['./branchLevel.component.scss']
})
export class BranchComponent implements OnInit {
  closeResult: string | undefined;

  UserId:any

  branchList:any
constructor(private MasterServices:CountryMasterService, 
  private routes:Router, private cs:CommonServiceService,//for id
  private toastrService:ToastrService, private modalService:NgbModal){
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
  
  this.getBranchList()
}
getBranchList(){
  this.MasterServices.getAllBranchLevelList().subscribe((res:any)=>{
    this.branchList= res.data;
    console.log(this.branchList)
    this.dtTrigger.next(null)
        })
}
redirectionEdit(id: any) {
  this.routes.navigate(['master/branch-level/update-branch-level/', id])
}
activeInactive(id: any) {
  var json=new branchLevel
  json.branchLevelId=id
  json.updatedBy=this.UserId
  this.MasterServices.disableAndEnableBranchLevel(json).subscribe((res: any) => {
    if (res.succeeded) {
      this.toastrService.success('succesfully changed status', 'Success-200 !');
      $('#MyTable').DataTable().destroy();
      
      this.getBranchList()
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
    let fileName='branchLevel.xLsx'
    let element = document.getElementById(tablerefrece.id);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.branchList);
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
