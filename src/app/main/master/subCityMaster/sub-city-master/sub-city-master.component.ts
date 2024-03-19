import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CountryMaster, subCityMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import * as XLSX from 'xlsx'
declare var $ :any
@Component({
  selector: 'app-sub-city-master',
  templateUrl: './sub-city-master.component.html',
  styleUrls: ['./sub-city-master.component.scss']
})
export class SubCityMasterComponent implements OnInit {
 subCityMasterList:any
 UserId:any
 totalItems: number = 5; // Initialize total items
 searchD:any=''
 itemsPerPage: number = 5;
 p: number = 1;
  constructor(private masterservice:CountryMasterService,
    private route:Router,private cs:CommonServiceService,//for id
    private toastrService:ToastrService){
    this.UserId=this.cs.login_User_Code()//for id
  }
  ngOnInit(): void {
  this.getSubCity()
  }
  getSubCity(){
    let data = {
      cityId: 0,
      pageNumber: this.p, // Use this.p for page number
      pageSize: this.itemsPerPage,
      searchD: this.searchD
    };
    this.masterservice.getAllSubCityMasterList(data).subscribe((res: any) => {
      this.subCityMasterList = res.data;
      this.totalItems = res.totalCount; // Assign the total count from API
      
    });
          
  }
 
  redirectionEdit(id:any){
this.route.navigate(['master/sub-city-master/update-sub-city-master',id])
  }
 activeInactive(id: any) {
    var json=new subCityMaster
    json.subCityId=id
    json.updatedBy=this.UserId
    this.masterservice.disableAndEnableSubCityMaster(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.subCityMasterList()
      
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
    let fileName='subCityMaster.xLsx'
    let element = document.getElementById(tablerefrece.id);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.subCityMasterList);
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
  pagination(ev: number) {
    
    this.p=ev
    // this.p++;
    this.getSubCity();
  }

  correctPage(event: number) {
    this.p = event; // Update the current page number based on bounds correction
    this.getSubCity(); // Retrieve data for the corrected page
  }
  pagePerData(e: any) {
    // console.log(e.target.value)
    this.itemsPerPage = +(e.target.value)
    this.getSubCity();
  }
  searchData(ev: any) {
    debugger
    if (ev.length > 4) {
      this.p = 0 // Use this.p for page number
      this.itemsPerPage = 0
      this.searchD = ev
      this.getSubCity()
    } else if (ev.length == 0) {
      this.resetData()
    }
  }
  resetData() {
    this.itemsPerPage = 5
    this.p = 1
    this.searchD = '',
      // (<HTMLInputElement>document.getElementById("dataaa")).value=''
      this.getSubCity();
    (<HTMLInputElement>document.getElementById("dataaa")).value = '';

  }
}
