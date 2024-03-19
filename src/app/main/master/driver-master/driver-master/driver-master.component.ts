import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response';
import { cityMaster, driverMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
declare var $: any
import * as XLSX from 'xlsx'
import { takeUntil } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-driver-master',
  templateUrl: './driver-master.component.html',
  styleUrls: ['./driver-master.component.scss']
})
export class DriverMasterComponent implements OnInit, AfterViewInit {
  driverList: any = [];
  driverFinalList: any = [];
  UserId: any
  activeTab: any = "general_details";
  @ViewChild('MyTable1', { static: false }) table1: DataTableDirective | any;
  @ViewChild('MyTable2', { static: false }) table2: DataTableDirective | any;
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  public isDataLoaded = false;
  public isDataLoadedd = false;
  constructor(private cityservice: CountryMasterService,
    private routes: Router,
    private toastrService: ToastrService, private cs: CommonServiceService,//for id
  ) {
    this.initializeDataTables()
    this.UserId = this.cs.login_User_Code()//for id
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.initializeDataTables(); // Initialize DataTables configuration
    this.getDriverList(); // Fetch initial data
  }
  redirectionEdit(id: any) {
    this.routes.navigate(['master/driver-master/update-driver-master/', id])
    sessionStorage.setItem('finalSubmision', 'secondForm')
  }
  redirectionEdit1(id: any) {
    this.routes.navigate(['master/driver-master/update-driver-master/', id])
    sessionStorage.setItem('finalSubmision', '')
  }
  activeInactive(id: any) {
    var json = new driverMaster
    json.driverId = id
    json.updatedBy = this.UserId //for Id  
    this.cityservice.disableAndEnableDriver(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getFinDriverList()
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          this.toastrService.error(err.error.Message, 'Error !');
        }

      }
    })
  }
  downloadExcel(tablerefrece?: any) {
    let fileName = 'driverMaster.xLsx'
    let element = document.getElementById(tablerefrece.id);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.driverList);
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
  onTabClick(nextTab?: string) {
    this.activeTab = nextTab;
    if (this.activeTab === 'branch_details') {
      this.getFinDriverList();
    } else {
      this.getDriverList();
    }
  }
  getFinDriverList() {
    this.cityservice.getDriverMasterList().subscribe((res: any) => {
      this.driverFinalList = res.data;
      // Manually trigger the DataTables update
      if (this.isDataLoadedd && this.table1) {
        this.table1?.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.initializeDataTables();
          this.dtTrigger.next(null);
        });
      } else {
        this.isDataLoadedd = true;
      }
    });
  }
  getDriverList() {
    this.cityservice.getAllDriverMaster().subscribe((res: any) => {
      this.driverList = res.data as ApiResponse;
      debugger
      // Manually trigger the DataTables update
      if (this.isDataLoaded && this.table2) {
        this.table2?.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.initializeDataTables();
          this.dtTrigger.next(null);
        });
      } else {
        this.isDataLoaded = true;
      }
    });
  }
  initializeDataTables() {
    this.dtOptions = {
      lengthMenu: [5, 10, 20, 50, 100],
      // ... (other DataTables options)
    };
  }
  redirectionFinalView(a: Number) {
    if (a == 1) sessionStorage.removeItem('finalSubmision')
    else sessionStorage.setItem('finalSubmision', 'secondForm')
  }
}