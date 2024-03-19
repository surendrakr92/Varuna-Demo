import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
declare var $ :any

@Component({
  selector: 'app-tds-rate-differential-master',
  templateUrl: './tds-rate-differential-master.component.html',
  styleUrls: ['./tds-rate-differential-master.component.scss']
})
export class TdsRateDifferentialMasterComponent implements OnInit {
  UserId:any
  tdsrateDiffMasterList:any
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
 this.getTDSrateDiffMaster()

  }


getTDSrateDiffMaster(){
  this.masterService.getAllTDSRateDiffMasterList().subscribe((res:any)=>{
    this.tdsrateDiffMasterList = res.data
    this.dtTrigger.next(null)
  })
}


//   activeInactive(id: any) {
//     var json =new vehicleMaster
//     json.vehicleDetailId=id
//     json.updatedBy=this.UserId //for Id  
//     this.masterService.disableAndEnableVehicleMaster(json).subscribe((res: any) => {
//       if (res.succeeded) {
//         this.toastrService.success('succesfully changed status', 'Success-200 !');
//         $('#MyTable').DataTable().destroy();
//        this.getVehicleMasterList()
//       }
//     }, err => {
//       if (err instanceof HttpErrorResponse) {
//         if (err.status === 422) {  
//           this.toastrService.error(err.error.Message, 'Error !');
//         }

//       }
//     })
// }

// downloadExcel(tablerefrece:any){
//   let fileName='tds-rate-differential-master.xLsx'
//   let element = document.getElementById(tablerefrece.id);
//   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
//   Object.keys(ws).forEach(key => {
// if (ws[key].v === "Action") {
//   delete ws[key];
//  }
// });
// /* generate workbook and add the worksheet */
//  const wb: XLSX.WorkBook = XLSX.utils.book_new();
//  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
//    /* save to file */
// XLSX.writeFile(wb, fileName);
// }
}
