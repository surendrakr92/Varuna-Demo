import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-claim-type',
  templateUrl: './claim-type.component.html',
  styleUrls: ['./claim-type.component.scss']
})
export class ClaimTypeComponent implements OnInit {
  claimTypeList: any = []
  UserId: any
  claimFormGroup!: FormGroup
  submitted = false
  claimTypeIdList: any = []
  claimDescIdList: any = []
  claimPatchedValue: any = ""
  constructor(private cs: CommonServiceService,
    private modalService: ModalPopupService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private evService: EventMasterService,
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
    this.claimFormGroup = this.fb.group({
      claimTypeId: ['', Validators.required],
      claimDescId: ['', Validators.required]
    })
    this.getClaimList()
    this.getDropDown()
  }
  get f() {
    return this.claimFormGroup.controls
  }
  getClaimList() {
    this.evService.getAllClaimList().subscribe((res: any) => {
      if (res) this.claimTypeList = res.data; this.dtTrigger.next(null)
    })
  }
  downloadExcel() {
    let fileName = 'claimTypeList.xLsx'
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.claimTypeList);
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
      popupclass.medium
    );
    if (popCond == 'createW') {this.claimFormGroup.reset(); this.claimPatchedValue='' }
    else this.evService.getClaimDetailById(popCond).subscribe((res: any) => {
      if (res) {
        this.claimPatchedValue = res.data[0]
        this.claimFormGroup.patchValue(this.claimPatchedValue)
      }
    })
  }
  submitClaimTDetails() {
    this.submitted = true
    if (this.claimFormGroup.invalid) return
    var claimTypeJson: any
    claimTypeJson = this.claimFormGroup.value
    if (this.claimPatchedValue.claimDetailId == undefined) { claimTypeJson.createdBy = +this.UserId }
    else { claimTypeJson.updatedBy = +this.UserId; claimTypeJson.claimDetailId = this.claimPatchedValue.claimDetailId }
    console.log(claimTypeJson)
    if (this.claimPatchedValue == "") {
      this.evService.createClaimType(claimTypeJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.modalService.closeModal()
        $('#MyTable').DataTable().destroy();
        this.getClaimList()
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.claimFormGroup.get(err.error.Errors[prop]?.PropertyName);
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
      this.evService.editClaimType(claimTypeJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.modalService.closeModal()
        $('#MyTable').DataTable().destroy();
        this.getClaimList()
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.claimFormGroup.get(err.error.Errors[prop]?.PropertyName);
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
  }
}
