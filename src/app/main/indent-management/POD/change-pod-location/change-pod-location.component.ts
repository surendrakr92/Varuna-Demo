import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

@Component({
  selector: 'app-change-pod-location',
  templateUrl: './change-pod-location.component.html',
  styleUrls: ['./change-pod-location.component.scss']
})
export class ChangePODLocationComponent implements OnInit {
  submitt = false
  submitted = false
  formMaster1!: FormGroup
  formMaster!: FormGroup
  podNotRecdReasonList: any
  branchMasterList: any
  showTable = false
  changePodLocationList: any = ''
  UserId: any
  userNameId: any
  constructor(private formbuilder: FormBuilder, private indentservice: IndentServiceService, private cs: CommonServiceService,
    private fb: FormBuilder, private modalService: ModalPopupService, private toastrService: ToastrService,
    private masterService: CountryMasterService,) {

    this.UserId = this.cs.login_User_Code()//for id
    this.userNameId = cs.login_UserName()
  }

  ngOnInit(): void {
    this.formMaster1 = this.formbuilder.group({
      prqNo: ["", Validators.required],
    })
    this.dropDownList()
    this.fliter()
    this.formMaster.controls['userId'].setValue(this.userNameId)
  }

  get fs() {
    return this.formMaster1.controls
  }
  OnSearch() {
    this.submitt = true
    if (this.formMaster1.invalid) {
      return
    }
    this.indentservice.getPODLocationtDetByFtr(this.formMaster1.value).subscribe((res: any) => {
      this.changePodLocationList = res.data

    })
  }


  fliter() {
    this.formMaster = this.fb.group({
      prqId: [""],
      userId: [""],
      isPodReceived: [""],
      podNotRecdReasonId: [""],
      podRecdBranchId: [""],
      existlcn:[this.cs.login_UserCurrBranchId()]

    })
  }

  get f() {
    return this.formMaster.controls
  }
  Submit(model: any) {
    debugger
    this.submitted = true
    if(this.formMaster.invalid){
      return
    }  
    let json = {
      "prqId": this.changePodLocationList.docketId,
      "docketId": this.changePodLocationList.docketId,
      "isPodReceived": this.formMaster.controls.isPodReceived.value,
      "podNotRecdReasonId": this.formMaster.controls.podNotRecdReasonId.value,
      "podRecdBranchId": this.formMaster.controls.podRecdBranchId.value,
      "updatedBy": this.UserId,
    }
    this.indentservice.creatPODLocationTarget(json).subscribe((res: any) => {
      // this.toastrService.success('succesfully Saved !', 'Success-200 !');
      this.formMaster.reset()
      this.formMaster1.reset()
      this.changePodLocationList=''

      this.modalService.modalOpenSuccess(
        model,
        popupclass.info,
        true,
        false,
        false,
        popupclass.small
      )
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger

          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formMaster.get(err.error.Errors[prop]?.PropertyName);
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






  POD_Received = [
    { id: 1, type: 'Yes' },
    { id: 2, type: 'No' },
  ]

  dropDownList() {
    this.masterService.getGeneralMasterByCodeTyoeId(113).subscribe((res: any) => {
      this.podNotRecdReasonList = res.data

    })
    this.masterService.getAllBranchMasterList().subscribe((res: any) => {
      this.branchMasterList = res.data
    })
  }
}
