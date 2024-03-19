import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { stateMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
declare var $ :any
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.scss']
})
export class StateMasterComponent implements OnInit {
  stateList: any = [];
  UserId:any
  flag = 0;
  constructor(private stateService: CountryMasterService, private routes: Router,
    private cs:CommonServiceService,//for id
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
    this.getStateList()

  }
  getStateList() {
    this.stateService.getAllStateMasterList().subscribe((res: any) => {
      this.stateList = res.data;
      this.dtTrigger.next(null)
    })
  }
  rediredctionView(id: any) {
    this.routes.navigate(['master/state-master/view-state-master/', id])
  }
  redirectionEdit(id: any) {
    this.routes.navigate(['master/state-master/update-state-master/', id])
  }
  activeInactive(id: any) {
    var json =new stateMaster
    json.stateId=id
    json.updatedBy=this.UserId //for Id  
    this.stateService.disableAndEnableState(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getStateList()
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
  let fileName='stateMaster.xLsx'
  let element = document.getElementById(tablerefrece.id);
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.stateList);
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

