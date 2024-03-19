import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

@Component({
  selector: 'app-vehicle-status',
  templateUrl: './vehicle-status.component.html',
  styleUrls: ['./vehicle-status.component.scss']
})
export class VehicleStatusComponent implements OnInit {
  submitted = false
  FormMaster: any = FormGroup
  show = false
  selectEventList: any = []
  customerList:any=[]
  gpsDetails: any = []
  gpsBindDData: any
  fileratonData: any = []
  vehicleSList: any = []
  columnList: any = []
  cityListData:any=[]
  columnDataForDiv: any = []
  BorderlocationList: any = []
  POD_not_Received :any=[]
  isTyPeData:any=Boolean
  senderEvdntId:any
  userBranchId:any
  userIId: any
  constructor(private formbuilder: FormBuilder, private esservice: EventMasterService,
    private modalService: ModalPopupService, private msser: CountryMasterService,
    private custServ:CustomerMasterServiceService,
    private toastrService: ToastrService,
    private cs: CommonServiceService) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [10, 20, 40, 80, 100],
      // processing:true,
    }
    this.userIId = this.cs.login_User_Code()
    this.userBranchId=this.cs.login_UserCurrBranchId()
  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.GetAllEventList()
   this.formV()
    this.masterDataDetails()
  }
  get f() {
    return this.FormMaster.controls
  }
  formV(){
    this.FormMaster = this.formbuilder.group({
      // packingList: ['test', Validators.required],
      latereason: [""],
      vehicleStatus: ['test', Validators.required],
      eventDate: ['', [Validators.required]],
      prqNo: [''],
      location: [''],
      standingOutsideInside: [''],
      destination: [''],
      customerCode: [''],
      reason: [''],
      hourstowait: [''],
      remarks: [''],
      targetDate: [''],
      podRecReasonId: [true],
      shortageDamageRemarks: [''],
      balreceivedamt: [null],//removed
      balanceRecPayment:[''],
      lrnos: [''],//removed
      gpsdeviceno: [''],
      currentEventId: ['', [Validators.required]],
      driverMobileNo: [''],
      trailerNo: [''],
      checkBoxForDrNo: [true],
      isActive:[true],
      ReasonOfPODnotReceivedId:[null],
      PODReceivingLocationId:[''],
      StandingatCustomerPremises:[true],

    })
  }
  GetAllEventList() {
    debugger
    this.esservice.getAllVStsList().subscribe((res: any) => {
      this.vehicleSList = res.data
      this.dtTrigger.next(null)
    })
  }
  filterButton() {
    this.show = !this.show
  }
  geoMap(model: any) {
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.medium
    );
  }
  getFilerationData(item: any) {
    this.fileratonData=[]
    this.columnList=[]
    this.formV()
    this.columnDataForDiv=[]
    this.isTyPeData=item?.isType
    if (item) {
      debugger
      this.esservice.getDataByVehId(item?.vehicleNo).subscribe((res: any) => {
        this.fileratonData = res.data
        this.selectEventList = this.fileratonData[0]?.nextEvent
        this.gpsDetails = this.fileratonData[0]?.gpsdetails
      })
    }
  }
  geoMapDataFileration(data: any) {
    console.warn(data)
    if (data) {
      this.gpsBindDData = data
      this.FormMaster.controls['eventDate'].patchValue(this.gpsBindDData?.onDateTime)
      this.modalService.closeModal()
    }
  }
  columnsViewOpt(data: any) {
    console.log(data)
    debugger
    this.senderEvdntId=data
    // const element: any = document.getElementById('30');
    // element.style.display = 'none';
    if (data) {
      this.FormMaster.controls['destination'].enable();
      this.FormMaster.controls['location'].enable();
      this.esservice.getColByEvId(data, this.fileratonData[0]?.vehicleNo,this.isTyPeData).subscribe((res: any) => {
        if (res.succeeded == true) {
          this.columnList = res.data
          debugger
          this.columnDataForDiv = this.columnList[0]?.columnMapping.map((x: any) => x.columnId)
          // this.columnList[0].columnMapping.find((x:any)=>x.columnId)
          if (this.columnDataForDiv && this.columnList[0]?.columnMapping) {
            for (const columnId of this.columnDataForDiv) {
              const column = this.columnList[0].columnMapping.find((x: any) => x.columnId === columnId);
              if (column) {
                // Set the value in the form control based on the columnId
                this.FormMaster.get(column.frontid)?.setValue(column.dynamicValues?.values.value);
              }
            }
          }
        }
      })
    }
  }
  masterDataDetails() {
    this.msser.getGeneralMasterByCodeTyoeId(25).subscribe((res) => {
      this.BorderlocationList = Object.assign(res).data
    })
    this.msser.getGeneralMasterByCodeTyoeId(113).subscribe((res:any) => {
      this.POD_not_Received = res.data
      console.log(this.POD_not_Received)
    })
    this.msser.getAllCityMasterList().subscribe((res:any) => {
      debugger
      let data = res.data //.filter((c:any)=>c.branchId=this.cs.login_UserCurrBranchId())
      this.cityListData=data.filter((x:any)=>x.branchId==this.cs.login_UserCurrBranchId())
    })
this.getCustomerMaster()
  }
  onsubmit() {
    this.submitted = true
    if (this.FormMaster.invalid) {
      return
    }
    this.FormMaster.controls['destination'].enable();
    this.FormMaster.controls['location'].enable();
    let json: any = this.FormMaster.value
    json['previousEventId'] = this.fileratonData[0]?.displayPreviousEventId
    json['mainEventId'] = this.fileratonData[0]?.mainEventId
    json['subEventId'] = this.fileratonData[0]?.subEventId
    json['vehicleNo'] = this.fileratonData[0]?.vehicleNo
    json['columns'] = this.columnDataForDiv
    json['createdBy'] = this.userIId
    json['gpsStatus'] = this.gpsBindDData?.gpsLocation
    json['reportLocation'] = "test"
    json['isActive'] = true
    console.log(json)
    // this.esservice.createVSEntry(json).subscribe((res: any) => {

    // })
    this.esservice.createVSEntry(json).subscribe((result) => {
      this.toastrService.success('succesfully Created !', 'Success-200 !');
      this.FormMaster.reset()
      $('#MyTable').DataTable().destroy();
      this.GetAllEventList()
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.FormMaster.get(err.error.Errors[prop]?.PropertyName);
            if (formControl) {
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
  reset() {
    this.FormMaster.reset()
  }
  patchValueLocDes(ev: any) {
    if (ev.target.value.length > 7) {
      this.esservice.patchLocDes(ev.target.value,this.fileratonData[0]?.vehicleNo??0,this.senderEvdntId??0,this.userBranchId??0).subscribe((result: any) => {
        if (result) {
          debugger
          this.FormMaster.controls['destination'].setValue(result.data[0]?.toCityName)
          this.FormMaster.controls['location'].setValue(result.data[0]?.fromCityName)
          this.FormMaster.controls['destination'].disable();
          this.FormMaster.controls['location'].disable();
        }
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            const formControl = this.FormMaster.get('prqNo');
            this.submitted=true
            if (formControl) {
              formControl.setErrors({
                serverError: err.error.Message
              });
            }
          }
          this.toastrService.error(err.error.Message);
          // this.FormMaster.controls['prqNo'].setValue('')
        }
      })
    }
  }
  getCustomerMaster() {
    this.custServ.getAllCustomerMaster().subscribe((res: any) => {
      this.customerList = res.data
    })
  }
}
