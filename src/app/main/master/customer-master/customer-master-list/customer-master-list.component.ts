import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { customerMaster, finYear } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
declare var $ :any
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-customer-master-list',
  templateUrl: './customer-master-list.component.html',
  styleUrls: ['./customer-master-list.component.scss']
})
export class CustomerMasterListComponent implements OnInit {

customerMasterList:any=[]
UserId:any
show=false
  constructor(private masterservices:CustomerMasterServiceService,
     private routes:Router, private cs:CommonServiceService,//for id
     private toastrService:ToastrService){
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      processing:true,
    }
    this.UserId=this.cs.login_User_Code()//for id
  }
  
  dtTrigger:Subject<any>=new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.cs.destryTableData();
    this.getAllFinYear()
    
  }
  getAllFinYear(){
    this.masterservices.getAllCustomerMaster().subscribe((res:any)=>{
     if(res.succeeded){
      this.customerMasterList=res.data
      this.cs.getDTConfig('CustomerMasterListComponent');
     }
    })
  }
  redirectionEdit(id: any) {
    this.routes.navigate(['master/customer-master/update-customer-master/', id])
  }
  activeInactive(id: any) {
    var json =new customerMaster
    json.custId =id
    json.updatedBy=this.cs.login_UserId()  //+(this.UserId)
    console.log(json)
    this.masterservices.disableAndEnableCustomerMaster(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        // this.getAllFinYear()
        window.location.reload()//need to work
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
    let fileName='customerList.xLsx'
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