import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';

@Component({
  selector: 'app-docket-cancellation',
  templateUrl: './docket-cancellation.component.html',
  styleUrls: ['./docket-cancellation.component.scss']
})
export class DocketCancellationComponent implements OnInit {
  submitt = false
  submitted = false
  formMaster!: FormGroup
  formNONMaster!: FormGroup
  isChecked: boolean = false;
  show: any;
  LRCancellationReason: any
  constructor(private formbuilder: FormBuilder, private builder: FormBuilder, private masterService: CountryMasterService,
    private toastrService: ToastrService,
    private cs: CommonServiceService,
    private indentServ: IndentServiceService) { }
  ngOnInit(): void {
    this.feeded()
    this.dropDownList()
    this.NonFeeded()
  }
  //  feeded 
  feeded() {
    this.formMaster = this.formbuilder.group({
      dockNo: ['', Validators.required],
      cancellationReason: ["", Validators.required],
      createdBy: [this.cs.login_UserId()]

    })
  }
  get fs() {
    return this.formMaster.controls
  }
  OnSubmit() {
    this.submitt = true
    if (this.formMaster.invalid) {
      return
    }
    this.indentServ.docketFeedCancel(this.formMaster.value).subscribe((result) => {
      this.toastrService.success('succesfully Saved !', 'Success-200 !');
      this.feeded()
      this.submitt=false
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger
          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formMaster.get(err.error.Errors[prop]?.PropertyName);
            //wrong key comes 
            if (formControl) {
              debugger
              // activate the error message
              formControl.setErrors({
                serverError: err.error.Errors[prop]?.ErrorMessage
              });
            }
          });
        }
        this.toastrService.error(err.error.Message, `Error status:${err.status}`);
             }
    })
  }
  //  close feeded 
  NonFeeded() {
    this.formNONMaster = this.builder.group({
      dockNo: ["", Validators.required],
      cancelledOn: ["", Validators.required],
      cancelReasonId: ["", Validators.required],
      isCngrCopyRecd: [true],
      isCngeCopyRecd: [true],
      isDriverCopyRecd: [true],
      isAccountCopyRecd: [true],
      isExtraCopyRecd: [true],
      isFirCopyRecd: [true],
      referenceDocumnet: [''],
      selectedDate: [new Date(), Validators.required],
      createdBy: [this.cs.login_UserId()]
    })
  }
  get f() {
    return this.formNONMaster.controls
  }
  Submit() {
    this.submitted = true
    if (this.formNONMaster.invalid) {
      return
    }
    this.indentServ.docketCancel(this.formNONMaster.value).subscribe((result) => {
      this.toastrService.success('succesfully Saved !', 'Success-200 !');
      this.NonFeeded()
      this.submitted=false
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger
          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formNONMaster.get(err.error.Errors[prop]?.PropertyName);
            //wrong key comes 
            if (formControl) {
              debugger
              // activate the error message
              formControl.setErrors({
                serverError: err.error.Errors[prop]?.ErrorMessage
              });
            }
          });
        }
        this.toastrService.error(err.error.Message, `Error status:${err.status}`);
      }
    })
  }

  dropDownList() {
    this.masterService.getGeneralMasterByCodeTyoeId(140).subscribe((res: any) => {
      this.LRCancellationReason = res.data
    })

  }

}
