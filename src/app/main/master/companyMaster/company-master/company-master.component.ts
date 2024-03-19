import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { companyMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import * as XLSX from 'xlsx'
declare var $ :any

@Component({
  selector: 'app-company-master',
  templateUrl: './company-master.component.html',
  styleUrls: ['./company-master.component.scss']
})
export class CompanyMasterComponent implements OnInit {

  CompanyList:any=[]
  UserId:any

  constructor(private companyMasterServices:CountryMasterService,
     private routes:Router, private cs:CommonServiceService,//for id
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
    
 
this.getCompanyList()
  }
  getCompanyList(){
    this.companyMasterServices.getAllCompanyMasterList().subscribe((res:any)=>{
      this.CompanyList= res.data;
      console.log(this.CompanyList)
      this.dtTrigger.next(null)
          })
  }
  redirectionEdit(id: any) {
    this.routes.navigate(['/master/company-master/update-company-master/', id])
  }
  activeInactive(id: any) {
    var json =new companyMaster
    json.companyId=id
    json.updatedBy=this.UserId   
    this.companyMasterServices.disableAndEnableCompanyMaster(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getCompanyList()
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
  let fileName='companyMaster.xLsx'
  let element = document.getElementById(tablerefrece.id);
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.CompanyList);
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
