import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { pinCodeMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import * as XLSX from 'xlsx'
declare var $: any
@Component({
  selector: 'app-pin-code',
  templateUrl: './pin-code.component.html',
  styleUrls: ['./pin-code.component.scss']
})
export class PinCodeComponent implements OnInit {
  pinCodeList: any = []
  UserId: any
  flag = 0
  totalItems: number = 5; // Initialize total items
  searchD: any = ''
  itemsPerPage: number = 5;
  p: number = 1;
  constructor(private pinCodeServices: CountryMasterService,
    private routes: Router, private cs: CommonServiceService,//for id
    private toastrService: ToastrService) {
    this.UserId = this.cs.login_User_Code()//for id       
  }
  countryList: any = []
  ngOnInit(): void {
    this.getPincode()
  }
  getPincode() {
    let data = {
      cityId: 0,
      pageNumber: this.p, // Use this.p for page number
      pageSize: this.itemsPerPage,
      searchD: this.searchD
    };
    this.pinCodeServices.getAllPincodeMasterListTest(data).subscribe((res: any) => {
      this.pinCodeList = res.data;
      this.totalItems = res.totalCount; // Assign the total count from API res.totalCount `

    },err=>{
      this.toastrService.error('Error!',err.error.Message);
    });
  }
  redirectionEdit(id: any) {
    this.routes.navigate(['master/pin-code/update-pincode/', id])
  }
  activeInactive(id: any) {
    var json = new pinCodeMaster
    json.pincodeId = id
    json.updatedBy = this.UserId //for Id   
    this.pinCodeServices.disableAndEnablePincode(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        this.pinCodeList()
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          this.toastrService.error(err.error.Message, 'Error !');
        }

      }
    })
  }
  downloadExcel() {
    let fileName = 'pinCode.xLsx'
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.pinCodeList);
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
  pagination(ev: number) {

    this.p = ev
    // this.p++;
    this.getPincode();
  }

  correctPage(event: number) {
    // Handle page bounds correction logic here
    // This method will be called when pageBoundsCorrection event is emitted
    this.p = event; // Update the current page number based on bounds correction
    this.getPincode(); // Retrieve data for the corrected page
  }
  pagePerData(e: any) {
    // console.log(e.target.value)
    this.itemsPerPage = +(e.target.value)
    this.getPincode();
  }
  searchData(ev: any) {
    debugger
    if (ev.length > 4) {
      this.p = 0 // Use this.p for page number
      this.itemsPerPage = 0
      this.searchD = +ev
      this.getPincode()
    } else if (ev.length == 0) {
      this.resetData()
    }
  }
  resetData() {
    this.itemsPerPage = 5
    this.p = 1
    this.searchD = '',
      // (<HTMLInputElement>document.getElementById("dataaa")).value=''
      this.getPincode();
    (<HTMLInputElement>document.getElementById("dataaa")).value = '';

  }
}
