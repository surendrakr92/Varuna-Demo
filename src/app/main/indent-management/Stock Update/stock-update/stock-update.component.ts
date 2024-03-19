import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { get } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';

@Component({
  selector: 'app-stock-update',
  templateUrl: './stock-update.component.html',
  styleUrls: ['./stock-update.component.scss']
})
export class StockUpdateComponent implements OnInit {

  formMaster!: FormGroup
  submitted = false
  branchList: any = ''
  UserId: any
  stockUpdateList: any = []
  ShowDaterange = false;
  constructor(private formbuilder: FormBuilder, private route: Router,
    private masterService: CountryMasterService, private cs: CommonServiceService,
    private tosterservice:ToastrService,
    private indentServ: IndentServiceService) {

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
    this.formMaster = this.formbuilder.group({
      rangeDate: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      thcno: ["", Validators.required],
      mfNo: ["", Validators.required],
      branchId: [this.cs.login_UserCurrBranchId(), Validators.required],
      presentDate: new FormControl(new Date().toISOString().substring(0, 10)),
    })
    this.DropDownList()

  }
  get f() {
    return this.formMaster.controls
  }
  showStockUpdate() {
    this.submitted = true
    if (this.formMaster.invalid) {
      return
    }
   let json:any={
      "branchId": 1,
      "thcno": "THCHRD-2300003",
      "fromDate": "2024-03-11T12:46:26.056Z",
      "toDate": "2024-03-11T12:46:26.056Z"
    }
    $('#MyTable').DataTable().destroy();
    this.indentServ.getDataForStockUpdate(this.formMaster.value).subscribe((res: any) => {
      if (res.succeeded) {
        this.stockUpdateList = res.data;
        $('#MyTable').DataTable().destroy();
        this.dtOptions = {
          lengthMenu: [5, 10, 20, 50, 100],
        } 
        setTimeout(() => {
          $('#MyTable').DataTable(this.dtOptions); // Initialize after a short delay
        }, 100); // Adjust delay if necessary
      

      }
    }, err => {
      this.tosterservice.error(err.error.Message);

    })
   
  }

  calenderList = [
    { calId: 1, type: "Select Date Range" },
    { calId: 2, type: "Last week (Including today)" },
    { calId: 3, type: "Today" },
    { calId: 4, type: "THC till date" }
  ]
  DropDownList() {
    this.masterService.getAllBranchMasterList().subscribe((res: any) => {
      this.branchList = res.data
      console.log(this.branchList)

    })
  }
  routelink(details:any) {
    this.route.navigate(['indent/stock-update/stock-update-list']);
    sessionStorage.setItem('stock-json',JSON.stringify(details))
  }
  filterDate(event: any) {
    console.log(event)

  }

  selectionDate(event: any) {

    this.formMaster.controls["fromDate"].setValue("");
    this.formMaster.controls["toDate"].setValue("");
    if (event == 3) {
      this.ShowDaterange = true;
      this.formMaster.controls["fromDate"].setValue(
        this.formMaster.controls.presentDate.value
      );
      this.formMaster.controls["toDate"].setValue(
        this.formMaster.controls.presentDate.value
      );
    } else if (event == 2) {
      this.ShowDaterange = true;
      this.formMaster.controls["toDate"].setValue(
        this.formMaster.controls.presentDate.value
      );
      this.formMaster.controls["fromDate"].setValue(
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .substring(0, 10)
      );
    } else if (event == 4) {
      this.ShowDaterange = true;
      this.formMaster.controls["fromDate"].setValue("1990-12-12");
      this.formMaster.controls["toDate"].setValue(
        this.formMaster.controls.presentDate.value
      );
    } else {
      this.ShowDaterange = true;
      this.formMaster.controls["fromDate"].setValue("");
      this.formMaster.controls["toDate"].setValue("");
      this.formMaster.controls["fromDate"].enable();
      this.formMaster.controls["toDate"].enable();
    }
  }



}
