import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response';
import { departmentMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
declare var $: any
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-department-master',
  templateUrl: './department-master.component.html',
  styleUrls: ['./department-master.component.scss']
})
export class DepartmentMasterComponent implements OnInit {
  constructor(private masterservice: CountryMasterService, private cs: CommonServiceService,//for id
    private toastrService: ToastrService) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
    this.UserId = this.cs.login_User_Code()//for id
  }
  UserId: any
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  departmentList: any = []
  ngOnInit(): void {
    this.getDeptList()
  }
  getDeptList() {
    this.masterservice.getAllDepartmentMasterList().subscribe((res: any) => {
      this.departmentList = res.data as ApiResponse;
      this.dtTrigger.next(null)
    })

  }
  //excel_converter_download
  downloadExcel(tablerefrece: any) {
    let fileName = 'departmentMaster.xLsx'
    let element = document.getElementById(tablerefrece.id);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.departmentList);
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
  activeInactive(id: any) {
    var json = new departmentMaster
    json.deptId = id
    json.updatedBy = this.UserId
    this.masterservice.disableAndEnableDepartmentMaster(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#tableData').DataTable().destroy();
        this.getDeptList()
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
