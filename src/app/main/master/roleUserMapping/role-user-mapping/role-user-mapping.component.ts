import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { roleUserMapping } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
declare var $ :any
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-role-user-mapping',
  templateUrl: './role-user-mapping.component.html',
  styleUrls: ['./role-user-mapping.component.scss']
})
export class RoleUserMappingComponent {
  roleUserMappingList: any = [];
  UserId:any
  flag = 0;
  constructor(private masterService: CountryMasterService,
     private routes: Router,private cs:CommonServiceService,//for id
    private toastrService:ToastrService) {

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
    this.getRoleUserMappingist()

  }
  getRoleUserMappingist() {
    this.masterService.getAllRoleUserMappingList().subscribe((res: any) => {
      this.roleUserMappingList = res.data;
      this.dtTrigger.next(null)
    })
  }
  rediredctionView(id: any) {
    this.routes.navigate(['master/role-user-mapping/view-role-user-mapping/', id])
  }
  redirectionEdit(id: any) {
    this.routes.navigate(['master/role-user-mapping/update-role-user-mapping/', id])
  }
  activeInactive(id: any) {
    var json =new roleUserMapping
    json.mappingId=id
    json.updatedBy=1581   
    this.masterService.disableAndEnableRoleUserMapping(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getRoleUserMappingist()
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
    let fileName='roleUserMapping.xLsx'
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
