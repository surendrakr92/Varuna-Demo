import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { cngr_cnse_Master } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-cngr-cnge-master-list',
  templateUrl: './cngr-cnge-master-list.component.html',
  styleUrls: ['./cngr-cnge-master-list.component.scss']
})
export class CngrCngeMasterListComponent implements OnInit {
  UserId: any
  cngr_cnse_lists: any = []
  constructor(private cs: CommonServiceService, private masterservice: CountryMasterService,
    private toastrService: ToastrService,
    private routes: Router) {
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
    this.getcngr_cnseList()
  }
  getcngr_cnseList() {
    this.masterservice.getAll_Cngr_Cnse_Master().subscribe((res: any) => {
      this.cngr_cnse_lists = res.data
      this.dtTrigger.next(null)
    })
  }
  redirectionEdit(id: any) {
    this.routes.navigate(['master/cngr-cnge-master/update-cngr-cnge-master/', id])
  }
  activeInactive(id: any) {
    var json = new cngr_cnse_Master
    json.consiConseId = id
    json.updatedBy = this.UserId
    this.masterservice.disableAndEnable_Cngr_Cnse_(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getcngr_cnseList()
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
  downloadExcel(tablerefrece: any) {
    let fileName = 'cngr_cnse.xLsx'
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
