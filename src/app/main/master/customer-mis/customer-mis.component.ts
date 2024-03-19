import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

import * as XLSX from 'xlsx'

@Component({
  selector: 'app-customer-mis',
  templateUrl: './customer-mis.component.html',
  styleUrls: ['./customer-mis.component.scss']
})
export class CustomerMisComponent {
  customerMisList: any = []
  UserId: any
  customerMIS!: FormGroup
  submitted = false
  claimTypeIdList: any = []
  claimDescIdList: any = []
  customerMasterList: any = []
  claimPatchedValue: any = ""

  constructor(private cs: CommonServiceService,
    private modalService: ModalPopupService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private custServices: CustomerMasterServiceService,
    private cms:CustomerMasterServiceService,
    private ms: CountryMasterService) {
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
   this.formValidation()
    this.getClaimList()
    this.getDropDown()
  }
  get f() {
    return this.customerMIS.controls
  }
  formValidation(){
    this.customerMIS = this.fb.group({
      custId: ['', Validators.required],
      selectPeriod:['', Validators.required],
      misEmailIdTo: ['', [Validators.required, Validators.pattern(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}(\s*[;,]\s*[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,})*$/)]],///^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}(\s*;\s*[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,})*$/
      misEmailIdCc: ['', [Validators.required,Validators.pattern(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}(\s*[;,]\s*[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,})*$/)]],
      emailTime1st:['',Validators.required],
      emailTime2nd:[''],
      emailTime3rd:[''],
      misEnable: [true],
      isActive: [true],
    })
  }
  getClaimList() {
    this.custServices.getAllCustomerMis().subscribe((res: any) => {
      if (res) this.customerMisList = res.data; this.dtTrigger.next(null)
    })
  }
  downloadExcel() {
    let fileName = 'customerMisList.xLsx'
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.customerMisList);
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
  modelOpen(model: any, popCond: any) {
    debugger
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
    if (popCond == 'createW') {this.customerMIS.reset();
      this.formValidation();this.customerMIS.controls['selectPeriod'].setValue("Daily");
      this.submitted=false; this.claimPatchedValue=''}
    else this.custServices.getCustomerMisById(popCond).subscribe((res: any) => {
      if (res) {
        this.formValidation();
        this.claimPatchedValue = res.data
        this.customerMIS.patchValue(this.claimPatchedValue)
      }
    })
  }
  submitClaimTDetails() {
    this.submitted = true
    if (this.customerMIS.invalid) return
    var claimTypeJson: any
    claimTypeJson = this.customerMIS.value
    if (this.claimPatchedValue.misId == undefined) { claimTypeJson.createdBy = +this.UserId }
    else { claimTypeJson.updatedBy = +this.UserId; claimTypeJson.misId = this.claimPatchedValue.misId }
    console.log(claimTypeJson)
    if (this.claimPatchedValue == "") {
      this.custServices.createCustomerMis(claimTypeJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.modalService.closeModal()
        $('#MyTable').DataTable().destroy();
        this.getClaimList()
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.customerMIS.get(err.error.Errors[prop]?.PropertyName);
              //wrong key comes 
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: err.error.Errors[prop]?.ErrorMessage
                });
              }
            });
          }
          this.toastrService.error(err.error.Message, `Error statu:${err.status}`);
        }
      })
    } else {
      this.custServices.editCustomerMis(claimTypeJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.modalService.closeModal()
        $('#MyTable').DataTable().destroy();
        this.getClaimList()
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.customerMIS.get(err.error.Errors[prop]?.PropertyName);
              //wrong key comes 
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: err.error.Errors[prop]?.ErrorMessage
                });
              }
            });
          }
          this.toastrService.error(err.error.Message, `Error statu:${err.status}`);
        }
      })
    }
  }
  getDropDown() {
    this.ms.getGeneralMasterByCodeTyoeId(89).subscribe((res: any) => this.claimTypeIdList = res.data)
    this.ms.getGeneralMasterByCodeTyoeId(90).subscribe((res: any) => this.claimDescIdList = res.data)
    this.cms.getAllCustomerMaster().subscribe((Res:any)=>{
      this.customerMasterList=Res.data
    })
  }
  activeInactive(id: any) {
    debugger
    var json :any={}
    json['misId'] =id
    json['updatedBy']=+(this.UserId)
    this.custServices.disableAndEnableCustomerMis(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getClaimList()
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
