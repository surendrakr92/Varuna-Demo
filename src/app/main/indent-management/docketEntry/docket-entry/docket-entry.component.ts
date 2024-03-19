import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { popupclass } from "src/app/models/Class/enum";
import { CommonServiceService } from "src/app/services/commonService/common-service.service";
import { CountryMasterService } from "src/app/services/master-service/country-master.service";
import { CustomerMasterServiceService } from "src/app/services/master-service/customer-master-service.service";
import { IndentServiceService } from "src/app/services/master-service/indent-service.service";
import { ModalPopupService } from "src/app/services/modalServices/modal-popup.service";
@Component({
  selector: "app-docket-entry",
  templateUrl: "./docket-entry.component.html",
  styleUrls: ["./docket-entry.component.scss"],
})
export class DocketEntryComponent implements OnInit {
  changeselction: any;
  formMaster!: FormGroup;
  submitted = false;
  branchList: any;
  Cngr_Cnse_List: any;
  loaderType: any;
  myForm!: FormGroup;
  branchBYList: any;
  loadTypeList: any;
  Customer_Vehicle_Type: any = []
  fromCityList: any
  filteredAddresses: any = []
  filteredAddresses2: any = []
  digitilizedData: any = []
  Rate_Type_LoadList: any;
  transitMode: any
  serviceType: any
  packaging_Type: any
  business_Type: any
  risk_type: any
  loaderList: any
  payBais: any
  pick_Up: any
  GST_Payable_by: any
  typeofMovement: any
  customerMasterList: any
  chargeDetails: any
  saidToContain: any
  totalCharge: any = 0
  billingToTalChrg: any = 0
  userCode: any
  new_Reason: any
  branchIdD: any
  patchedDetails: any = ''//edit case
  finencialEdit = false
  NestleEditt = false
  billChargeMapping: any = []
  productist: any = []
  nestleIndex: any = 0;
  nestleIndexPrev: any = 0;
  invoiceProductMap: any = [{
    "docketInvoiceNo": 0,
    "declVal": 0,
    "pkgsNo": 0,
    "actWeight": 0,
    "productId": 0
  }]
  ewayBillMappinglist: any = [
    {
      ewaybillNo: "",
      ewaybillDate: "2023-12-02T04:48:43.886Z",
      expiryDate: "2023-12-02T04:48:43.886Z",
      invoiceDocketMapping: [
        {
          docketInvoiceNo: "",
          invoiceDate: "2023-12-02T04:48:43.886Z",
          declVal: 0,
          pkgsNo: 0,
          actWeight: 0,
          volL: 0,
          volB: 0,
          volH: 0,
          totCft: 0,
          hsnCode: "",
          productId: 0,
          elrProductId: 0,
          invoiceProductMap: []
        },
      ],
    },
  ];
  docketChargeList: any = [
    {
      "rateTypeId": 0,
      "freightRate": 0,
      "freightCalculated": 0,
      "freight": 0,
      "otherCharges": 0,
      "fov": 0,
      "subTotal": 0,
      "svcTax": 0,
      "cess": 0,
      "docketTotal": 0,
      "sgstRate": 0,
      "sgstAmount": 0,
      "cgstRate": 0,
      "cgstAmount": 0,
      "igstRate": 0,
      "igstAmount": 0,
      "qpsk": 0,
      "proRataAmount": 0,
      "proRataDiscountPer": 0,
      "finalProRataAmount": 0
    }
  ]
  constructor(
    private formbuilder: FormBuilder,
    private masterService: CountryMasterService,
    private indentServ: IndentServiceService,
    private masterService2: CustomerMasterServiceService,
    private toastrService: ToastrService,
    private routes: Router,
    public routee: ActivatedRoute,
    private cs: CommonServiceService,
    private modalService: ModalPopupService
  ) {
    this.branchIdD = this.cs.login_UserCurrBranchId()
    this.userCode = this.cs.login_User_Code()
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [10, 20, 50, 100, 200],
      // processing:true,
    }
  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  get fs() {
    return this.myForm.controls;
  }
  ngOnInit(): void {
    this.getFormMaster();
    this.apiDrowpDownList();
    this.routee.queryParams.subscribe((res) => {
      console.log(res);
      if (res?.setupJ === 'finencialEdit') {
        this.finencialEdit = true
      }
      else if (res?.setupJ === 'NestleEditt') {
        this.finencialEdit = true
        this.NestleEditt = true
      }
      if (res?.docketId) {
        debugger
        this.indentServ.getDocketDetails(res).subscribe(
          (res: any) => {
            if (res && res.data) {
              this.patchedDetails = res.data;
              this.selectLrNo(2);
              this.shipperCnCnsA(res.data?.consignorId, 'shiiper')
              this.shipperCnCnsA(res.data?.consigneeId, 'shiiperS')
              Object.assign(this.ewayBillMappinglist, this.patchedDetails?.ewayBillMapping)
              this.chargeDetails = this.patchedDetails?.docketChargeMapping
              console.log('checkJson', this.chargeDetails)
              this.formMaster.patchValue(res['data'].docketCharges[0])
              this.formMaster.patchValue(res.data);
              this.formMaster.controls['pickUpDlyId'].patchValue(+res.data.pickUpDlyId);
              this.formMaster.controls['packgePerdel'].patchValue(+res.data.packgePerdel);
              this.formMaster.controls['ftlTypeId'].patchValue(+res.data.ftlTypeId);
              this.totalCharge = res.data?.docketTotalCharge ?? 0
              this.billingToTalChrg = res.data?.billingToTalChrg ?? 0
              this.billChargeMapping = res.data?.billChargeMapping
              Object.values(this.formMaster.controls).forEach(control => control.disable());
              // Enable specific controls
              ['custId', 'consignorAddressId', 'consignorId', 'consigneeId', 'consigneeAddressId', 'pkgsNo', 'chargewt', 'dlyBranchId', 'reasonId', 'responsibleUserId', 'reExpDate', 'remark'].forEach(controlName => this.formMaster.get(controlName)?.enable());
            } else {
              console.error('API response or data is missing:', res);
            }
          },
          (error) => {
            console.error('Error fetching docket details:', error);
            this.toastrService.error(error.error.Message)
            setTimeout(() => {
              history.back()
            }, 100);
          }
        );

      }
      // actualwt
    });

  }
  getFormMaster() {
    this.formMaster = this.formbuilder.group({
      docketNo: ["", Validators.required],
      docketDate: ["", Validators.required],
      docTypeId: ["", Validators.required],
      custId: [null, Validators.required],
      originBranchId: ["", Validators.required],
      destBranchId: ["", Validators.required],
      billingAddressId: [0],//auto
      prqId: [""],//auto
      productId: ["", Validators.required],//auto
      serviceClassId: [""],//auto
      ftlTypeId: [""],//auto
      eWayBillno: [0],
      loadTypeId: ["", Validators.required],
      rateTypeLoad: ["", Validators.required],
      pickUpDlyId: ["", Validators.required],
      fromCityId: ["", Validators.required],
      toCityId: ["", Validators.required],
      packgePerdel: ["", Validators.required],
      splSvcReq: ["", Validators.required],
      daccYN: [true],
      custCategoryId: [""],
      mLiftedFrom: ["", Validators.required],//
      permitYN: [true],
      multiplePickupYN: [true],
      sourceDocketId: [0],
      noOfPieces: [""],
      consignorAddressId: ["", Validators.required],
      consignorId: ["", Validators.required],
      consigneeAddressId: ["", Validators.required],
      consigneeId: ["", Validators.required],
      riskTypeId: ["", Validators.required],
      insupl: ["", Validators.required],
      insuplDate: ["", Validators.required],
      ctrNo: [0, Validators.required],
      tpNo: ["", Validators.required],
      entrysheetNo: [""],
      obdno: ["", Validators.required],
      loader: ["", Validators.required],
      loadedById: ["", Validators.required],
      hsnCode: ["", Validators.required],
      actualwt: [0],
      chargewt: ["", Validators.required],
      freightRate: ["", Validators.required],
      paybasisId: [null, Validators.required], //
      entryby: [0, Validators.required], //
      proRataAmount: ["", Validators.required],
      proRataDiscountPer: ["", Validators.required],
      finalProRataAmount: ["", Validators.required],
      chargeTypeId: ["", Validators.required],
      billgenbranchId: [this.branchIdD],
      transTypeId: [''],//
      docketChargeTotal: [0],//
      prqno: [0],//
      finCmpBranchId: [this.branchIdD],
      customerVehicleTypeId: [0],
      dlyBranchId: [0],
      arrivedOn: [],//finencial edit
      scanStatus: [],//finencial edit
      isPODApproved: [],
      fmstatus: [],
      fmackstatus: [],
      vehicleNo: [],
      vehicleTypeId: [],
      actArrivalDate: [],
      dlyDateAsVehicleSatatus: [],
      deliveryDate: [],
      actCurrentLastDetentionHour: [],
      actCurrentLastDetentionHourLoading: [],
      kantaWt: [],
      reasonId: [0],
      reExpDate: ['2023-12-16T05:02:17.844Z'],
      prevExpDate: ['2023-12-16T05:02:17.844Z'],
      remarks: [],
      responsibleUserId: [0],
      ftlTripRate: [],
      loadingtermId: [],
      unloadingtermId: [],
      billGenDate: [],
      manualBillNo: [],
      remark: [],
      billSubBranchId: [],
      BillColBranchId: [],
      isFinalized: [false],
      dockSf: [''],
      billingToTalChrg: ['']
    });
  }

  get f() {
    return this.formMaster.controls;
  }
  lrNoEntryList = [
    { id: 1, type: "Digitalized " },
    { id: 2, type: "Non Digitalized" },
  ];
  apiDrowpDownList() {
    this.masterService.getAllBranchMasterList().subscribe((res: any) => {
      this.branchList = res.data;
    });
    this.masterService.getAll_Cngr_Cnse_Master().subscribe((res: any) => {
      this.Cngr_Cnse_List = res.data;

    });
    this.masterService
      .getGeneralMasterByCodeTyoeId(137)
      .subscribe((res: any) => {
        this.loaderType = res.data;
      });
    this.masterService
      .getGeneralMasterByCodeTyoeId(62)
      .subscribe((res: any) => {
        this.loadTypeList = res.data;
      });
    this.masterService
      .getGeneralMasterByCodeTyoeId(64)
      .subscribe((res: any) => {
        this.Rate_Type_LoadList = res.data;
      });
    this.masterService.getAllCityMasterList().subscribe((res: any) => {
      this.fromCityList = res.data

    })
    this.masterService
      .getGeneralMasterByCodeTyoeId(120)
      .subscribe((res: any) => {
        this.transitMode = res.data;
      });
    this.masterService
      .getGeneralMasterByCodeTyoeId(145)
      .subscribe((res: any) => {
        this.productist = res.data;
      });
    this.masterService
      .getGeneralMasterByCodeTyoeId(121)
      .subscribe((res: any) => {
        this.serviceType = res.data;
      });
    this.masterService
      .getGeneralMasterByCodeTyoeId(21)
      .subscribe((res: any) => {
        this.business_Type = res.data;
      });
    this.masterService
      .getGeneralMasterByCodeTyoeId(104)
      .subscribe((res: any) => {
        this.risk_type = res.data;
      });

    this.masterService.getAllUserMasterList().subscribe((res: any) => {
      this.loaderList = res.data

    })
    this.masterService
      .getGeneralMasterByCodeTyoeId(99)
      .subscribe((res: any) => {
        this.pick_Up = res.data;
      });
    this.masterService
      .getAllVehicleMaster()
      .subscribe((res: any) => {
        this.Customer_Vehicle_Type = res.data;
      });
    this.masterService
      .getGeneralMasterByCodeTyoeId(143)
      .subscribe((res: any) => {
        this.packaging_Type = res.data;
      });
    this.masterService
      .getGeneralMasterByCodeTyoeId(33)
      .subscribe((res: any) => {
        this.payBais = res.data;
      });
    this.masterService2.getAllCustomerMaster().subscribe((res: any) => {
      this.customerMasterList = res.data
      console.log(this.customerMasterList)
    })
    this.masterService
      .getGeneralMasterByCodeTyoeId(81)
      .subscribe((res: any) => {
        this.typeofMovement = res.data;
      });
    this.masterService
      .getGeneralMasterByCodeTyoeId(147)
      .subscribe((res: any) => {
        this.new_Reason = res.data;
      });
    this.masterService
      .getGeneralMasterByCodeTyoeId(145)
      .subscribe((res: any) => {
        this.saidToContain = res.data;
      });
    this.masterService
      .getGeneralMasterByCodeTyoeId(146)
      .subscribe((res: any) => {
        this.GST_Payable_by = res.data;
      });
  }
  selectLrNo(event: any) {
    debugger
    this.changeselction = event;
    if (this.changeselction == 1) {
      this.indentServ.getDigiData().subscribe((res: any) => {
        this.digitilizedData = res.data
        this.dtTrigger.next(null)
      })
    } else {
      this.getFormMaster()
      if (this.patchedDetails?.docketId) {
        return
      } else {
        this.indentServ.getallcharges().subscribe((res: any) => {
          if (res.succeeded) {
            this.chargeDetails = res.data
          }
        })
      }
    }
  }
  addEwayDetails() {
    this.ewayBillMappinglist.push(
      {
        ewaybillNo: "",
        ewaybillDate: "2023-12-02T04:48:43.886Z",
        expiryDate: "2023-12-02T04:48:43.886Z",
        edit: true,
        invoiceDocketMapping: [
          {
            docketInvoiceNo: "",
            invoiceDate: "2023-12-02T04:48:43.886Z",
            declVal: 0,
            pkgsNo: 0,
            actWeight: 0,
            volL: 0,
            volB: 0,
            volH: 0,
            totCft: 0,
            hsnCode: "",
            edit: true,
            productId: 0,
            elrProductId: 0,
            invoiceProductMap: []
          },
        ],
      }
    )
    console.log(this.ewayBillMappinglist)
  }
  invoiceDocketMappingD(indexI: any, indexJ: any) {
    debugger;
    const newInvoiceDocketMapping = {
      docketInvoiceNo: "",
      invoiceDate: "2023-12-02T04:48:43.886Z",
      declVal: 0,
      pkgsNo: 0,
      actWeight: 0,
      volL: 0,
      volB: 0,
      volH: 0,
      totCft: 0,
      hsnCode: "string",
      productId: 0,
      edit: true,
      elrProductId: 0,
      invoiceProductMap: []
    };

    this.ewayBillMappinglist[indexI].invoiceDocketMapping.push({ ...newInvoiceDocketMapping });
    console.log(this.ewayBillMappinglist);
  }
  changeEwayGen(data: any, index: any, cond: any) {
    if (cond === 'ewaybillNo') this.ewayBillMappinglist[index]['ewaybillNo'] = data
    else if (cond === 'ewaybillDate') this.ewayBillMappinglist[index]['ewaybillDate'] = data
    else if (cond === 'expiryDate') this.ewayBillMappinglist[index]['expiryDate'] = data
    console.log('===>', this.ewayBillMappinglist)
  }
  changeEwayInvoice(data: any, index: any, secondIndex: any, cond: any) {
    if (cond === 'docketInvoiceNo') this.ewayBillMappinglist[index].invoiceDocketMapping[secondIndex]['docketInvoiceNo'] = data
    if (cond === 'invoiceDate') this.ewayBillMappinglist[index].invoiceDocketMapping[secondIndex]['invoiceDate'] = data
    if (cond === 'declVal') this.ewayBillMappinglist[index].invoiceDocketMapping[secondIndex]['declVal'] = data
    if (cond === 'pkgsNo') this.ewayBillMappinglist[index].invoiceDocketMapping[secondIndex]['pkgsNo'] = data
    if (cond === 'actWeight') this.ewayBillMappinglist[index].invoiceDocketMapping[secondIndex]['actWeight'] = data
    console.log('===>', this.ewayBillMappinglist)
  }
  PayDDetails(cond: any) {
    if (cond == 'freightRate') this.docketChargeList[0]['freightRate'] = this.formMaster.controls['freightRate'].value
    else if (cond == 'paybasisId') this.docketChargeList[0]['paybasisId'] = this.formMaster.controls['paybasisId'].value
    else if (cond == 'entryby') this.docketChargeList[0]['entryby'] = this.formMaster.controls['entryby'].value
    else if (cond == 'proRataAmount') this.docketChargeList[0]['proRataAmount'] = this.formMaster.controls['proRataAmount'].value
    else if (cond == 'proRataDiscountPer') this.docketChargeList[0]['proRataDiscountPer'] = this.formMaster.controls['proRataDiscountPer'].value
    else if (cond == 'finalProRataAmount') this.docketChargeList['finalProRataAmount'] = this.formMaster.controls['finalProRataAmount'].value
    else if (cond == 'chargeTypeId') this.docketChargeList[0]['chargeTypeId'] = this.formMaster.controls['chargeTypeId'].value
    else if (cond == 'billgenbranchId') this.docketChargeList[0]['billgenbranchId'] = this.formMaster.controls['billgenbranchId'].value
  }
  shipperCnCnsA(ev: any, cond: any) {
    if (cond == 'shiiper') {
      this.filteredAddresses = this.Cngr_Cnse_List?.filter((item: { consiConseId: any; }) => item.consiConseId == ev)[0]?.addressMap;
    } else {
      this.filteredAddresses2 = this.Cngr_Cnse_List?.filter((item: { consiConseId: any; }) => item.consiConseId == ev)[0]?.addressMap;
    }
  }
  changeCharDettt(value: any, index: any, oper: any) {
    debugger
    const currentChargeAmount = this.billChargeMapping[index]['chargeAmount'] || 0;
    // Adjust total charge by subtracting the current charge amount
    if (value == '' && oper == '- ') {
      this.billingToTalChrg = this.billingToTalChrg + (+currentChargeAmount);
    } else if (value != '' && oper == '- ') {
      this.billingToTalChrg = this.billingToTalChrg + (+currentChargeAmount);
    }
    else {
      this.billingToTalChrg = this.billingToTalChrg - (+currentChargeAmount);
    }

    this.billChargeMapping[index]['chargeAmount'] = value;
    if (oper == '+ ') {
      this.billingToTalChrg = this.billingToTalChrg + (+value);
    } else {
      this.billingToTalChrg = this.billingToTalChrg - (+value);
    }
    this.formMaster.controls['billingToTalChrg'].setValue((+this.billingToTalChrg))
  }
  changeCharDet(value: any, index: any, oper: any) {
    debugger
    const currentChargeAmount = this.chargeDetails[index]['chargeAmount'] || 0;
    // Adjust total charge by subtracting the current charge amount
    if (value == '' && oper == '- ') {
      this.totalCharge = this.totalCharge + (+currentChargeAmount);
    } else if (value != '' && oper == '- ') {
      this.totalCharge = this.totalCharge + (+currentChargeAmount);
    }
    else {
      this.totalCharge = this.totalCharge - (+currentChargeAmount);
    }

    this.chargeDetails[index]['chargeAmount'] = value;
    if (oper == '+ ') {
      this.totalCharge = this.totalCharge + (+value);
    } else {
      this.totalCharge = this.totalCharge - (+value);
    }
    this.formMaster.controls['docketChargeTotal'].setValue((+this.totalCharge))
  }
  parseJsonForCharge(inputJson: any) {
    return inputJson?.map((item: { [x: string]: string; }, index: any) => {
      return {
        "chargeAmount": +item["chargeAmount"] ?? 0,
        "chargeId": item["chargeId"],
        "operatorSign": item["operatorSign"],
        "chargeName": item["chargeName"] ?? '',
        "basedOn": item["basedOn"] ?? 0
      }
    });
  }
  opForWPrq(data: any) {
    if (data) {

      this.indentServ.getdigitizeddocketdataByPrq(data.prqId ?? 11).subscribe((res: any) => {
        if (res.succeeded) {
          let dataDev: any = res.data
          this.selectLrNo(2)
          this.formMaster.controls['prqId'].setValue(dataDev.prqId)
          this.formMaster.controls['prqno'].setValue(dataDev.prqNo)
          this.formMaster.controls['transTypeId'].setValue(dataDev.transTypeId)
          this.formMaster.controls['freightRate'].setValue(dataDev.freightRate)
          this.formMaster.controls['proRataAmount'].setValue(dataDev.proRataAmount)
          this.formMaster.controls['proRataDiscountPer'].setValue(dataDev.proRataDiscountPer)
          this.formMaster.controls['docketNo'].setValue(dataDev.docketNo)
          this.formMaster.controls['packgePerdel'].setValue(+dataDev.packgePerdel)
          this.formMaster.controls['pickUpDlyId'].setValue(dataDev.pickUpDlyId)
          this.formMaster.controls['serviceClassId'].setValue(+dataDev.serviceClassId)
          this.formMaster.controls['rateTypeLoad'].setValue(dataDev.rateTypeLoad)
          this.formMaster.controls['loadTypeId'].setValue(dataDev.loadTypeId)
          this.formMaster.controls['ftlTypeId'].setValue(dataDev.ftlTypeId)
          this.bindDataDetail('first')
          this.formMaster.controls['docketNo'].disable()
        }
      }, err => {
        this.toastrService.error(err.error.Message, `Error status:${err.status}`);
      })
    }
  }
  bindDataDetail(cond: any) {
    debugger
    if (cond == 'second') {
      this.indentServ.getDocketDfromVDocket({
        "docketNo": this.formMaster.controls['docketNo'].value,
        "docketDate": this.formMaster.controls['docketDate'].value, //"2023-10-03T09:04:41.333Z"
        "paybasisId": this.formMaster.controls['paybasisId'].value,//150
        "custId": this.formMaster.controls['custId'].value,//122,
        "branchId": this.branchIdD,//1,
        "dlyBranchId": this.formMaster.controls['destBranchId'].value,//1
        "tamNo": "string"
      }).subscribe((res: any) => {
        this.formMaster.controls['transTypeId'].setValue(res.data?.transTypeId)
        this.formMaster.controls['serviceClassId'].setValue(+res.data?.serviceClassId)
        this.formMaster.controls['ftlTypeId'].setValue(res.data?.ftlTypeId)
        this.formMaster.controls['loadTypeId'].setValue(res.data?.loadTypeId)
        this.formMaster.controls['rateTypeLoad'].setValue(res.data?.rateTypeLoad)
        this.formMaster.controls['riskTypeId'].setValue(res.data?.riskTypeId)
        this.formMaster.controls['freightRate'].setValue(res.data?.freightRate)
        this.docketChargeList[0]['freightRate'] = res.data?.freightRate
        this.formMaster.controls['packgePerdel'].setValue(res.data?.packgePerdel)
        this.formMaster.controls['proRataDiscountPer'].setValue(res.data?.proRataDiscountPer)
        this.docketChargeList[0]['proRataDiscountPer'] = res.data?.proRataDiscountPer
        this.formMaster.controls['proRataAmount'].setValue(res.data?.proRataAmount)
        this.docketChargeList[0]['proRataAmount'] = res.data?.proRataAmount
        this.formMaster.controls['finalProRataAmount'].setValue(res.data?.finalProRataAmount)
        this.docketChargeList[0]['finalProRataAmount'] = res.data?.finalProRataAmount
        this.docketChargeList[0]['rateTypeId'] = res.data?.rateTypeId ?? 0
        this.formMaster.controls['prqno'].setValue(res.data?.prqNo)
        this.formMaster.controls['prqId'].setValue(res.data?.prqId)
      }, err => {
        this.toastrService.error(err.error.Message, `Error status:${err.status}`);
      })
    } else {
      this.indentServ.validateLr(this.formMaster.controls['docketNo'].value, this.branchIdD).subscribe((res: any) => {
        if (res) {
          this.formMaster.controls['paybasisId'].setValue(res.data?.payBasisId)
          this.formMaster.controls['fromCityId'].setValue(res.data?.fromCityId)
          this.formMaster.controls['toCityId'].setValue(res.data?.toCityId)
          this.formMaster.controls['originBranchId'].setValue(res.data?.orgnId)
          // this.formMaster.controls['destBranchId'].setValue(res.data?.destId)
          this.formMaster.controls['pickUpDlyId'].setValue(res.data?.pkpDlvryId)
        }
      }, err => {
        this.toastrService.error(err.error.Message, `Error status:${err.status}`);
        this.formMaster.controls['docketNo'].setValue('')
      })
    }
  }
  SubmitDetails() {
    this.submitted = true;
    if (this.formMaster.invalid) {
      return;
    }
    // if (this.patchedDetails.docketId) {
    //   Object.values(this.formMaster.controls).forEach(control => control.enable());
    // }
    // this.formMaster.controls['docketNo'].enable()
    let finiallizedJson: any
    finiallizedJson = this.patchedDetails.docketId ? this.formMaster.getRawValue() : this.formMaster.value
    finiallizedJson['dlyBranchId'] = this.formMaster.controls['destBranchId'].value ?? 0
    finiallizedJson['ewayBillMappinglist'] = this.ewayBillMappinglist
    finiallizedJson['docketChargeList'] = this.docketChargeList
    finiallizedJson['billChargeMapList'] = this.billChargeMapping
    finiallizedJson['docketChargeMapList'] = this.parseJsonForCharge(this.chargeDetails)
    if (this.patchedDetails?.docketId) {
      finiallizedJson['updatedBy'] = this.userCode
      finiallizedJson['docketId'] = this.patchedDetails.docketId
    }
    else finiallizedJson['createdBy'] = this.userCode
    console.log(finiallizedJson)
    if (this.patchedDetails == '') {
      this.indentServ.docketEntry(finiallizedJson).subscribe((result: any) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['indent/docket-list'])
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
    } else if (this.patchedDetails != '' && this.finencialEdit) {
      this.indentServ.finencialEdit(finiallizedJson).subscribe((result: any) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        if (this.finencialEdit) this.routes.navigate(['indent/docket-finencial-list'])
        else if (this.NestleEditt) this.routes.navigate(['indent/docket-nestle-list'])
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
      this.indentServ.updateDocket(finiallizedJson).subscribe((result: any) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['indent/docket-list'])
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
          // Object.values(this.formMaster.controls).forEach(control => control.disable());
          this.toastrService.error(err.error.Message, `Error status:${err.status}`);
        }
      })
    }
  }
  modelOpen2(model: any) {
    debugger
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    )
  }
  mngIsFnLz(ev: any) {
    if (ev.target.checked) this.formMaster.controls['isFinalized'].setValue(true)
    else this.formMaster.controls['isFinalized'].setValue(false)
  }
  modelOpen3(model: any, itemL: any, indexI: any, indexJ: any) {
    debugger
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    )
    this.nestleIndexPrev = indexI
    this.nestleIndex = indexJ
    if (itemL?.invoiceProductMap == undefined || itemL?.invoiceProductMap?.length == 0) {
      // Check if 'invoiceProductMap' is undefined, and if so, initialize it as an empty array
      if (itemL['invoiceProductMap'] === undefined) {
        itemL['invoiceProductMap'] = [];
      }
      this.invoiceProductMap = [{
        "docketInvoiceNo": 0,
        "declVal": 0,
        "pkgsNo": 0,
        "actWeight": 0,
        "productId": 0
      }]
      // itemL['invoiceProductMap'].push({
      //   "docketInvoiceNo": itemL.docketInvoiceNo,
      //   "declVal": 0,
      //   "pkgsNo": 0,
      //   "actWeight": 0,
      //   "productId": 1729//1729
      // });
      this.invoiceProductMap[0]['docketInvoiceNo'] = itemL.docketInvoiceNo
    }

  }
  nestleJsonChange(data: any, indexK: any, cond: any) {
    this.invoiceProductMap[indexK][cond] = data
  }
  addNestle(data: any) {
    const newNestleJson = {
      "docketInvoiceNo": data?.docketInvoiceNo,
      "declVal": 0,
      "pkgsNo": 0,
      "actWeight": 0,
      "productId": 0
    };
    this.invoiceProductMap.push({ ...newNestleJson })
    console.log(this.ewayBillMappinglist);
  }
  nestleSubmit() {
    debugger
    this.invoiceProductMap.forEach((element: any) => {
      this.ewayBillMappinglist[this.nestleIndexPrev].invoiceDocketMapping[this.nestleIndex]['invoiceProductMap'].push(element)
    });
    // this.ewayBillMappinglist[this.nestleIndexPrev].invoiceDocketMapping[this.nestleIndex]['invoiceProductMap']
    console.log(this.ewayBillMappinglist)
    this.modalService.closeModal()
  }
}
