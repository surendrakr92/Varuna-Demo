import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { popupclass } from "src/app/models/Class/enum";
import { CommonServiceService } from "src/app/services/commonService/common-service.service";
import { CountryMasterService } from "src/app/services/master-service/country-master.service";
import { CustomerMasterServiceService } from "src/app/services/master-service/customer-master-service.service";
import { ModalPopupService } from "src/app/services/modalServices/modal-popup.service";
import * as XLSX from "xlsx";
type AOA = any[][];
@Component({
  selector: "app-create-customer-contract-master",
  templateUrl: "./create-customer-contract-master.component.html",
  styleUrls: ["./create-customer-contract-master.component.scss"],
})
export class CreateCustomerContractMasterComponent implements OnInit {
  submitted = false;
  serviceSBoolean = false;
  formMaster: any = FormGroup;
  customerBasicForm: any = FormGroup;
  formGroupForSSelection: any = FormGroup;
  customerList: any = [];
  contractClauseList: any = [];
  picupDevList: any;
  weightConList: any;
  MultiPointList: any;
  payBasicList: any;
  minFreightList: any;
  typeOfServiceList: any;
  riskType: any;
  cityList: any;
  billinginsList: any;
  serviceTaxPyList: any;
  billingSeduList: any;
  basicForDueList: any;
  basicBillList: any;
  discountRateList: any;
  branchMasterList: any = [];
  contractChargeData: any = ''
  contractModeList: any = [];
  userMasterList: any = [];
  contractCatList: any = [];
  transitModeList: any = [];
  rateTypeAllowedList: any = [];
  mattrixAllList: any = [];
  ServiceTypeList: any = [];
  changeTtransitJson: any = [];
  changeServiceJson: any = [];
  changeRataJson: any = [];
  changeMTJson: any = [];
  payBasisList: any;
  loadedfile: any;
  pdfSrc: any;
  UserId: any
  activeTab: any = "basic_Information";
  CCDetailsData: any = ''
  modulemasterList: any = []
  ClaausecontratId: any = ''
  baiscDetailsForm: any = ''
  isReadOnly: boolean = true; // Set this flag based on your logic
  contractClauseJson = {
    "clauselist": [
      {
        "createdBy": this.cs.login_User_Code(),
        "createdOn": "2023-09-22T06:53:52.612Z",
        "updatedBy": 0,
        "updatedOn": "2023-09-22T06:53:52.612Z",
        "contractClauseId": 0,
        "clauseDescription": "",
        "contractId": this.ClaausecontratId,
        "clausegeneralId": 0,
        "clauseBehaviour": "",
        "isActive": true
      }
    ]
  }
  selectedClause: { generalId: any, codeDesc: string } = { generalId: '', codeDesc: '' };
  codeDesc: string = '';
  constructor(
    private masterservice: CountryMasterService,
    private cs: CommonServiceService, //for id
    private modalService: ModalPopupService,
    private custServ: CustomerMasterServiceService,
    private formbuilder: FormBuilder,
    private routes: Router,
    private routess: ActivatedRoute,
    private toastrService: ToastrService,
  ) {
    this.UserId = this.cs.login_User_Code(); //for id
  }
  ngOnInit(): void {
    this.formMaster = this.formbuilder.group({
      customerCode: ["", Validators.required],
    });
    this.formValidation();
    this.getAllCustomerList();
    this.getAllgeneralmasterDropDown();
    this.citymaster();
    this.branchMaster();
    debugger
    this.routess.queryParams.subscribe((parms) => {
      let urls_data_patched = parms
      this.baiscDetailsForm = parms
      this.ClaausecontratId = urls_data_patched.contractId
      this.customerBasicForm.controls['custcatId'].setValue(+urls_data_patched.custId)
      this.customerBasicForm.controls['custId'].setValue(+urls_data_patched.custId)
      if (urls_data_patched.contractId) {
        this.custServ.getCustomerContractId(urls_data_patched.contractId).subscribe((res: any) => {
          if (res.succeeded == true) {
            this.CCDetailsData = res.data
            this.customerBasicForm.patchValue(this.CCDetailsData)

          }
        })
      }
    })
  }
  get f() {
    return this.formMaster.controls;
  }
  get basicValidate() {
    return this.customerBasicForm.controls;
  }
  get serviceSValidate() {
    return this.formGroupForSSelection.controls;
  }
  getAllCustomerList() {
    this.custServ.getAllCustomerMaster().subscribe((res: any) => {
      this.customerList = res.data;
    });
  }
  getAllgeneralmasterDropDown() {
    this.masterservice
      .getGeneralMasterByCodeTyoeId(99)
      .subscribe((res: any) => {
        this.picupDevList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(101)
      .subscribe((res: any) => {
        this.MultiPointList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(102)
      .subscribe((res: any) => {
        this.minFreightList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(104)
      .subscribe((res: any) => {
        this.riskType = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(105)
      .subscribe((res: any) => {
        this.billinginsList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(106)
      .subscribe((res: any) => {
        this.serviceTaxPyList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(107)
      .subscribe((res: any) => {
        this.billingSeduList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(109)
      .subscribe((res: any) => {
        this.basicBillList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(33)
      .subscribe((res: any) => {
        this.payBasisList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(68)
      .subscribe((res: any) => {
        this.contractModeList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(67)
      .subscribe((res: any) => {
        this.contractClauseList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(119)
      .subscribe((res: any) => {
        this.contractCatList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(120)
      .subscribe((res: any) => {
        this.transitModeList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(121)
      .subscribe((res: any) => {
        this.ServiceTypeList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(122)
      .subscribe((res: any) => {
        this.rateTypeAllowedList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(123)
      .subscribe((res: any) => {
        this.mattrixAllList = res.data;
      });
  }
  citymaster() {
    this.masterservice.getAllCityMasterList().subscribe((res: any) => {
      this.cityList = res.data;
    });
  }
  branchMaster() {
    debugger;
    this.masterservice.getAllBranchMasterList().subscribe((res: any) => {
      this.branchMasterList = res.data;
      console.log(this.branchMasterList);
    });
    //user master
    this.masterservice.getAllUserMasterList().subscribe((res: any) => {
      this.userMasterList = res?.data
    })
  }
  //view pdf
  viewPdfFileOPen(model: any) {
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
  }
  onTabClick(nextTab?: string) {
    this.activeTab = nextTab;
    const status = this.activeTab === nextTab;
    console.log(this.activeTab);
  }
  modelopen(model: any) {
    this.cs.destryTableData();
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.medium
    );
  }
  formValidation() {
    this.customerBasicForm = this.formbuilder.group({
      custId: [{ value: '', disabled: this.isReadOnly }],
      custcatId: [{ value: '', disabled: this.isReadOnly }],
      contractStartDate: ["", Validators.required],
      contractEndDate: ["", Validators.required],
      contractTypeId: [null],//
      contractEffectiveDate: ["", Validators.required],
      contractSignBranchId: [null],//
      contractCatId: [null],//
      custRepresentive: ["", [Validators.pattern('^(?! )[a-zA-Z]{3,}(?: [a-zA-Z]+)*$')]],//
      custDesignation: ["", [Validators.pattern('^(?! )[a-zA-Z]{3,}(?: [a-zA-Z]+)*$')]],//
      cseEmail: ["", [Validators.email]],
      compEmpId: [null],
      csePhone: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      custWitness: ["", [Validators.pattern('^(?! )[a-zA-Z]{3,}(?: [a-zA-Z]+)*$')]],
      empDesignation: ["", [Validators.pattern('^(?! )[a-zA-Z]{3,}(?: [a-zA-Z]+)*$')]],
      compEmail: ["", [Validators.email]],
      compPhone: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      compWitness: ["", [Validators.pattern('^(?! )[a-zA-Z]{3,}(?: [a-zA-Z]+)*$')]],
      agreementCopyName: [""],//removed
      custAccPerson: ["", [Validators.pattern('^(?! )[a-zA-Z]{3,}(?: [a-zA-Z]+)*$')]],
      contractModeId: [null,],
      contractDescription: [""],
      remarks: [""],
      isSingleSlab: [true],
      isMultipleSlab: [true],
      // isContractTypePf: [true],
      isActive: [true]
    });
    this.formGroupForSSelection = this.formbuilder.group({
      transitModeId: ['', Validators.required],
      serviceTypeId: ['', Validators.required],
      rateTypeId: ['', Validators.required],
      pickUpDlyId: ['', Validators.required],
      matrixTypeId: ['', Validators.required],
      isMinFreightPer: ['', Validators.required],
      riskTypeId: ['', Validators.required],
      serviceSValidate: [''],
      billsubbranchId: ['', Validators.required],
      billgenbranchId: ['', Validators.required],
      creditDay: ['', Validators.required],
      creditLimit: ['', Validators.required],
      billInst: ['', Validators.required],
      billScheduleId: ['', Validators.required],
      commBusiness: [''],
      dueDateBaseId: ['', Validators.required],
      isSky: [true],
      baseOfBillingId: ['', Validators.required],
      billcolbranchId: ['', Validators.required],
      mpChargeAppplicableId: ['', Validators.required],
      isActive: [true]
    })
  }
  onFileSelected() {
    let $img: any = document.querySelector("#file");
    this.loadedfile = $img.files[0];
    if (typeof FileReader !== "undefined") {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };
      reader.readAsArrayBuffer($img.files[0]);
    }
  }
  BasicFormSubmission(cond: any) {
    debugger
    this.submitted = true;
    if (this.customerBasicForm.invalid) return
    this.customerBasicForm.controls['custcatId'].enable()
    this.customerBasicForm.controls['custId'].enable()
    console.log(this.customerBasicForm.value)
    var basicCCJSOn: any
    basicCCJSOn = this.customerBasicForm.value
    if (this.CCDetailsData.contractId == undefined) { basicCCJSOn.createdBy = +this.UserId }
    else { basicCCJSOn.updatedBy = +this.UserId; basicCCJSOn.contractId = this.CCDetailsData.contractId }
    console.log(basicCCJSOn)
    if (this.CCDetailsData == "") {
      this.custServ.createCustomerContract(basicCCJSOn).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        if (cond === 'save_and_continue') {
          if (this.activeTab == "basic_Information") {
            this.onTabClick("contract_clause");
          }
        } else {
          this.routes.navigate([
            "/master/customer-contract-master"],
            {
              queryParams: { custId: parseInt(this.baiscDetailsForm.custId) }
              // skipLocationChange: false
            });
          console.log(this.customerBasicForm.value)
        }
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.customerBasicForm.get(err.error.Errors[prop]?.PropertyName);
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
      this.custServ.editCustomerContract(basicCCJSOn).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        if (cond === 'save_and_continue') {
          if (this.activeTab == "basic_Information") {
            this.onTabClick("contract_clause");
            this.custServ.getCCMBCId(this.CCDetailsData.contractId).subscribe((res: any) => {
              if (res) {
                if (res.data.length != 0) { this.contractClauseJson.clauselist = res.data }
                else {
                  this.contractClauseJson.clauselist.forEach((x) => {
                    x.contractId = this.CCDetailsData.contractId
                  })
                }
              }
            })
          }
        } else {
          this.routes.navigate([
            "/master/customer-contract-master"],
            {
              queryParams: { custId: this.CCDetailsData.custId }
              // skipLocationChange: false
            });
          console.log(this.customerBasicForm.value)
        }
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.customerBasicForm.get(err.error.Errors[prop]?.PropertyName);
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
    sessionStorage.removeItem('contClauseServBasic')
  }
  contractClauseSubmission(cond: any) {
    debugger
    console.log(this.contractClauseJson)
    // if (this.CCDetailsData == "") {
    this.custServ.createCClause(this.contractClauseJson).subscribe((result) => {
      this.toastrService.success('succesfully Created !', 'Success-200 !');
      if (cond === 'save_and_continue') {
        if (this.activeTab == "contract_clause") {
          this.onTabClick("service_selection");
          this.custServ.getCChargeById(this.CCDetailsData.contractId).subscribe((res: any) => {
            if (res.data) {
              this.contractChargeData = res.data
              debugger
              this.formGroupForSSelection.patchValue(res.data)
              this.formGroupForSSelection.controls['pickUpDlyId'].patchValue(this.contractChargeData?.pickUpDlyId.split(',').map(Number))
              this.formGroupForSSelection.controls['mpChargeAppplicableId'].patchValue(this.contractChargeData?.mpChargeAppplicableId.split(',').map(Number))
              this.formGroupForSSelection.controls['transitModeId'].patchValue(this.contractChargeData?.transitModeId.split(',').map(Number))
              this.formGroupForSSelection.controls['serviceTypeId'].patchValue(this.contractChargeData?.serviceTypeId.split(',').map(Number))
              this.formGroupForSSelection.controls['rateTypeId'].patchValue(this.contractChargeData?.rateTypeId.split(',').map(Number))
              this.formGroupForSSelection.controls['matrixTypeId'].patchValue(this.contractChargeData?.matrixTypeId.split(',').map(Number))

            }
          })
        }
      } else {
        this.routes.navigate([
          "/master/customer-contract-master"],
          {
            queryParams: { custId: this.CCDetailsData.custId }
            // skipLocationChange: false
          });
        console.log(this.customerBasicForm.value)
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        // if (err.status === 422) {
        //   debugger
        //   Object.keys(err.error.Errors).forEach((prop: any) => {
        //     const formControl = this.customerBasicForm.get(err.error.Errors[prop]?.PropertyName);
        //     //wrong key comes 
        //     if (formControl) {
        //       // activate the error message
        //       formControl.setErrors({
        //         serverError: err.error.Errors[prop]?.ErrorMessage
        //       });
        //     }
        //   });
        // }
        this.toastrService.error(err.error.Message, `Error statu:${err.status}`);
      }
    })
    // } else {
    //   this.custServ.editCClause(this.contractClauseJson).subscribe((result) => {
    //     this.toastrService.success('succesfully Updated !', 'Success-200 !');
    //     if (cond === 'save_and_continue') {
    //       if (this.activeTab == "basic_Information") {
    //         this.onTabClick("contract_clause");
    //       }
    //     } else {
    //       this.routes.navigate([
    //         "/master/customer-contract-master"],
    //         {
    //           queryParams: { custId: this.CCDetailsData.custId }
    //           // skipLocationChange: false
    //         });
    //       console.log(this.customerBasicForm.value)
    //     }
    //   }, err => {
    //     if (err instanceof HttpErrorResponse) {
    //       // if (err.status === 422) {
    //       //   debugger
    //       //   Object.keys(err.error.Errors).forEach((prop: any) => {
    //       //     const formControl = this.customerBasicForm.get(err.error.Errors[prop]?.PropertyName);
    //       //     //wrong key comes 
    //       //     if (formControl) {
    //       //       // activate the error message
    //       //       formControl.setErrors({
    //       //         serverError: err.error.Errors[prop]?.ErrorMessage
    //       //       });
    //       //     }
    //       //   });
    //       // }
    //       this.toastrService.error(err.error.Message, `Error status:${err.status}`);
    //     }
    //   })
    // }
    // if (cond === 'save_and_continue') {
    //   if (this.activeTab == "contract_clause") {
    //     this.onTabClick("service_selection");
    //   }
    // } else {
    //   // this.routes.navigate([
    //   //     "/master/customer-contract-master/customer-contract-master-list",
    //   //   ]);

    // }
    sessionStorage.removeItem('contClauseServBasic')
  }
  submissionForSc() {
    debugger
    this.serviceSBoolean = true
    if (this.formGroupForSSelection.invalid) return
    let serviceSJson: any
    serviceSJson = this.formGroupForSSelection.value
    serviceSJson['contractId'] = this.ClaausecontratId
    serviceSJson['transitModeId'] = this.formGroupForSSelection.controls['transitModeId'].value.join(',');
    serviceSJson['serviceTypeId'] = this.formGroupForSSelection.controls['serviceTypeId'].value.join(',');
    serviceSJson['rateTypeId'] = this.formGroupForSSelection.controls['rateTypeId'].value.join(',');
    serviceSJson['matrixTypeId'] = this.formGroupForSSelection.controls['matrixTypeId'].value.join(',');
    serviceSJson['pickUpDlyId'] = this.formGroupForSSelection.controls['pickUpDlyId'].value.join(',')
    serviceSJson['mpChargeAppplicableId'] = this.formGroupForSSelection.controls['mpChargeAppplicableId'].value.join(',')
    if (this.contractChargeData.contractChargeId == undefined) { serviceSJson.createdBy = +this.UserId }
    else { serviceSJson.updatedBy = +this.UserId; serviceSJson.contractChargeId = this.contractChargeData.contractChargeId }
    console.log(serviceSJson)
    if (this.contractChargeData?.contractChargeId == undefined) {
      this.custServ.createCCharge(serviceSJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate([
          "/master/customer-contract-master"],
          {
            queryParams: { custId: this.CCDetailsData.custId }
            // skipLocationChange: false
          });
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.customerBasicForm.get(err.error.Errors[prop]?.PropertyName);
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
      this.custServ.editCCharge(serviceSJson).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate([
          "/master/customer-contract-master"],
          {
            queryParams: { custId: this.CCDetailsData.custId }
            // skipLocationChange: false
          });
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.customerBasicForm.get(err.error.Errors[prop]?.PropertyName);
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
    sessionStorage.removeItem('contClauseServBasic')
  }
  handleClauseDsc(selectedClause: any, id: any) {
    this.codeDesc = selectedClause?.codeDesc;
    console.log(selectedClause)
    this.contractClauseJson.clauselist[id].clausegeneralId = selectedClause
  }
  handleClauseDesc(data: any, id: any) {
    console.log(data)
    this.contractClauseJson.clauselist[id].clauseDescription = data
  }
  handleDataForClBhv(data: any, id: any) {
    this.contractClauseJson.clauselist[id].clauseBehaviour = data
  }
  modelopenforxls(model: any) {
    this.cs.destryTableData();

    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
  }
  async onFileChangeCsv(event: any) {
    debugger;
    const file = event.target.files[0];
    if (file) {
      if (file) {
        await this.cs.csvToJsonForResponse(file); // Await the asynchronous method
        let json = this.cs.getModulemasterList()
        this.custServ.customerClauseCSV({ contractClauseExcelList: this.parseJsonForClause(json) }).subscribe((res: any) => {
          if (res.succeeded) {
            this.modulemasterList = res.data
          }
        })
      }
    }
  }
  changeEvTransit(ev: any, index: any, cond: any) {
    if (cond === 'transitModeId') {
      if (
        this.changeTtransitJson.find(
          (x: any) => x == ev
        )
      ) {
        this.changeTtransitJson.splice(index, 1);
      } else {
        this.changeTtransitJson.push(ev);
      }
      console.log(this.changeTtransitJson);
    } else if (cond === 'serviceTypeId') {
      if (
        this.changeServiceJson.find(
          (x: any) => x == ev
        )
      ) {
        this.changeServiceJson.splice(index, 1);
      } else {
        this.changeServiceJson.push(ev);
      }
      console.log(this.changeServiceJson);
    } else if (cond === 'rateTypeId') {
      if (
        this.changeRataJson.find(
          (x: any) => x == ev
        )
      ) {
        this.changeRataJson.splice(index, 1);
      } else {
        this.changeRataJson.push(ev);
      }
      console.log(this.changeRataJson);
    } else if (cond === 'matrixTypeId') {
      if (
        this.changeMTJson.find(
          (x: any) => x == ev
        )
      ) {
        this.changeMTJson.splice(index, 1);
      } else {
        this.changeMTJson.push(ev);
      }
      console.log(this.changeMTJson);
    }
  }
  isCheckboxChecked(value: number): boolean {
    const transitModeIdArray = this.formGroupForSSelection.controls['transitModeId'].value;
    return transitModeIdArray.includes(value);
  }
  empNamePhone(data: any) {
    debugger
    // this.customerBasicForm.controls['compEmpId'].setValue(data.userId)
    const user = this.userMasterList.filter((x: any) => x.userId === +data)[0];
    this.customerBasicForm.controls['compEmail'].setValue(user.emailId);
    this.customerBasicForm.controls['compPhone'].setValue(user.mobileno);
    // this.customerBasicForm.controls['compEmail'].setValue(this.userMasterList.find((x: any) => x.userId = +data).emailId)
    // this.customerBasicForm.controls['compPhone'].setValue(this.userMasterList.find((x: any) => x.userId = +data).mobileno)
    // console.log(this.userMasterList.find((x: any) => x.userId = +data).emailId)
  }
  saveDataForBackoup() {
    sessionStorage.setItem('contClauseServBasic', this.customerBasicForm.controls['custId'].value)
  }
  parseJsonForClause(inputJson: any) {
    return inputJson.map((item: { [x: string]: string; }, index: any) => {
      return {
        clauseDescription: item['Clause Description'],
        clausegeneralId: 0,
        clauseName: item['Clause Name'],
        clauseBehaviour: item['Clause Behaviour'],
        contractId: +(this.ClaausecontratId)??0,
        errorMessage: ''
      }
    });
  }
  uploadlauseJosn() {
    const hasErrorMessage = this.modulemasterList.every((item: { errorMessage: string | string[]; }) => item.errorMessage == "");
    if (!hasErrorMessage || this.modulemasterList.length == 0) {
      this.toastrService.error("Resolve Error Occured !", "Error-302 !");
      return
    }
    this.modulemasterList?.forEach((element:any) => {
      element['contractId']=+(this.ClaausecontratId)
    });
    this.contractClauseJson.clauselist = this.modulemasterList
    this.modalService.closeModal()
  }
  // data: AOA = [
  //   [
  //     "Clause Name",
  //     "Clause Description",
  //     "Clause Behaviour"
  //   ],
  // ];
  wopts: XLSX.WritingOptions = { bookType: "csv", type: "array" };
  fileName: string = "clauseDetails.csv";
  // downloadSampleForCLause(): void {
  //   const dataWithHeaders = [...this.data];
  //   /* Join the header row with commas to create a CSV header line */
  //   const headerLine = dataWithHeaders[0].join(",");
  //     /* Create an array for CSV content including the header line */
  //   const csvContent = [headerLine];
  //     /* Append the rest of the data to the CSV content */
  //   for (let i = 1; i < dataWithHeaders.length; i++) {
  //     csvContent.push(dataWithHeaders[i].join(","));
  //   }
  //     /* Join the CSV lines with line breaks to create a valid CSV content */
  //   const csvData = csvContent.join("\n");
  //     /* Generate a Blob containing the CSV data */
  //   const blob = new Blob([csvData], { type: "text/csv" });
  //     /* Create a temporary URL for the Blob and trigger the download */
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = this.fileName;
  //   a.click();
  //     /* Clean up the temporary URL */
  //   window.URL.revokeObjectURL(url);
  // }
  // downloadSampleForCLause(): void {
  //   // Header row
  //   const headers = ["Clause Name", "Clause Description", "Clause Behaviour"];
  
  //   // Data for the "Clause Name" column
  //   const clauseNameData = ["Loading Point Detention Clause", "test",]; // Replace with your desired data
  
  //   // Combine the headers and data
  //   const data = [headers, clauseNameData];
  
  //   // Process data to create a CSV
  //   const csvContent = data.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
  
  //   // Generate a Blob containing the CSV data
  //   const blob = new Blob([csvContent], { type: "text/csv" });
  
  //   // Create a temporary URL for the Blob and trigger the download
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = this.fileName;
  //   a.click();
  
  //   // Clean up the temporary URL
  //   window.URL.revokeObjectURL(url);
  // }
  downloadSampleForCLause(): void {
    // Header row
    const headers = ["Clause Name", "Clause Description", "Clause Behaviour"];
  
    // Data for the "Clause Name" column
    const clauseNameData = this.parseClausename(this.contractClauseList); // Replace with your desired data
  
    // Create an array to hold the data, including the header row
    const data = [headers];
  
    // Add an empty string for the "Clause Name" column and the actual data for the other columns
    for (const name of clauseNameData) {
      data.push([name, "", ""]);
    }
  
    // Process data to create a CSV
    const csvContent = data.map(row => row.map(cell => (cell ? `"${cell}"` : "")).join(",")).join("\n");
  
    // Generate a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: "text/csv" });
  
    // Create a temporary URL for the Blob and trigger the download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = this.fileName;
    a.click();
  
    // Clean up the temporary URL
    window.URL.revokeObjectURL(url);
  }
  parseClausename(contractClauseList:any){
    let json:any
    json= this.contractClauseList.map((x:any)=>x.codeDesc)
    return json
  } 
}
