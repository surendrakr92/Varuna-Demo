import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-mv-availability-list',
  templateUrl: './mv-availability-list.component.html',
  styleUrls: ['./mv-availability-list.component.scss']
})
export class MvAvailabilityListComponent implements OnInit {
  msList: any
  formMaster!: FormGroup
  submitted = false
  vendorList: any
  vehicleList: any
  rateUnit: any
  clityList: any
  constructor(private masterservice: EventMasterService,
    private formbuilder: FormBuilder,
    private modalService: ModalPopupService, private countryservice: CountryMasterService) {

    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.getAllMsAvAList()
    this.GetAllVendorList()
    this.GeneralMasterDropDown()
    this.GetAllCityList()

    this.formMaster = this.formbuilder.group({
      vendorName: ['', Validators.required],
      vendorMobileNo: ['', Validators.required],
      vehicleNo: ['', Validators.required],
      vehicleTypeId: ['', Validators.required],
      fromCityId: ['', Validators.required],
      toCityId: ['', Validators.required],
      rateTypeId: ['', Validators.required],
      rate: ['', Validators.required],
      entryRemarks: [''],
    })

  }


  get f() {
    return this.formMaster.controls
  }
  submit() {
    this.submitted = true
    if (this.formMaster.invalid) {
      return
    }

  }
  getAllMsAvAList() {
    this.masterservice.getAllMsAvalabilityList().subscribe((res: any) => {
      this.msList = res.data
    })
  }
  GetAllVendorList() {
    this.countryservice.getAllVendorMaster().subscribe((res: any) => {
      this.vendorList = res.data
    })
  }
  GeneralMasterDropDown() {
    this.countryservice.getGeneralMasterByCodeTyoeId(63).subscribe((res: any) => {
      this.vehicleList = res.data
    })
    this.countryservice.getGeneralMasterByCodeTyoeId(118).subscribe((res: any) => {
      this.rateUnit = res.data
    })
  }
  GetAllCityList() {
    this.countryservice.getAllCityMasterList().subscribe((res: any) => {
      this.clityList = res.data
    })
  }
  downloadExcel(tablerefrece: any) {
    //   let fileName='mvAvailibilityList.xLsx'
    //   let element = document.getElementById(tablerefrece.id);
    //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.msList);
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
  }
  viewPdfFileOPen(model: any) {
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
  }
}
