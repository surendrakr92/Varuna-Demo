import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';
@Component({
  selector: 'app-create-event-master',
  templateUrl: './create-event-master.component.html',
  styleUrls: ['./create-event-master.component.scss']
})
export class CreateEventMasterComponent implements OnInit {
  formMaster: any = FormGroup
  submitted = false
  locationList: any
  rulesList: any
  ownerList: any
  eventRuleList: any
  eventSubMasterList: any = [];
  eventPatchedId: any = ""
  eventMainMasterList: any = []
  eventMainMasterListMain: any = []
  UserId: any
  constructor(private formbuilder: FormBuilder, private masterservice: CountryMasterService,
    private eventService: EventMasterService,
    private toastrService: ToastrService,
    private routes: Router,
    private routess: ActivatedRoute,
    private cs: CommonServiceService) {
    this.UserId = this.cs.login_User_Code()//for id
  }
  ngOnInit(): void {
    this.formMaster = this.formbuilder.group({
      eventDesc: ['', Validators.required],
      subEventId: ['', Validators.required],
      mainEventId: ['', Validators.required],
      isReason: [true],
      configTypeId: ['', Validators.required],
      isMainGroup: [true],
      isMainEventChange: [true],
      isRules: ['', Validators.required],
      isOwner: ['', Validators.required],
      descToBePrint: ['', Validators.required],
      gpsEventType: ['', Validators.required],
      availableOnMobile: ['', Validators.required],
      isVisibleControlTower: ['', Validators.required],
      combinedEvent: [''],
      newCombinedEvent: [''],
      nextEvent: ['', Validators.required],//changes
      isActive: [true],
    })
    this.getGeneralmasterDropDown()
    let id = this.routess.snapshot.params.id
    if (id) {
      debugger
      this.eventService.getEventDetailsById(id).subscribe((res: any) => {
        this.eventPatchedId=res.data[0]
        this.formMaster.patchValue(res.data[0])
        const netEventDtl =
        this.eventPatchedId.nextEventDtl?.map(
          (item: { nextEvent: any }) => item.nextEvent
        );
      this.formMaster.controls["nextEvent"].setValue(
        netEventDtl
      );
      })
    }
  }
  getGeneralmasterDropDown() {
    this.masterservice.getGeneralMasterByCodeTyoeId(79).subscribe((res: any) => {
      this.locationList = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(72).subscribe((res: any) => {
      this.rulesList = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(73).subscribe((res: any) => {
      this.ownerList = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(77).subscribe((res: any) => {
      this.eventRuleList = res.data
    })
    this.eventService.getAllSubEventMaster().subscribe((res: any) => {
      this.eventSubMasterList = res.data
    })
    this.eventService.getAllMainEventMaster().subscribe((res: any) => {
      this.eventMainMasterList = res.data
    })
    this.eventService.getAllSubEventMaster().subscribe((res: any) => {
      debugger
      this.eventMainMasterListMain = res.data.filter((x:any)=>x.eventTypeId==324)
    })
  }
  get f() {
    return this.formMaster.controls
  }
  submit() {
    debugger;
    this.submitted = true
    if (this.formMaster.invalid) {
      return
    }
    var reasonJson: any
    reasonJson = this.formMaster.value
    if (this.eventPatchedId.eventId == undefined) {
      reasonJson.createdBy = +this.UserId;
      reasonJson['nextEventDtl'] = this.parseNextEvent(this.formMaster.controls['nextEvent'].value)
    }
    else { reasonJson.updatedBy = +this.UserId; reasonJson.eventId = this.eventPatchedId.eventId 
      reasonJson['nextEventDtl'] = this.parseNextEvent(this.formMaster.controls['nextEvent'].value)}
    console.log(reasonJson)
    if (this.eventPatchedId == "") {
      this.eventService.createEventmaster(reasonJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/event-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
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
      this.eventService.editEvent(reasonJson).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/event-master']);
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
  parseNextEvent(data: any) {
    if (data) {
      return data.map((nextEventId: any) => {
        const mapping = this.eventPatchedId?.nextEventDtl?.find(
          (mapping: { nextEventId: any }) => mapping.nextEventId === nextEventId
        );
        return {
          nextEventId: mapping ? mapping.nextEventId : 0,
          eventId: mapping ? mapping.eventId : 0,
          nextEvent: nextEventId,
        };
      });
    }
  }
}
