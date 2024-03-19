import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { vehicleMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
declare var $ :any
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-vehicle-master-list',
  templateUrl: './vehicle-master-list.component.html',
  styleUrls: ['./vehicle-master-list.component.scss']
})
export class VehicleMasterListComponent implements OnInit {
  UserId:any
  vehicleList:any
  constructor(private masterService:CountryMasterService, private routes: Router,
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
    this.getVehicleMasterList()

  }
  getVehicleMasterList() {
  this.masterService.getAllVehicleMaster().subscribe((res:any)=>{
    this.vehicleList= res.data
    console.log(this.vehicleList)
    this.dtTrigger.next(null)
  })
  }
  rediredctionView(id: any) {
    this.routes.navigate(['master/vehicle-master-list/view-vehicle-master-list/', id])
  }
  redirectionEdit(id: any) {
    this.routes.navigate(['master/vehicle-master-list/update-vehicle-master/', id])
  }
  activeInactive(id: any) {
    var json =new vehicleMaster
    json.vehicleDetailId=id
    json.updatedBy=this.UserId //for Id  
    this.masterService.disableAndEnableVehicleMaster(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
       this.getVehicleMasterList()
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
  let fileName='vehicleMaster.xLsx'
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
