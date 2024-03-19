import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { popupclass } from 'src/app/models/Class/enum';
import { PODpfmtarget } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

@Component({
  selector: 'app-create-pod-pfm-target-days',
  templateUrl: './create-pod-pfm-target-days.component.html',
  styleUrls: ['./create-pod-pfm-target-days.component.scss']
})
export class CreatePODPFMTargetDaysComponent implements OnInit {
  submitted = false
  formMaster!: FormGroup
  zoneList: any

  branchMasterList: any
  UserId: any
  podtargetDetailsById: any = ''
  constructor(private formbuilder: FormBuilder, private toastrService: ToastrService,
    private routes: Router, private indentservice: IndentServiceService,
    private router:ActivatedRoute,
    private cs: CommonServiceService, private modalService: ModalPopupService,
    private masterService: CountryMasterService,) {
    this.UserId = this.cs.login_User_Code()//for id
  }

  ngOnInit(): void {
    this.formMaster = this.formbuilder.group({
      zoneId: ['', Validators.required],
      branchId: ['', Validators.required],
      podScanDays: ['', Validators.required],
      pfmScanDays: ['', Validators.required],
      isActive: [true],
    })
    this.dropDownList()
    this.router.params.subscribe((res) => {
      debugger
      this.podtargetDetailsById = res
      if (this.podtargetDetailsById.id) {
       let data=JSON.parse(sessionStorage.getItem('scanData') ||'{}')
       console.log(data)
       this.formMaster.patchValue(data)
      }
    })
  }

  get f() {
    return this.formMaster.controls
  }
  Submit() {
    this.submitted = true
    if (this.formMaster.invalid) {
      return
    }
    var podjson = new PODpfmtarget
    podjson = this.formMaster.value
    if (this.podtargetDetailsById.id == undefined) { podjson.createdBy = +this.UserId }
    else { podjson.updatedBy = +this.UserId; podjson.scanDaysId = this.podtargetDetailsById.id }
    if (this.podtargetDetailsById == "") {

      this.indentservice.creatPODpfmTarget(podjson).subscribe((res: any) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['indent/POD-PFM-Target-days']);
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

    } else {
      this.indentservice.editPODpfmTarget(podjson).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['indent/POD-PFM-Target-days']);
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
  }

  dropDownList() {
    this.masterService.getAllBranchMasterList().subscribe((res: any) => {
      this.branchMasterList = res.data
    })
    this.masterService.getAllZoneList().subscribe((res: any) => {
      this.zoneList = res.data
    })
  }
}
