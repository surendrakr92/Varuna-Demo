import { HttpErrorResponse } from "@angular/common/http";
import { Component,OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { popupclass } from "src/app/models/Class/enum";
import { CommonServiceService } from "src/app/services/commonService/common-service.service";
import { CountryMasterService } from "src/app/services/master-service/country-master.service";
import { CustomerMasterServiceService } from "src/app/services/master-service/customer-master-service.service";
import { ModalPopupService } from "src/app/services/modalServices/modal-popup.service";
type AOA = any[][];
import * as XLSX from "xlsx";
@Component({
  selector: "app-labour-master",
  templateUrl: "./labour-master.component.html",
  styleUrls: ["./labour-master.component.scss"],
})
export class LabourMasterComponent implements OnInit {
  formMaster!: FormGroup;
  formMaster4!: FormGroup;
  submitted = false;
  submittedNew = false;
  payBasisList: any;
  customerMasterList: any;
  Show: boolean = false;
  labourDetailsByCustId: any = []
  newShow = false;
  reasonUpdateList: any;
  ftlTypeList: any;
  cityList: any;
  customerlist: any;
  labourPayBasis: any;
  typeList: any;
  addressMasterList: any;
  laneList: any;
  TypeList: any;
  userId: any = ''
  custLaneDet: any = ''
  typeGeneralId: any = 0
  popLabourListD: any = []
  submissionJson: any
  xlsJsonUploadData: any
  submisionJson: any
  checkJsonCOnd: any = undefined
  indexForEdit:any=null
  labourChargesAddress: any = [
    {
      "labouraddressdetId": 0,
      "rowid": 0,
      "addressId": null,
      "paybasisId": null,
      "actuallabourCharges": null,
      "cartonTyrePelletId": 0
    }
  ]
  constructor(
    private formbuilder: FormBuilder,
    private route: Router,
    private modalService: ModalPopupService,
    private masterService: CountryMasterService,
    private customerMaster: CustomerMasterServiceService,
    private toastrService: ToastrService,
    private cs: CommonServiceService,

  ) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    };
    this.userId = this.cs.login_User_Code()
  }
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.formMaster = this.formbuilder.group({
      custId: ["", Validators.required],
      activeType: [0, Validators.required],
    });
    this.getGeneralMasterDropDownList();
    this.getCustomerMasterList();
    this.getCitymaster();
    this.getCityMaster();
    this.popupedit();
    this.getAddressMaster();
    this.getLaneMaster();
  }
  get f() {
    return this.formMaster.controls;
  }
  // get fs() {
  //   return this.formMaster2.controls;
  // }

  popupedit() {
    this.formMaster4 = this.formbuilder.group({
      termId: ["", Validators.required],
      payBasisId: ["", Validators.required],
      proposedLabourCharges: ["", Validators.required],
      dallaCharges: ["", Validators.required],
      dallaPayBasisId: ["", Validators.required],
      actualLabourCharges: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      remarks: [""],
      labourchgdetId: [0],
    });
  }
  get fsnew() {
    return this.formMaster4.controls;
  }

  Onsubmit() {
    this.submittedNew = true;
    if (this.formMaster4.invalid) {
      return;
    }
    this.submisionJson = {
      "createdBy": this.popLabourListD.labourRateId ? 0 : this.userId,
      "updatedBy": this.popLabourListD.labourRateId ? this.userId : 0,
      "labourRateId": this.popLabourListD.labourRateId ?? 0,
      "laneId": this.custLaneDet?.laneId,
      "rowId": 0,
      "custId": this.formMaster.controls['custId'].value ?? 0,
      "typeGeneralId": this.typeGeneralId ?? 0,
      "fromCityId": this.custLaneDet?.fromCityId,
      "toCityId": this.custLaneDet?.toCityId,
      "vehicleTypeId": this.custLaneDet?.ftlTypeId,
      "loadTypeId": this.custLaneDet?.loadabilityId,
      "rateTypeId": this.custLaneDet?.rateTypeId,
      "isActive": true,
    }
    if (this.checkJsonCOnd) {
      this.submisionJson['labourChargeDet'] = [this.formMaster4.value]
      this.submisionJson['labourChargeDet'][0]['labourChargesAddress'] = this.labourChargesAddress
      this.popLabourListD.labourChargeDet[this.indexForEdit]=(this.submisionJson['labourChargeDet'][0])
      this.submisionJson['labourChargeDet']=this.popLabourListD?.labourChargeDet
      // if (this.popLabourListD?.labourChargeDet) {
      //   this.popLabourListD.labourChargeDet[this.indexForEdit] = this.submisionJson['labourChargeDet'][0];
      // } optional ke saath assign me error
    }else{
      this.submisionJson['labourChargeDet'] = [this.formMaster4.value]
      this.submisionJson['labourChargeDet'][0]['labourChargesAddress'] = this.labourChargesAddress
      if (!this.popLabourListD.labourChargeDet || !Array.isArray(this.popLabourListD.labourChargeDet)) {
        this.popLabourListD.labourChargeDet = [];
      }      
      this.popLabourListD?.labourChargeDet.push(this.submisionJson['labourChargeDet'][0])//
      // this.submisionJson['labourChargeDet'].push(this.popLabourListD?.labourChargeDet[0])
       this.submisionJson['labourChargeDet']=this.popLabourListD?.labourChargeDet
    }
    
    console.log(this.submisionJson)
    console.log('checkkk=>' + this.popLabourListD?.labourChargeDet[0])
    document.getElementById('dismissButton')?.click()
    this.checkJsonCOnd=null
    // this.modalService.closeModal()
  }
  getAddressMaster() {
    this.masterService.getAllAddressMaster().subscribe((res: any) => {
      this.addressMasterList = res.data;
    });
  }

  lanType = [
    { id: 2, type: "All Lanes" },
    { id: 0, type: "Expiry Lanes" },
    { id: 1, type: "Valid Lanes" },
  ];
  rateForList = [
    { id: 1, type: "Loading" },
    { id: 2, type: "Unloading" },
    { id: 3, type: "Dalla" },
    { id: 4, type: "Others" },
  ];

  showExistingTables() {
    this.submitted = true;
    if (this.formMaster.invalid) return
    let json = {
      "custId": this.formMaster.controls['custId'].value,
      "activeType": this.formMaster.controls['activeType'].value ?? 0
    }
    this.customerMaster.filterByCustIdLab(json).subscribe((res: any) => {
      console.log("Customer Master", res);
      if (res) {
        this.labourDetailsByCustId = res.data
        $("#MyTable").DataTable().destroy();
        this.dtTrigger.next(null);
      }
    }, (err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formMaster.get(err.error.Errors[prop]?.PropertyName);
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
  getGeneralMasterDropDownList() {
    this.masterService
      .getGeneralMasterByCodeTyoeId(33)
      .subscribe((res: any) => {
        this.payBasisList = res.data;
      });
    this.masterService
      .getGeneralMasterByCodeTyoeId(110)
      .subscribe((res: any) => {
        this.reasonUpdateList = res.data;
      });
    this.masterService
      .getGeneralMasterByCodeTyoeId(63)
      .subscribe((res: any) => {
        this.ftlTypeList = res.data;
      });
    this.masterService
      .getGeneralMasterByCodeTyoeId(70)
      .subscribe((res: any) => {
        this.typeList = res.data;
        console.log(this.typeList);
      });
    this.masterService
      .getGeneralMasterByCodeTyoeId(133)
      .subscribe((res: any) => {
        this.labourPayBasis = res.data;
      });
    this.masterService
      .getGeneralMasterByCodeTyoeId(135)
      .subscribe((res: any) => {
        this.TypeList = res.data;
      });
  }

  getCustomerMasterList() {
    this.customerMaster.getAllCustomerMaster().subscribe((res: any) => {
      this.customerMasterList = res.data;
    });
  }
  getCitymaster() {
    this.masterService.getAllCityMasterList().subscribe((res: any) => {
      this.cityList = res.data;
    });
  }
  getAllCustomerMaster() {
    this.masterService.getAllClusterMasterList().subscribe((res: any) => {
      this.customerlist = res.data;
    });
  }
  getLaneMaster() {
    this.masterService.getAllLaneMaster().subscribe((res: any) => {
      this.laneList = res.data;
    });
  }
  Next() {
    this.route.navigate([
      "/master/customer-contract-master/create-customer-contract-master",
    ]);
  }
  gotonext() {
    this.submitted = true;
    // console.log('checkk'+this.submisionJson)
    this.submisionJson
    this.customerMaster.saveLbrcgh({ labourRatelist: [this.submisionJson] }).subscribe((result) => {
      this.toastrService.success('succesfully Saved !', 'Success-200 !');
      // this.routes.navigate(['master/country-master']);
      this.formMaster4.reset()
      this.labourChargesAddress = [{
        "labouraddressdetId": 0,
        "rowid": 0,
        "addressId": null,
        "paybasisId": null,
        "actuallabourCharges": null,
        "cartonTyrePelletId": 0
      }]
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger
          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formMaster4.get(err.error.Errors[prop]?.PropertyName);
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
    this.modalService.closeModal();
  }
  toggle() {
    this.Show = true
  }
  submitRate() {
    this.route.navigate(["/master/rate-update/rate-update-list"]);
  }
  modelOpen(model: any) {
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.medium
    );
  }

  modelOpen2(model: any) {
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
  }
  modelOpen3(model: any, item: any) {
    debugger
    if (item?.typeGeneralId == undefined) {
      this.toastrService.warning('please select Type for open processed')
      return
    }
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
    this.custLaneDet = item
    if (this.custLaneDet.laneId) {
      this.customerMaster.getLabourChById(this.custLaneDet.laneId).subscribe((res: any) => {
        if (res.succeeded) {
          this.popLabourListD = res.data
          console.log(this.popLabourListD)
        }
      })
    }
  }
  modelOpen4(model: any, ev: any,index:any) {
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
    if (ev == 'create') {
      this.formMaster4.reset()
      this.popupedit()
      this.indexForEdit=null
      this.checkJsonCOnd=null
      this.labourChargesAddress = [{
        "labouraddressdetId": 0,
        "rowid": 0,
        "addressId": null,
        "paybasisId": null,
        "actuallabourCharges": null,
        "cartonTyrePelletId": 0
      }]
      return
    }
    else if (ev) {
      debugger
      this.checkJsonCOnd = ev.labourchgdetId || 'System Generated'
      console.log(ev)
      this.formMaster4.patchValue(ev)
      this.formMaster4.controls['fromDate'].setValue(ev.fromDate.slice(0, 10))
      this.formMaster4.controls['toDate'].setValue(ev.toDate.slice(0, 10))
      this.formMaster4.controls['labourchgdetId'].setValue(ev.labourchgdetId ?? 0)
      this.labourChargesAddress = ev.labourChargesAddress
      this.indexForEdit=index
      if (ev.labourChargesAddress) {
        this.Show = true
      }
    }
  }

  getCityMaster() {
    this.masterService.getAllCityMasterList().subscribe((res: any) => {
      this.cityList = res.data;
    });
  }
  addAddrress() {
    this.labourChargesAddress.push({
      "labouraddressdetId": 0,
      "rowid": 0,
      "addressId": null,
      "paybasisId": null,
      "actuallabourCharges": null,
      "cartonTyrePelletId": 0
    })
  }
  changeAddressDt(index: any, event: any, cond: any) {
    if (cond === 'addressId') this.labourChargesAddress[index]['addressId'] = event
    else if (cond === 'actuallabourCharges') this.labourChargesAddress[index]['actuallabourCharges'] = event
    else if (cond === 'paybasisId') this.labourChargesAddress[index]['paybasisId'] = event
  }
  data: AOA = [
    [
      "type",
      "fromlocName",//fromlocName
      "tolocName",//tolocName
      "paybasis",
      "dallaCharges",
      "fromDate",
      "toDate",
      "ftltypecode",//ftltypecode
      "loadability",//loadability
      "rateTypeload",//rateTypeload
      "proposedLabourCharges",
      "actualLabourCharges",
      "dallaPayBasis",
      "term"
      // "errorMessage"
    ],
  ];
  wopts: XLSX.WritingOptions = { bookType: "csv", type: "array" };
  fileName: string = "LabourRate.csv";
  downLoadSampleFile() {
    this.cs.downloadSampleFile(this.fileName, this.data)
  }
  async upload_files(event: any) {
    const file = event.target.files[0];
    if (file) {
      await this.cs.csvToJsonForResponse(file); // Await the asynchronous method
      let json = this.cs.getModulemasterList();
      console.warn('check+++' + JSON.stringify(json));
      json.forEach((x: any) => {
        x['errorMessage'] = ''
        x['createdBy']=this.userId
      })
      // this.xlsJsonUpload.push(json)
      this.submissionJson = { labourChargdeExcelData: json }
      this.customerMaster.LbrRateExcelSubmission(this.submissionJson).subscribe((res: any) => {
        if (res.succeeded) {
          this.xlsJsonUploadData = res.data
        }
      })
    }
  }
  submissionCsvData() {
    const hasErrorMessage = this.xlsJsonUploadData.every((item: { errorMessage: string | string[]; }) => item.errorMessage == "");
    if (!hasErrorMessage || this.xlsJsonUploadData.length == 0) {
      this.toastrService.error("Resolve Error Occured !", "Error-302 !");
      return
    }
    // this.xlsJsonUploadData?.forEach((element:any) => {
    //   element['rateid']=+(this.ClaausecontratId)
    // });
    this.labourDetailsByCustId = this.xlsJsonUploadData
    console.log(this.labourDetailsByCustId)
    this.modalService.closeModal()
  }
  revalidateJsonToCsv() {
    this.xlsJsonUploadData = []
    this.customerMaster.LbrRateExcelSubmission(this.submissionJson).subscribe((res: any) => {
      if (res.succeeded) {
        this.xlsJsonUploadData = res.data
      }
    }, err => {
      this.toastrService.error(`${err.error.Message}`, `Error status:${err.status}`);
    })
  }
  calculateId(ev:any){
    let value=this.labourPayBasis.find((paybasisId:any)=>paybasisId.generalId==ev)
    return value?.codeDesc
  }
}