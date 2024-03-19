import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ownerMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

import * as XLSX from 'xlsx'
@Component({
  selector: 'app-owner-master-list',
  templateUrl: './owner-master-list.component.html',
  styleUrls: ['./owner-master-list.component.scss']
})
export class OwnerMasterListComponent implements OnInit {
  UserId: any
  ownerMasterList: any
  constructor(private cs: CommonServiceService, private masterservice: CountryMasterService,
    private routes: Router,
    private toastrService: ToastrService) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
    this.UserId = this.cs.login_User_Code()//for id
  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.getAllOwnerMaster()
  }
  getAllOwnerMaster() {
    this.masterservice.getAll_owner_master().subscribe((res: any) => {
      this.ownerMasterList = res.data
      this.dtTrigger.next(null)
    })
  }
  downloadExcel(tablerefrece: any) {
    let fileName = 'ownerMaster.xLsx'
    let element = document.getElementById(tablerefrece.id);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ownerMasterList);
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
  redirectionEdit(id: any) {
    this.routes.navigate(['master/owner-master/update-owner-master/', id])
  }
  redirectionView(id: any) {
    this.routes.navigate(['master/owner-master/view-owner-master/', id])
  }
  activeInactive(id: any) {
    debugger
    var json = new ownerMaster
    json.ownerId = id
    json.updatedBy = this.UserId //for Id  
    this.masterservice.disableAndEnableowner_master(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getAllOwnerMaster()
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          this.toastrService.error(err.error.Message, 'Error !');
        }

      }
    })
  }

}