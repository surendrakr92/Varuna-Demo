import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
import { OperationsService } from 'src/app/services/master-service/operations.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

@Component({
  selector: 'app-create-ovr-ivr-entry',
  templateUrl: './create-ovr-ivr-entry.component.html',
  styleUrls: ['./create-ovr-ivr-entry.component.scss']
})
export class CreateOvrIvrEntryComponent implements OnInit {
  submitted = false
  formMaster!: FormGroup
  minDatePast: any = new Date().toISOString().slice(0, 10)
  form!: FormGroup;
  TypeList: any
  ftlList: any
  LoadablilityList: any
  overIvrDetails:any=''
  vendorList: any
  zoneList: any
  selectedCustomerdetails: any = undefined
  cityList: any = []
  customerList: any = []
  vehicleEntryDltEntity: any = [
    {
      "vehicleEntryDetailsId": 0,
      "fromLocationId": 0,
      "firstLocationId": 0,
      "toLocationId": 0,
      "ftlTypeId": 0,
      "loadabilityId": 0,
      "vehicleNo": 0,
      "transportedId": 0,
      "isActive": true
    }
  ]
  customerTypeList: any
  UserId: any;
  constructor(private fb: FormBuilder, private masterService: CountryMasterService,
    private modalService: ModalPopupService,
    private tostr: ToastrService,private opsServ:OperationsService,
    private activatedRoute:ActivatedRoute,
    private cs:CommonServiceService,
    private routes:Router,
    private cusserv: CustomerMasterServiceService) { 
      this.UserId=this.cs.login_UserId()
    }
  ngOnInit(): void {
    this.formMaster = this.fb.group({
      typeId: ["", Validators.required],
      customerTypeId: [null],
      customerId: ["", Validators.required],
      customerAddressId: [""],
      loadingDate: [""],
      ivrTwoPointDelivery: [false],
      toLocation1stPoint: [''],
      ftlTypeId: [''],
      custTest: ['', Validators.required],
      state: [],
      address:[''],
      branchId:[this.cs.login_UserCurrBranchId()]
    })
    this.APIBinding()
    this.Onform()
    this.formMaster.controls['loadingDate'].setValue(this.minDatePast)
    this.activatedRoute.params.subscribe((res:any)=>{
      if(res.id){
        this.opsServ.getOtherVehicleentrybyId(res.id).subscribe((res:any)=>{
          debugger
         this.overIvrDetails=res.data
         this.formMaster.patchValue(this.overIvrDetails)
         this.formMaster.controls['custTest'].setValue(this.overIvrDetails.customer)
         this.formMaster.controls['address'].setValue(this.overIvrDetails.customerAddress)
        //  this.formMaster.controls['loadingDate'].setValue(this.overIvrDetails.loadingDate.slice(0,10))
         this.formMaster.controls['loadingDate'].setValue(this.minDatePast)
         this.customerDetls(this.overIvrDetails)
         debugger
          this.vehicleEntryDltEntity=this.overIvrDetails.vehicleEntryDltEntity??[]
          this.cusserv.getAllCustomerIdbyAddress(this.overIvrDetails.customerId).subscribe((res:any)=>{
            if(res.succeeded){
               let comedAddressList:any=res.data
              
               let obtnDt=comedAddressList.filter((x: { custAddressMappingId: number; })=>x.custAddressMappingId==this.overIvrDetails.customerAddressId)[0]
               console.log('obtnDt',obtnDt)
               this.formMaster.controls['state'].setValue(obtnDt.stateName)
            }
          },err=>{
            this.tostr.error(err.error.Message);
          })
        })
      }
    })
  }

  get f() {
    return this.formMaster.controls
  }
  Onform() {
    this.form = this.fb.group({
      rows: this.fb.array([])
    });
  }
  get rows() {
    return this.form.get('rows') as FormArray;
  }
  APIBinding() {
    this.masterService.getGeneralMasterByCodeTyoeId(168).subscribe((res: any) => {
      this.TypeList = res.data

    })
    this.masterService.getGeneralMasterByCodeTyoeId(81).subscribe((res: any) => {
      this.ftlList = res.data
    })
    this.masterService.getGeneralMasterByCodeTyoeId(91).subscribe((res: any) => {
      this.LoadablilityList = res.data
    })
    this.masterService.getGeneralMasterByCodeTyoeId(169).subscribe((res: any) => {
      this.customerTypeList = res.data
    })
    this.masterService.getAllVendorMaster().subscribe((res: any) => {
      this.vendorList = res.data
    })
    this.masterService.getAllZoneList().subscribe((res: any) => {
      this.zoneList = res.data
      console.log(this.zoneList)
    })
    this.masterService.getAllCityMasterList().subscribe((res: any) => {
      this.cityList = res.data
    })
    this.cusserv.getAllCustomerMaster().subscribe((res: any) => {
      this.customerList = res.data
      debugger
      if(this.overIvrDetails!=''){
      let obtainedDt=  this.customerList.filter((x: { custId: number; })=>x.custId==167)
        this.selectedCustomerdetails=obtainedDt[0]
      }
    })
  }
  modelOpen(model: any) {
    debugger
    if (this.selectedCustomerdetails == undefined) {
      this.tostr.warning('please select customer  details', 'Warning');
      return
    }
    this.cusserv.getAllCustomerIdbyAddress(this.selectedCustomerdetails.custId).subscribe((res:any)=>{
      if(res.succeeded){
    this.selectedCustomerdetails['customerAdd']=res.data
      }
    },err=>{
      this.tostr.error(err.error.Message);
    })
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    )
  }
  customerDetls(data: any) {
    debugger
    if (data) {
      // this.formMaster.controls['customerAddressId'].setValue('')
      this.selectedCustomerdetails = data
    }
  }
  addListOnVehicle() {
    this.vehicleEntryDltEntity.push({   ...{
      "vehicleEntryDetailsId": 0,
      "fromLocationId": 0,
      "firstLocationId": 0,
      "toLocationId": 0,
      "ftlTypeId": 0,
      "loadabilityId": 0,
      "vehicleNo": 0,
      "transportedId": 0,
      "isActive": true
    } })
    console.log(this.vehicleEntryDltEntity)
  }
  setupJson(data: any) {
    debugger
    this.formMaster.controls['customerId'].setValue(this.selectedCustomerdetails.custId)
    this.formMaster.controls['customerAddressId'].setValue(data.custAddressMappingId)
    this.formMaster.controls['address'].setValue(data.address)
    this.formMaster.controls['state'].setValue(data.stateName)

    if (data.custAddressMappingId) {
      this.modalService.closeModal()
    }
  }
  setupJsonVhDtlEntity(data: any, index: any, cond: string) {
    debugger
    this.vehicleEntryDltEntity[index][cond] = data
    console.log(this.vehicleEntryDltEntity)
  }
  onSubmit() {
    this.submitted = true
    if (this.formMaster.invalid) return
    let json:any
    json=this.formMaster.value
    json['vehicleEntryDltEntity']=this.vehicleEntryDltEntity??[]
    if(this.overIvrDetails.vehicleEntryId==undefined){json.createdBy = +this.UserId}
    else{json.updatedBy = +this.UserId ;json.vehicleEntryId=this.overIvrDetails.vehicleEntryId} 
    if(this.overIvrDetails==""){
      this.opsServ.createOvrEntry(json).subscribe((result) => {
        this.tostr.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['/Operations/ovr-ivr-entry']);
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
          this.tostr.error(err.error.Message, `Error status:${err.status}`);
        }
      })
    }else{
      this.opsServ.updateOvrEntry(json).subscribe((result) => {
        this.tostr.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['/Operations/ovr-ivr-entry']);
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
          this.tostr.error(err.error.Message, `Error status:${err.status}`);
        }
      })
    }
  }
}
