import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

@Component({
  selector: 'app-rate-update',
  templateUrl: './rate-update.component.html',
  styleUrls: ['./rate-update.component.scss']
})
export class RateUpdateComponent implements OnInit {
  filterValidationForm: any = FormGroup
  seachCrit: any = FormGroup
  submitted = false
  filterValidate = false
  payBasisList: any
  customerMasterList: any
  newShow = false
  reasonUpdateList: any
  ftlTypeList: any
  cityList: any
  customerlist: any
  contractByCustlist: any = []
  matrixAllowed: any = []
  transitModeList: any = []
  lanematserList: any = []
  UserId: any
  openPopJson: any = '';
  patchdataOF: any = '';
  constructor(private formbuilder: FormBuilder, private modalService: ModalPopupService, private cs: CommonServiceService,
    private toastrService: ToastrService,
    private route: Router, private masterService: CountryMasterService, private customerMaster: CustomerMasterServiceService) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    };
    this.UserId = this.cs.login_User_Code(); //for id
  }
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.getGeneralMasterDropDownList()
    this.getCustomerMasterList()
    this.getCitymaster()
    this.getAllCustomerMaster()
    this.formValidation()
  }
  formValidation() {
    this.filterValidationForm = this.formbuilder.group({
      custCodeName: ['', Validators.required],
    })
    this.seachCrit = this.formbuilder.group({
      contractId: ['', Validators.required],
      fromCityId: [null],
      toCityId: [null],
      reasonId: [null],
      ftlTypeId: [null],
      transTypeId: [null,Validators.required],
      laneId: [null],
      matrixTypeId: [null,Validators.required],
      name: [''],
    })
    let sessionData: any = sessionStorage.getItem('contractIdBackUpForRate')
    if (sessionData) {
      debugger
      $('#MyTable').DataTable().destroy();
      this.customerMaster.getallContractsbyCustomer(+(sessionData)).subscribe((res: any) => {
        this.contractByCustlist = res.data
        this.filterValidationForm.controls['custCodeName'].setValue(+sessionData)
        this.dtTrigger.next(null);
      })
    }
  }
  get f() {
    return this.filterValidationForm.controls
  }
  get searchV() {
    return this.seachCrit.controls
  }
  getGeneralMasterDropDownList() {
    this.masterService.getGeneralMasterByCodeTyoeId(33).subscribe((res: any) => {
      this.payBasisList = res.data
    })
    this.masterService.getGeneralMasterByCodeTyoeId(110).subscribe((res: any) => {
      this.reasonUpdateList = res.data
    })
    this.masterService.getGeneralMasterByCodeTyoeId(63).subscribe((res: any) => {
      this.ftlTypeList = res.data
    })
    this.masterService
      .getGeneralMasterByCodeTyoeId(120)
      .subscribe((res: any) => {
        this.transitModeList = res.data;
      });
    this.masterService
      .getGeneralMasterByCodeTyoeId(123)
      .subscribe((res: any) => {
        this.matrixAllowed = res.data;
      });
    this.masterService.getAllLaneMaster().subscribe((res: any) => {
      this.lanematserList = res.data
    })
  }
  getCustomerMasterList() {
    this.customerMaster.getAllCustomerMaster().subscribe((res: any) => {
      this.customerMasterList = res.data
    })
  }
  getCitymaster() {
    this.masterService.getAllCityMasterList().subscribe((res: any) => {
      this.cityList = res.data
    })
  }
  getAllCustomerMaster() {
    this.masterService.getAllClusterMasterList().subscribe((res: any) => {
      this.customerlist = res.data
    })
  }
  modelopen(model: any, name: any) {
    debugger;
    $('#MyTable').DataTable().destroy();
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
    this.openPopJson = name
    this.seachCrit.controls['contractId'].setValue(name.contractId)
    this.seachCrit.controls['name'].setValue('Ftl Freight Matrix')
    this.dtTrigger.next(null);
  }
  submitRate() {
    this.filterValidate = true
    if (this.seachCrit.invalid) return
    console.warn(this.seachCrit.value)
    let parsingJson: any = this.seachCrit.value
    parsingJson['contractStartDate'] = this.openPopJson?.contractStartDate
    parsingJson['contractEndDate'] = this.openPopJson?.contractEndDate
    parsingJson['location'] = this?.patchdataOF
    parsingJson['custIdData']=this.filterValidationForm.controls['custCodeName'].value
    sessionStorage.setItem('filterSearch', JSON.stringify(this.seachCrit.value))
    this.route.navigate(['/master/rate-update/rate-update-list', this.openPopJson.contractId])
    sessionStorage.removeItem('contractIdBackUpForRate')
    this.modalService.closeModal()
  }
  showExistingTables() {
    this.submitted = true
    let object = {
      custCodeName: this.filterValidationForm.controls['custCodeName'].value
    }
    if (object.custCodeName) {
      $('#MyTable').DataTable().destroy();
      this.customerMaster.getallContractsbyCustomer(object.custCodeName).subscribe((res: any) => {
        this.contractByCustlist = res.data
        this.dtTrigger.next(null);
      })
    }
    sessionStorage.removeItem('contractIdBackUpForRate') 
  }
  selectLaneDetails(item: any) {
    this.patchdataOF = item
    // this.seachCrit.controls['laneId'].setValue(this.patchdataOF?.laneId)
  }
  refreshGrid() {
    $('#MyTable').DataTable().destroy();
    this.contractByCustlist = []
  }
}

