import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { customerGroup } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
declare var $ :any
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-customer-group',
  templateUrl: './customer-group.component.html',
  styleUrls: ['./customer-group.component.scss']
})
export class CustomerGroupComponent  implements OnInit{
  customerList: any = [];
  UserId:any
  constructor(private masterservice: CountryMasterService,
    private routes:Router,
    private toastrService:ToastrService,private cs:CommonServiceService,//for id
    ) {
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
    this.getCustomerGroupMasterList()

  }
getCustomerGroupMasterList(){
this.masterservice.getAllCustomerMaster().subscribe((res:any)=>{
  this.customerList=res.data
  this.dtTrigger.next(null)
})
}

  redirectionEdit(id: any) {
    this.routes.navigate(['master/customer-group/update-customer-group/', id])
  }
  activeInactive(id: any) {
    var json =new customerGroup
    json.custGroupId=id
    json.updatedBy=this.UserId //for Id  
    this.masterservice.disableAndEnableCustomerGroup(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getCustomerGroupMasterList()
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
  let fileName='customerGroup.xLsx'
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
