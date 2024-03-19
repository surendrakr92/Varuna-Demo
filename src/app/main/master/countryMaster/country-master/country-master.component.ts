import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CountryMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';
declare var $: any
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-country-master',
  templateUrl: './country-master.component.html',
  styleUrls: ['./country-master.component.scss'],
})
export class CountryMasterComponent implements OnInit {

  constructor(private masterservice: CountryMasterService,
    private toastrService: ToastrService,
    private sserve:SharedService,
    private cs: CommonServiceService,//for id
    private routes: Router) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5,10, 20, 50, 100,200],
      // processing:true,
    }
    this.UserId = this.cs.login_User_Code()//for id
  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  countryList: any = []
  UserId: any
  ngOnInit(): void {
    this.getCountryList()
  }
  getCountryList() {
    this.masterservice.getAllCountryList().subscribe((res: any) => {
      this.countryList = res.data
      this.dtTrigger.next(null)
    })
  }
  rediredctionView(id: any) {
    this.routes.navigate(['master/country-master/View-CountryMaster/', id])
  }
  redirectionEdit(id: any) {
    this.routes.navigate(['master/country-master/update-country-master/', id])
  }
  activeInactive(id: any) {
    var json = new CountryMaster
    json.countryId = id
    json.updatedBy = this.UserId //for Id
    this.masterservice.disableAndEnableCountry(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();

        this.getCountryList()
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
    this.sserve.downLoadXlsFileLocalsAccJson(this.countryList,'countryMaster.xLsx').subscribe((res:any)=>{

    })
    // let fileName = 'countryMaster.xLsx'
    // let element = document.getElementById(tablerefrece.id);
    // const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.countryList);
    // Object.keys(ws).forEach(key => {
    //   if (ws[key].v === "Action") {
    //     delete ws[key];
    //   }
    // });
    // /* generate workbook and add the worksheet */
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // /* save to file */
    // XLSX.writeFile(wb, fileName);
  }
}

