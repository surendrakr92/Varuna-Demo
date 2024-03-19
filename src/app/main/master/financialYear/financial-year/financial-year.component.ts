import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { finYear } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import * as XLSX from 'xlsx'
declare var $ :any
@Component({
  selector: 'app-financial-year',
  templateUrl: './financial-year.component.html',
  styleUrls: ['./financial-year.component.scss']
})
export class FinancialYearComponent implements OnInit {
FinYearList:any
UserId:any
  constructor(private masterservices:CountryMasterService,
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
    this.getAllFinYear()
    
  }
  getAllFinYear(){
    this.masterservices.getAllFinancialYear().subscribe((res:any)=>{
      this.FinYearList=res.data
      this.dtTrigger.next(null)
    })
  }
  redirectionEdit(id: any) {
    this.routes.navigate(['master/financial-year/update-financial-year/', id])
  }
  activeInactive(id: any) {
    var json =new finYear
    json.finId =id
    json.updatedBy=this.UserId
    this.masterservices.disableAndEnableFinYear(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getAllFinYear()
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {  
          this.toastrService.error(err.error.Message, 'Error !');
        }
  
      }
    })
  }
  getDivisionList() {
    throw new Error('Method not implemented.');
  }
  //excel_converter_download
  downloadExcel(tablerefrece:any){
    let fileName='financialYear.xLsx'
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
