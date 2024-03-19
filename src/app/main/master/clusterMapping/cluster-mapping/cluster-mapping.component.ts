import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { clusterMapping } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-cluster-mapping',
  templateUrl: './cluster-mapping.component.html',
  styleUrls: ['./cluster-mapping.component.scss']
})
export class ClusterMappingComponent {

  closeResult: string | undefined;
  UserId:any


 clusterMappinghList:any
constructor(private MasterServices:CountryMasterService, 
  private routes:Router,private cs:CommonServiceService,//for id
   private toastrService:ToastrService,
    private modalService:NgbModal){
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
  this.MasterServices.getAllclusterMappingList().subscribe((res:any)=>{
    this.clusterMappinghList= res.data;
    console.log(this.clusterMappinghList)
    this.dtTrigger.next(null)
        })
}
redirectionEdit(id: any) {
  this.routes.navigate(['master/cluster-mapping/update-cluster-mapping/', id])
}
activeInactive(id: any) {
  var json=new clusterMapping
  json.clusterMappingId =id
  json.updatedBy=this.UserId
  this.MasterServices.disableAndEnableclusterMapping(json).subscribe((res: any) => {
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
    let fileName='clusterMapping.xLsx'
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