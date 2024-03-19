import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { popupclass } from 'src/app/models/Class/enum';
import { cityMaster, prqRequest } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';


@Component({
  selector: 'app-create-pickup-request',
  templateUrl: './create-pickup-request.component.html',
  styleUrls: ['./create-pickup-request.component.scss']
})
export class CreatePickupRequestComponent implements OnInit {
  constructor(private formbuilder: FormBuilder, private modalService: ModalPopupService,
    private masterservice: CountryMasterService, private customerservice: CustomerMasterServiceService,
    private routes: Router,
    private indentServ: IndentServiceService,
    private toastrService: ToastrService, private cs: CommonServiceService,//for id
    private router: ActivatedRoute) {
    this.UserId = this.cs.login_UserId()//for id
    this.UserBranchID = this.cs.login_UserCurrBranchId()//for id(nepal=>153)
  }
  UserId: any
  formMaster!: FormGroup;
  searchF!: FormGroup;
  submitted!: true
  prqReqDetailsById: any = []
  stateList: any = []
  countryList: any = []
  UserBranchID: any
  selectedBhadaFile: any = undefined
  selectionINput: any = 'C'
  borderHandle: any = false
  payNextInputSelected: any = ''
  cnsnPmntTId: any = []
  cityListacccons: any = []
  nextEventData: any = ''
  branchMasterList: any = []
  responceData: any
  multipickupDetail: any[] = [
    //   {
    //   fromcityId: 0,
    //   consgnId: 0,
    //   consgnAddId: 0
    // }
  ]
  multipickupDeliveryDetail: any[] = [
    //   {
    //   toCityId: 0
    // }
  ]
  // customer

  customerList: any
  cityList: any
  Cngr_CnseList: any
  pickUpDeliveryList: any
  payBasisList: any
  transitMode: any
  FTLList: any
  rateLoad: any
  vehicleLoadList: any
  borderRoute: any
  show: boolean = false
  congShow: boolean = false
  srchVldt: boolean = false
  branchList: any
  assignVehicleTypeList: any
  addressDetailsList: any = []
  folderOptCond = false
  cityVlid: boolean = false
  ngOnInit(): void {
    this.formValidation()
    this.getCountryList()
    this.getCustomerMaster()
    this.getCityMaster()
    // this.getConsignorMaster()
    this.getGeneralMasterDropDown()
    this.getBranchMaster()
    this.router.params.subscribe((res) => {

      let prqReqId = res.data
      if (prqReqId) {
        this.masterservice.getPrqRequestDetailById(prqReqId).subscribe((res: any) => {
          this.prqReqDetailsById = res.data
          if (this.prqReqDetailsById) {
            debugger
            this.paySelectedDetails(res.data[0].payBasisId)
            this.getConsigneerD(res.data[0].custId)
            this.getConsigneerDByConId(res.data[0].consgnId)
            this.selectionInputVal(res.data[0].type)
            this.formMaster.patchValue(res.data[0])
            // this.formMaster.controls['consgnAddId'].res.data[0].consgnId
            this.formMaster.controls['placementDt'].setValue(res.data[0].prqDt.slice(0, 10))
            this.indentServ.getconsignerbycustidConsId(this.formMaster['controls'].consgnId.value, this.formMaster['controls'].fromCityId.value,).subscribe((res: any) => {
              this.cityListacccons = res.data
              debugger
              let check = this.cityListacccons.find((x: any) => x.addressId == this.prqReqDetailsById[0].consgnAddId)
              this.chckAddDtls(check, 0, 0)
            })
            // this.indentServ.fltrBillAdd(this.searchF.value).subscribe((res: any) => {
            //   this.addressDetailsList = res.data
            //   let checks=this.cityListacccons.find((x:any)=>x.addressId==this.prqReqDetailsById[0].billingAddressId)
            //   this.chckAddDtls(checks,0,2)
            // })
            this.nextHideShow()
            if (this.prqReqDetailsById[0]?.prqDelvryPt.length > 0) {
              this.multipickupDeliveryDetail = this.prqReqDetailsById[0]?.prqDelvryPt
            }
            this.selectedBhadaFile = res.data[0]?.bhadaChittiFile ?? undefined
          }
        })
      }
      sessionStorage.removeItem('prqDetails')
      this.formMaster.controls['isMultiPickup'].disable()
    })
  }
  get f() {
    return this.formMaster.controls;
  }
  get sValidate() {
    return this.searchF.controls;
  }
  getStateList(data?: any) {
    this.masterservice.getAllStateMasterList(data).subscribe((res: any) => {
      this.stateList = res.data;
    })
  }
  formValidation() {
    this.formMaster = this.formbuilder.group({
      orgnId: [this.UserBranchID, Validators.required],
      destId: [6],
      prqDt: ['', Validators.required],
      placementDt: ['', Validators.required],
      isriskPurchase: [false],
      modeId: ['', Validators.required],
      payBasisId: ['', Validators.required],
      Broker: [null],
      Customer: [null],
      Transporter: [null],
      custId: ['', Validators.required],
      brokerName: [null],
      brokerMobileno: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      transName: [''],
      transMobileno: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      isMultiPickup: [false],
      fromCityId: [null, Validators.required],
      consgnId: ['', Validators.required],
      pkpDlvryId: ['', Validators.required],
      billingAddressId: [0],//
      consgnAddId: [null, Validators.required],//consgnAddId
      isMultiPtDelvry: [false],
      isUnloadingPayable: [false],
      isUnloadingRecoverable: [false],
      name: [''],
      Address: [''],
      cityPinCode: [''],
      telePhone: [''],
      emailId: [''],
      gstIn: [''],
      tanNoTdsDed: [''],
      borderRouteId: [null],//enable nepal case
      consigneePaymentTermsId: [null],//enable nepal case
      ftlTypeId: [null, Validators.required],
      vehicleTypeLoadabilityId: ['', Validators.required],
      rateTypeLoadId: ['', Validators.required],
      assignVehicleTypeId: ['', Validators.required],// auto fetch behalf customer city
      remark: [''],
      primarySourceAsPerContractId: [0],//Validators.required// auto fetch behalf customer city
      freight: [null],//Validators.required
      advance: [null],
      balance: [null],
      balReceivedLocId: [null],
      contactPersonName: ['', Validators.pattern('^(?! )[a-zA-Z]{2,}(?: [a-zA-Z]+)*$')],
      contactNo: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      agreedTransitDays: [null],
      loadingChargesPayable: [null],
      loadingRecoverable: [null],
      loadingDalaCharge: [null],
      unloadingCharge: [null],
      detentionClause: [null],
      rateDifference: [null],
      dalla: [null],
      munshiana: [null],
      commission: [null],
      cashDiscount: [null],
      latePenelty: [null],
      thcCopyBhadaChitti: [null],
      bhadaChittiFile: [''],
      copyPRQ: [null],
      prodCdId: [4],
      primarySrc: [null],
      toCityId: [null, Validators.required],
      conAddress: [''],
      congCity: [''],
      congPincode: [''],
      congtelephone: [''],
      emailCH: [''],
      testtt: [null],
      type: ['C', Validators.required]
    })
    this.searchF = this.formbuilder.group({
      custId: ['', Validators.required],
      cityId: ['', Validators.required],

    })
  }
  getCountryList() {
    this.masterservice.getAllCountryList().subscribe((res: any) => {
      this.countryList = res.data;
    })
  }
  dropdownBindState(data: any) {
    this.formMaster.controls['stateId'].setValue('')
    this.getStateList(data)
  }
  //customer
  getCustomerMaster() {
    this.customerservice.getAllCustomerMaster().subscribe((res: any) => {
      this.customerList = res.data
    })
  }
  getBranchMaster() {
    this.masterservice.getAllBranchMasterList().subscribe((res: any) => {
      this.branchList = res.data
      console.log(this.branchList)
    })
  }
  getCityMaster() {
    this.masterservice.getAllCityMasterList().subscribe((res: any) => {
      this.cityList = res.data
      this.mngsFromCity()
    })
  }
  getGeneralMasterDropDown() {
    this.masterservice.getGeneralMasterByCodeTyoeId(99).subscribe((res: any) => {
      this.pickUpDeliveryList = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(33).subscribe((res: any) => {
      this.payBasisList = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(120).subscribe((res: any) => {
      this.transitMode = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(81).subscribe((res: any) => {
      this.FTLList = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(64).subscribe((res: any) => {
      this.rateLoad = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(62).subscribe((res: any) => {
      this.vehicleLoadList = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(132).subscribe((res: any) => {
      this.borderRoute = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(127).subscribe((res: any) => {
      this.assignVehicleTypeList = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(126).subscribe((res: any) => {
      this.cnsnPmntTId = res.data
    })

    this.masterservice.getAllBranchMasterList().subscribe((res: any) => {
      this.branchMasterList = res.data;
    })
  }
  modelOpen(model: any) {
    debugger
    if (this.formMaster.controls['custId'].value == '') {
      this.toastrService.warning('please select customer type')
      return
    }
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    )
    this.addressDetailsList = []
    this.formMaster.controls['billingAddressId'].setValue(0)
    this.searchF.controls['custId'].setValue(this.formMaster.controls['custId'].value)
  }
  modelOpen2(model: any) {
    debugger
    if (this.formMaster['controls'].consgnId.value == '' || this.formMaster['controls'].fromCityId.value == null) {
      this.toastrService.warning('select form city and consigneer id')
      return
    }
    this.indentServ.getconsignerbycustidConsId(this.formMaster['controls'].consgnId.value, this.formMaster['controls'].fromCityId.value).subscribe((res: any) => {
      this.cityListacccons = res.data
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
  arrowShow() {
    this.show = !this.show
  }
  congarrowShow() {
    this.congShow = !this.congShow
  }

  selectionInputVal(dataa: any) {
    debugger
    if (dataa == null) return
    this.selectionINput = dataa.target?.value ?? dataa
    if (this.selectionINput === 'B') {
      const controlsToClearValidators = [
        "brokerName",
        "brokerMobileno"
      ]
      controlsToClearValidators.forEach(controlName => {
        const control: any = this.formMaster.get(controlName);
        control.setValidators([Validators.required]);
        if (controlName == 'brokerMobileno') {
          const control: any = this.formMaster.get(controlName);
          control.setValidators([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]);
        } else if (controlName == 'brokerName') {
          const control: any = this.formMaster.get(controlName);
          control.setValidators([Validators.required, Validators.pattern('^(?! )[a-zA-Z]{2,}(?: [a-zA-Z]+)*$')]);
        }
        control.updateValueAndValidity();
      });
    }
    else if (this.selectionINput === 'T') {
      const controlsToClearValidators = [
        "transName",
        "transMobileno"
      ]
      controlsToClearValidators.forEach(controlName => {
        const control: any = this.formMaster.get(controlName);
        control.setValidators([Validators.required]);
        control.updateValueAndValidity();
        if (controlName == 'transMobileno') {
          const control: any = this.formMaster.get(controlName);
          control.setValidators([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]);
        } else if (controlName == 'transName') {
          const control: any = this.formMaster.get(controlName);
          control.setValidators([Validators.required, Validators.pattern('^(?! )[a-zA-Z]{2,}(?: [a-zA-Z]+)*$')]);
        }
      });

    }
    else {
      const controlsToClearValidators = [
        "transName",
        "transMobileno",
        "brokerName",
        "brokerMobileno"
      ]
      controlsToClearValidators.forEach(controlName => {
        const control: any = this.formMaster.get(controlName);
        control.clearValidators()
        control.updateValueAndValidity();
      });
    }
  }
  paySelectedDetails(event: any) {
    if (event === 149) this.payNextInputSelected = 'Paid'
    else if (event === 150) this.payNextInputSelected = 'To Pay'
    else if (event === 151) this.payNextInputSelected = 'TBB'
    else if (event === 152) this.payNextInputSelected = 'FOC'
    console.log(this.payNextInputSelected)
  }
  EventForMultiPick() {
    this.multipickupDetail.push({
      fromcityId: 0,
      consgnId: 0,
      consgnAddId: 0
    })
  }
  cityChangerForMult(ev: any, index: any, cond: any) {
    if (cond === 'cityName') {
      this.multipickupDetail[index]['fromcityId'] = ev
    } else if (cond === 'consignor') {
      this.multipickupDetail[index]['consgnId'] = ev
    }
  }
  mutliPickDelivery() {
    this.multipickupDeliveryDetail.push({ toCityId: null })
  }
  OnSubmit(model: any) {
    this.submitted = true;
    if (this.formMaster.invalid) {
      return
    }
    debugger
    var prqReqJson: any = new prqRequest
    prqReqJson = this.formMaster.value
    prqReqJson['prqMultiPt'] = this.multipickupDetail
    prqReqJson['prqDelvryPt'] = this.multipickupDeliveryDetail
    if (this.prqReqDetailsById[0]?.prqId == undefined) { prqReqJson.createdBy = +this.UserId }
    else { prqReqJson.updatedBy = +this.UserId; prqReqJson.prqId = this.prqReqDetailsById[0]?.prqId }
    console.log(prqReqJson)
    if (this.prqReqDetailsById == "") {
      this.indentServ.createPrqFetching(prqReqJson).subscribe((result: any) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        // this.routes.navigate(['indent/pickup-request/prqrequest-list'])
        this.modalService.modalOpenSuccess(
          model,
          popupclass.info,
          true,
          false,
          false,
          popupclass.medium
        )
        this.responceData = result.data
        this.formMaster.reset()
        this.searchF.reset()
        this.formValidation()
        // this.routes.navigate(['master/city-master']);
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
          this.toastrService.error(err.error.Message, `Error status:${err.status}`);
        }
      })
    } else {
      this.indentServ.updatePrqFetching(prqReqJson).subscribe((result: any) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.modalService.modalOpenSuccess(
          model,
          popupclass.info,
          true,
          false,
          false,
          popupclass.medium
        )
        this.responceData = result.data
        this.formMaster.reset()
        this.searchF.reset()
        this.formValidation()
        this.routes.navigate(['/indent/list-of-pickup-request'])
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
          this.toastrService.error(err.error.Message, `Error status:${err.status}`);
        }
      })
    }
  }
  changeBalanceCalculator() {
    const freightValue = this.formMaster.controls['freight'].value
    const advancedV = this.formMaster.controls['advance'].value
    this.formMaster.controls['balance'].setValue(freightValue - advancedV)
    if (freightValue - advancedV < 0) return this.formMaster.controls['balance'].setValue(0)
  }
  pickUpDilvCity(ev: any, index: any) {
    debugger
    this.multipickupDeliveryDetail[index]['toCityId'] = ev
    const checkJson = this.cityList.filter((x: any) => x.cityId === this.multipickupDeliveryDetail[0]['toCityId']);
    const checkJson2 = this.cityList.filter((x: any) => x.cityId === this.formMaster.controls['toCityId'].value);
    if (checkJson.map((x: any) => x.countryId == 2)[0] || checkJson2.map((x: any) => x.countryId == 2)[0]) {
      this.borderHandle = true
    }else{
      this.borderHandle = false
    }
    console.log(this.borderHandle)
  }
  searchAddressDetails() {
    this.srchVldt = true
    if (this.searchF.invalid) return
    console.log(this.searchF.value)
    this.indentServ.fltrBillAdd(this.searchF.value).subscribe((res: any) => {
      this.addressDetailsList = res.data
      console.log(this.addressDetailsList)
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.searchF.get(err.error.Errors[prop]?.PropertyName);
            //wrong key comes 
            if (formControl) {
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
  chckAddDtls(item: any, index: any, cond: any) {
    debugger
    if (cond == 2) {
      if (item) {
        console.log(item)
        this.modalService.closeModal()
        this.formMaster.controls['name'].setValue('what')
        this.formMaster.controls['Address'].setValue(item?.addressLine1)
        this.formMaster.controls['cityPinCode'].setValue(item?.cityName)
        this.formMaster.controls['telePhone'].setValue(item?.phoneNumber)
        this.formMaster.controls['emailId'].setValue(item?.emailId)
        this.formMaster.controls['gstIn'].setValue(item?.gstnumber)
        this.formMaster.controls['tanNoTdsDed'].setValue(item?.tannumber)
      }
    } else {
      console.log(item)
      this.modalService.closeModal()
      this.formMaster.controls['consgnAddId'].setValue(item?.addressId)
      this.formMaster.controls['conAddress'].setValue(item?.addressLine1)
      this.formMaster.controls['congCity'].setValue(item?.cityName)
      this.formMaster.controls['congPincode'].setValue(item?.pinCode)
      this.formMaster.controls['congtelephone'].setValue(item?.phoneNumber)
      this.formMaster.controls['emailCH'].setValue(item?.emailId)
    }
  }
  getFilterForPS_VAss() {
    let data = {
      "fromCityId": this.formMaster.controls['fromCityId'].value ?? 0,//5,
      "toCityId": this.formMaster.controls['toCityId'].value ?? 0,//6,
      "loadabilityId": 171,
      "ftlTypeId": this.formMaster.controls['ftlTypeId'].value ?? 0,//371
      "custId": this.formMaster.controls['custId'].value == '' ? 0 : this.formMaster.controls['custId'].value,//76
      "prqDt": this.formMaster.controls['prqDt'].value == '' ? "2023-10-31T09:27:50.719Z" : this.formMaster.controls['prqDt'].value//"2023-10-19T09:27:50.719Z"//
    }
    this.indentServ.getCOntractFilter(data).subscribe((res: any) => {
      if (res) {
        debugger
        this.nextEventData = res.data
        this.formMaster.controls['primarySrc'].setValue(this.nextEventData?.primarySourcedesc)
        this.formMaster.controls['primarySourceAsPerContractId'].setValue(this.nextEventData?.primarySourceAsPerContractId)
      }
    })
  }
  nextHideShow() {
    // if(this.formMaster.controls['fromCityId'].value==''&&this.formMaster.controls['toCityId'].value==''
    // &&this.formMaster.controls['ftlTypeId'].value && this.formMaster.controls['custId'].value && this.formMaster.controls['prqDt'].value)
    this.folderOptCond = true
  }
  callContrActFilter(ev: any) {
    if (ev) {
      this.getFilterForPS_VAss()
    }
  }
  getConsigneerD(ev: any) {
    this.indentServ.getconsignerbycustid(ev).subscribe((res: any) => {
      this.Cngr_CnseList = res.data
    })
  }
  getConsigneerDByConId(ev: any) {
    this.formMaster.controls['fromCityId'].setValue(null)
    this.indentServ.getconsignerbycustidConsId(ev, null).subscribe((res: any) => {
      this.cityListacccons = res.data
    })
  }
  newSubmit() {
    this.routes.navigate(['indent/pickup-request/prqrequest-list'], { queryParams: { docName: 'result?.prw', headerDesc: 'this?.genMasterlabel' } })
  }
  modelOpenNew(model: any) {
    debugger
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.medium
    )
  }
  mngisMultiPtDelvryJson(ev: any) {
    if (ev.target.checked == false) {
      this.multipickupDeliveryDetail = []
    } else {

    }
  }
  onFileChanBhadaFile(event: any) {
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      this.formMaster.controls['bhadaChittiFile'].setValue(files.item(0)?.name || '');
      this.selectedBhadaFile = files.item(0)?.name || '';
    } else {
      this.formMaster.controls['bhadaChittiFile'].setValue(null);
      this.selectedBhadaFile = '';
    }
  }
  fileReset() {
    if (this.selectedBhadaFile != '') {
      this.selectedBhadaFile = undefined
      this.formMaster.controls['bhadaChittiFile'].setValue(null);
    }
  }
  mngsFromCity(){
    debugger
    const checkJson1 = this.cityList.filter((x: any) => x.cityId === this.multipickupDeliveryDetail[0]?.toCityId);
    const checkJson = this.cityList.filter((x: any) => x.cityId === this.formMaster.controls['toCityId'].value);
    if (checkJson.map((x: any) => x.countryId == 2)[0] || checkJson1.map((x: any) => x.countryId == 2)[0]) {
      this.borderHandle = true
    }else{
      this.borderHandle = false
    }
  }
}

