import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { zoneMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import * as XLSX from 'xlsx'
declare var $ :any
@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {

  zoneAllList: any
  UserId:any

  constructor(private masterService: CountryMasterService,
     private routes: Router, private cs:CommonServiceService,//for id
     private toastrService: ToastrService) {

    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
    this.UserId=this.cs.login_User_Code()//for id

  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.getZoneList()
  }

  getZoneList() {
    this.masterService.getAllZoneList().subscribe((res: any) => {
      this.zoneAllList = res.data;
      this.dtTrigger.next(null)
    })
  }
  redirectionEdit(id: any) {
    this.routes.navigate(['master/zone-master/update-zone-master/', id])
  }
  activeInactive(id: any) {
    var json = new zoneMaster
    json.zoneId = id
    json.updatedBy = this.UserId
    this.masterService.disableAndEnableZoneMaster(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getZoneList()
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
    let fileName='zoneMaster.xLsx'
    let element = document.getElementById(tablerefrece.id);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.zoneAllList);
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
