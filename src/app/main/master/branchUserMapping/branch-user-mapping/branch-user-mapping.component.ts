import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { branchUserMapping } from 'src/app/models/master';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-branch-user-mapping',
  templateUrl: './branch-user-mapping.component.html',
  styleUrls: ['./branch-user-mapping.component.scss']
})
export class BranchUserMappingComponent {
 branchuserMappingList:any=[]
  constructor(private masterservices:CountryMasterService, private routes:Router, private toastrService:ToastrService){
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }

  }

  dtTrigger:Subject<any>=new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
this.getBranchList()
    
  }
  getBranchList(){
  this.masterservices.getAllBranchUserMappingList().subscribe((res:any)=>{
    this.branchuserMappingList=res.data
    this.dtTrigger.next(null)

      })
    }
    redirectionEdit(id:any){
      this.routes.navigate(['master/branch-user-mapping/update-branch-user-mapping/', id])
    }
    activeInactive(id: any) {
      var json =new branchUserMapping
      json.branchMappingId=id
      json.updatedBy=1581   
      this.masterservices.disableAndEnableBranchUserMapping(json).subscribe((res: any) => {
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
    let fileName='branchUserMapping.xLsx'
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
