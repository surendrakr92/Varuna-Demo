import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';

@Component({
  selector: 'app-driver-performance-remarks-create',
  templateUrl: './driver-performance-remarks-create.component.html',
  styleUrls: ['./driver-performance-remarks-create.component.scss']
})
export class DriverPerformanceRemarksCreateComponent implements OnInit {
  submitted = false
  formMaster!: FormGroup
  driverList: any
  remarkList: any
  constructor(private fb: FormBuilder, private masterService: CountryMasterService, private eventMaster: EventMasterService,) { }
  ngOnInit(): void {
    this.formMaster = this.fb.group({
      groupId: ["", Validators.required],
      driverId: ["", Validators.required],
      driverName: [''],
      vehicleNo: [''],
      dprDate: [""],
      remarksID: [""],
      driverRemark: [""],
      isCaseClosed: [""],
      penalty: [''],
      staffRemark: [""],
      actionTaken: [""],
      createdOn: [""]
    })
    this.APIBinding()
    let pactchedJSon=JSON.parse(sessionStorage.getItem('driverPerformance')||'{}')
    console.log(pactchedJSon)
    this.formMaster.patchValue(pactchedJSon)
  }
  get f() {
    return this.formMaster.controls
  }

  APIBinding() {
    this.masterService.getAllDriverMaster().subscribe((res: any) => {
      this.driverList = res.data
      console.log(this.driverList)
    })
    this.eventMaster.getAllRemarkMasterList().subscribe((res: any) => {
      this.remarkList = res.data

    })
  }
  caseClose = [
    { id: 1, type: 'Yes' },
    { id: 2, type: 'No' },
  ]
  FllterChange(data: any) {
    this.formMaster.controls['driverName'].setValue(data.driverName);
    this.formMaster.controls['createdOn'].setValue(data.createdOn.slice(0, 10));

  }
  saveDetails() {
    debugger
this.submitted=true
if(this.formMaster.invalid) return 
  }
}
