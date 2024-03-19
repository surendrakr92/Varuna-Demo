import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { get } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';
@Component({
  selector: 'app-pickup-closure',
  templateUrl: './pickup-closure.component.html',
  styleUrls: ['./pickup-closure.component.scss']
})
export class PickupClosureComponent implements OnInit {
  submitted = false
  submitedNew = false
  validatePrqLr:any
  formMaster!: FormGroup
  formMaster2!: FormGroup
  nonReplacementList: any
  cencelReason: any
  indentList: any = []
  closuresList: any = []
  prqhistoryList: any = []
  prqDetails: any
  setupFormViewStruct: any = 'placement_done'
  UserId: any;
  constructor(private formbuilder: FormBuilder, private modalService: ModalPopupService
    , private masterService: CountryMasterService,
    private tosterservice: ToastrService,
    private indentS: IndentServiceService,
    private cs: CommonServiceService,) {
      this.dtOptions = {
        // pagingType: 'full_numbers',
        lengthMenu: [5,10, 20, 50, 100,200],
        // processing:true,
      }
    this.UserId = this.cs.login_UserId()//for id
  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.formMaster = this.formbuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      selectionType: [true],
      branchId: [this.cs.login_UserCurrBranchId()],
      prqDtMode: [0],
      prqNo: [""],
      dateRange: [""],
      presentDate: new FormControl((new Date()).toISOString().substring(0, 10)),
    });
    this.formMaster.controls['fromDate'].setValue(this.formMaster.controls['presentDate'].value)
    this.formMaster.controls['toDate'].setValue(this.formMaster.controls['presentDate'].value)
    this.genralMasterDropDown()
    this.formGroup2()
  }
  modelOpen(model: any, item: any) {
    debugger
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.medium
    )
    console.log(item)
    this.indentS.getAllPRqClosureHistory({ prqId: item }).subscribe((res: any) => {
      this.prqhistoryList = res.data
    })
  }
  modelOpen2(model: any, data: any) {
    debugger
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    )
    this.prqDetails = data
    this.indentS.getdigitizedlrbyprq(this.prqDetails.consgnAddId,this.prqDetails.consgnId).subscribe((rees)=>{
    if(rees) {this.validatePrqLr=rees}
    })
  }
  formGroup2() {
    this.formMaster2 = this.formbuilder.group({
      dockNo: [""],//, Validators.required
      vehicleno: [""],
      noOfLR: [""],
      vendorNameCode: [""],//no exist any where
      currentPlaceDate: [""],//, Validators.required no exist any where
      prqStatusEntryDateTime: [""],//, Validators.required no exist any where
      prqStatusReasonId: [0],//, Validators.required
      cancellationReas: [""],//, Validators.required no exist any where
      prqStatusEntryBy: [this.UserId],//, Validators.required
      prqStatusId: [1],//, new addition
      prqStatusRemarks: ["testt"],//, new addition
      //     "addressId": 0,//not exist in UI
      // "branchId": 0//not exist in UI
    })
  }
  genralMasterDropDown() {
    this.masterService.getGeneralMasterByCodeTyoeId(130).subscribe((res: any) => {
      this.nonReplacementList = res.data
    })
    this.masterService.getGeneralMasterByCodeTyoeId(131).subscribe((res: any) => {
      this.cencelReason = res.data
    })
    this.indentS.getAllPRq().subscribe((res: any) => {
      this.indentList = res.data
    })
  }
  get f() {
    return this.formMaster.controls
  }
  get fs() {
    return this.formMaster2.controls
  }
  onSubmit() {
    this.submitedNew = true
    if (this.formMaster2.invalid) {
      return
    }
    let json: any = this.formMaster2.value
    json['prqId'] = this.prqDetails.prqId
    this.indentS.CreatePRqClosure(json).subscribe((res) => {
      this.modalService.closeModal()
      this.tosterservice.success('prq closure updated successfully')
      this.formGroup2()
      this.showDetails('esttt')
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger
          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formMaster2.get(err.error.Errors[prop]?.PropertyName);
            if (formControl) {
              formControl.setErrors({
                serverError: err.error.Errors[prop]?.ErrorMessage
              });
            }
          });
        }
        this.tosterservice.error(err.error.Message, `Error statu:${err.status}`);
      }
    })
  }
  selectList = [
    { id: 1, type: "PRQ Date" },
    // { id: 2, type: "Placement" },
    { id: 2, type: "PRQ Number" },

  ]
  dateRange = [
    { id: 1, type: "Last Week (Including Today)" },
    { id: 2, type: "Today" },
    { id: 3, type: "Date Range" },
  ]

  showDetails(data:any) {
    console.log(this.formMaster.value)
    this.submitted = true
    if (this.formMaster.invalid) return
   if(data){
    $('#MyTable').DataTable().destroy();
    this.indentS.getAllPRqClosure(this.formMaster.value).subscribe((res: any) => {
      this.closuresList = res.data
    }, (err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger
          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formMaster.get(err.error.Errors[prop]?.PropertyName);
            if (formControl) {
              formControl.setErrors({
                serverError: err.error.Errors[prop]?.ErrorMessage
              });
            }
          });
        }
        this.tosterservice.error(err.error.Message);
      }
    })
    this.dtTrigger.next(null);
   }
  }
  selectionDate(ev: any) {
    this.formMaster.controls['fromDate'].setValue('')
    this.formMaster.controls['toDate'].setValue('')
    if (ev == 2) {
      this.formMaster.controls['prqNo'].setValue(null)
      this.formMaster.controls['selectionType'].setValue(false)
      this.formMaster.controls['fromDate'].setValue(this.formMaster.controls.presentDate.value)
      this.formMaster.controls['toDate'].setValue(this.formMaster.controls.presentDate.value)
    } else if (ev == 3) {
      this.formMaster.controls['fromDate'].setValue('')
      this.formMaster.controls['toDate'].setValue('')
      this.formMaster.controls['fromDate'].enable();
      this.formMaster.controls['toDate'].enable();
    }
    else {
      debugger
      this.formMaster.controls['prqNo'].setValue(null)
      this.formMaster.controls['selectionType'].setValue(false)
      this.formMaster.controls['toDate'].setValue(this.formMaster.controls.presentDate.value)
      this.formMaster.controls['fromDate'].setValue(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10))
    }
  }
  lokedDetByD(ev: any) {
    debugger
    if (ev.target.value) {
      this.formGroup2()
      this.setupFormViewStruct = ev.target.value
      if(ev.target.value=='placement_done')this.formMaster2.controls['prqStatusId'].setValue(1)
      if(ev.target.value=='carry_forward')this.formMaster2.controls['prqStatusId'].setValue(2)
      if(ev.target.value=='cancelled')this.formMaster2.controls['prqStatusId'].setValue(3)
      
      console.log(this.setupFormViewStruct)
      //  if(this.setupFormViewStruct='placement_done'){
      //   const controlsToClearValidators = [
      //     'prqStatusEntryDateTime',
      //     'prqStatusReasonId',
      //     'cancellationReas',
      //     'prqStatusEntryBy',
      //     'contactPersonEmailId',
      //   ]; // Controls to clear validators
      //   // Clear validators for form controls as needed
      //   controlsToClearValidators.forEach(controlName => {
      //     const control:any = this.formMaster2.get(controlName);
      //     control.clearValidators();
      //     control.updateValueAndValidity();
      //  }
      // )}

    }
  }
  checkvendorDetails(ev: any) {
    if (ev.target.value) {
      this.indentS.getVehicletypebyvehicleno(ev.target.value, this.prqDetails.prqNo).subscribe((res: any) => {
        debugger
        if (res.succeeded) {
          if(res.data.includes('not exists')){
            this.formMaster2.controls['vehicleno'].setValue('')
            this.formMaster2.controls['vendorNameCode'].setValue('')
            this.submitedNew=true
            const control: any = this.formMaster2.get('vehicleno');
           control.setValidators([Validators.required]);
           control.updateValueAndValidity()
          }else{
            this.formMaster2.controls['vendorNameCode'].setValue(res.data)
            // alert(res.message)
          }

        }
      })
    }
  }
  mngSelection(ev: any) {
    if (ev == 1) {
      this.formMaster.controls['selectionType'].setValue(false)
    } else {
      this.formMaster.controls['selectionType'].setValue(true)
    }
  }
}