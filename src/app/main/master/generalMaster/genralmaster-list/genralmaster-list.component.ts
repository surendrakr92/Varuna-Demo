import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { generalMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-genralmaster-list',
  templateUrl: './genralmaster-list.component.html',
  styleUrls: ['./genralmaster-list.component.scss']
})
export class GenralmasterListComponent implements OnInit{
  genMasterListByCodeType:any=[]
  codetypeId:any 
  UserId:any
  headerLabel:any 
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  constructor(private routes:ActivatedRoute,
    private masterServeice:CountryMasterService,private cs:CommonServiceService,//for id
    private toastrService:ToastrService){
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
    this.UserId=this.cs.login_User_Code()//for id
  }
  
ngOnInit(): void {
  this.routes.queryParams.subscribe(
    params => {
      console.log('Got the JWT as: ', params['jwt']);
      this.codetypeId =  params['codetypeId'];
      this.headerLabel=params['headerDesc']
    }
  )  
  this.getAllcode()

}
getAllcode(){
  this.masterServeice.getGeneralMasterByCodeTyoeId(this.codetypeId).subscribe((res:any)=>{
    this.genMasterListByCodeType=res.data
    this.dtTrigger.next(null)
  })
}

activeInactive(id: any) {
  var json = new generalMaster
  json.generalId = id
  json.updatedBy = this.UserId
  this.masterServeice.disableAndEnableGeneralMaster(json).subscribe((res: any) => {
    if (res.succeeded) {
      this.toastrService.success('succesfully changed status', 'Success-200 !');
      $('#MyTable').DataTable().destroy();
      this.getAllcode()
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
downloadExcel(tablerefrece?:any){
  let fileName='generalMaster.xLsx'
  // let element = document.getElementById(tablerefrece.id);
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.genMasterListByCodeType);
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
