import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-create-main-and-sub-event-master',
  templateUrl: './create-main-and-sub-event-master.component.html',
  styleUrls: ['./create-main-and-sub-event-master.component.scss']
})
export class CreateMainAndSubEventMasterComponent implements OnInit {
  formMaster: any = FormGroup
  submitted = false
  eventTypeList: any = []
  MainAndSubEventMasterList: any = []
  subEventById: any = ""
  UserId: any
  viewPagecom: any = ""
  showControl=false
  constructor(private formbuilder: FormBuilder, private eventService: EventMasterService,
    private ms: CountryMasterService,
    private routess: ActivatedRoute,
    private toastrService: ToastrService,
    private sh: SharedService,
    private routes: Router,
    private cs: CommonServiceService) {
    this.UserId = this.cs.login_User_Code()//for id
  }
  ngOnInit(): void {
    this.formMaster = this.formbuilder.group({
      eventTypeId: ['', Validators.required],
      eventDesc: ['', Validators.required],
      subEventId: [1],
      shortDesc: ['', Validators.required],//
      mainEventId: [null],
      isActive: [true]
    })
    this.getGeneralmasterDropDown()
    this.routess.params.subscribe((res) => {
      debugger
      let stateMasterId = res.data || res.viewData
      if (res.data) this.viewPagecom = "edit"
      if (res.viewData) this.viewPagecom = "view"
      this.eventService.getSubEventDetailsById(stateMasterId).subscribe((res: any) => {
        this.subEventById = res.data[0]
        this.formMaster.patchValue(res.data[0])
      })
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
    var stateJson: any
    stateJson = this.formMaster.value
    if (this.subEventById.eventId == undefined) { stateJson.createdBy = +this.UserId }
    else { stateJson.updatedBy = +this.UserId; stateJson.eventId = this.subEventById.eventId }

    console.log(stateJson)
    if (this.subEventById == "") {
      this.eventService.createSubEventmaster(stateJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/main-and-sub-event-master']);
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
      this.eventService.editSubEvent(stateJson).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/main-and-sub-event-master']);
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
  getGeneralmasterDropDown() {
    this.ms.getGeneralMasterByCodeTyoeId(76).subscribe((res: any) => {
      this.eventTypeList = res.data
    })
    this.eventService.getAllSubEventMaster().subscribe((res: any) => {
      this.MainAndSubEventMasterList = res.data
    })
  }
  download_pdf_print() {
    let elementId = 'viewData_information'
    this.sh.print_file_to_pdf(elementId).subscribe((res: any) => {

    })
  }
  openCloseMainEvent(ev: any) {
    debugger
    // if (ev == 325) this.showControl=true
    // else this.showControl=false
    if (ev === 325) {
      this.showControl = true;
      // Enable validation by adding the required validator
      this.formMaster.get('mainEventId').setValidators([Validators.required]);
    } else {
      this.showControl = false;
      // Disable validation by removing any validators
      this.formMaster.get('mainEventId').clearValidators();
    }
  
    // Update the validity of the control after changing validators
    this.formMaster.get('mainEventId').updateValueAndValidity();
  }
}
