import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { UploadSOP } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-manage-sop',
  templateUrl: './manage-sop.component.html',
  styleUrls: ['./manage-sop.component.scss']
})
export class ManageSopComponent implements OnInit {
  UserId: any
  manageList:any

constructor(private cs: CommonServiceService, 
  private routes:Router,
  private toastrService:ToastrService,
  private masterService:CountryMasterService){

  this.dtOptions = {
    // pagingType: 'full_numbers',
    lengthMenu: [5, 10, 20, 50, 100],
    // processing:true,
  }
  this.UserId = this.cs.login_UserId()//for id
}
dtTrigger: Subject<any> = new Subject<any>()
dtOptions: DataTables.Settings = {};
ngOnInit(): void {
  this.APIbinding()
}

downloadExcel(tablerefrece: any) {
  let fileName = 'manage-sop.xLsx'
  let element = document.getElementById(tablerefrece.id);
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.manageList);
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

APIbinding(){
  this.masterService.getAllmanageSOPList().subscribe((res:any)=>{
    this.manageList= res.data
    this.dtTrigger.next(null)
    console.log(this.manageList)
  })
}
activeInactive(id: any) {
  var json =new UploadSOP
  json.sopFileId =id
  json.updatedBy=this.UserId  //+(this.UserId)
  this.masterService.deleteSopfile(json).subscribe((res: any) => {
    if (res.succeeded) {
      this.toastrService.success('succesfully changed status', 'Success-200 !');
      this.APIbinding()
      $('#MyTable').DataTable().destroy();
    }
  }, err => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 422) {  
        this.toastrService.error(err.error.Message, 'Error !');
      }

    }
  })
}
redirectEdit(id:any){
  this.routes.navigate(['master/manage-sop/update-upload-sop/', id])
}
}
