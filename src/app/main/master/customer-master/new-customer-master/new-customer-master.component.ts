import { HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { event } from "jquery";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { popupclass } from "src/app/models/Class/enum";
import { branchLevel, customerMaster } from "src/app/models/master";
import { CommonServiceService } from "src/app/services/commonService/common-service.service";
import { CountryMasterService } from "src/app/services/master-service/country-master.service";
import { CustomerMasterServiceService } from "src/app/services/master-service/customer-master-service.service";
import { ModalPopupService } from "src/app/services/modalServices/modal-popup.service";
declare var $: any;
@Component({
  selector: "app-new-customer-master",
  templateUrl: "./new-customer-master.component.html",
  styleUrls: ["./new-customer-master.component.scss"],
})
export class NewCustomerMasterComponent implements OnInit {
  customeformGeneralMaster: any = FormGroup;
  customerBranch: any = FormGroup;
  kamDetailsForm: any = FormGroup;
  submitted!: true;
  kamSubmitted!: true;
  branchSubmitted!: true;
  customerDetailsById: any = "";
  UserId: any;
  selectedIndex: number = 0;
  activeTab: any = "general_details";
  payBasicAllowed: any;
  industryTypeList: any;
  CustomerGroupList: any;
  userMasterList: any;
  typeOfOwerList: any;
  CategoryType: any;
  customerStageList: any;
  branchMasterList: any;
  cityMasterList: any;
  stateMasterList: any;
  countryMasterList: any;
  pinCodeList: any;
  serviceOptList: any;
  bankNameList: any;
  billingSubList: any;
  KamTypeList: any;
  KamNameCodeList: any;
  conConList: any;
  ConsignorConsigneeList: any;
  bindJsonForKam: any = [];
  newArrayiWithSUbmission: any = [];
  selectedFileName: any = undefined;
  newArrayWithSUbmissionCngCnse: any = [];
  addressMasterList: any = [];
  customertypeList: any = [];
  getAddressMappingArray: any = [];
  addressSearchFilter: any = [];
  getCngrCnseArray: any = [];
  cngr_cnge_list: any = [];
  checCitkList: any;
  serchValidate = false;
  constructor(
    private formguilder: FormBuilder,
    private toastrService: ToastrService,
    private routes: Router,
    private masterservice: CountryMasterService,
    private modalService: ModalPopupService,
    private cs: CommonServiceService, //for id
    public router: ActivatedRoute,
    private customerServicve: CustomerMasterServiceService
  ) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    };
    this.UserId = this.cs.login_User_Code(); //for id
  }
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.formValidation();
    this.getCustomerGroup();
    this.getUserMaster();
    this.getBranchMaster();
    this.getCityMaster();
    this.getStateMaster();
    this.getCountryMaster();
    this.getKamNameCode();
    this.getGeneralMasterDropDown();
    this.getConsignerConsigneeList();
    this.router.params.subscribe((res) => {
      debugger;
      let custId = res.data;
      if (custId) {
        this.customerServicve
          .getCustomerMasterById(custId)
          .subscribe((res: any) => {
            this.customerDetailsById = res.data[0];
            this.getPinCode(res.data[0].pinCode)
            if (this.customerDetailsById) {
              this.customeformGeneralMaster.patchValue(res.data[0]);
              this.selectedFileName =
                this.customerDetailsById?.custTypeFilePath == ""
                  ? undefined
                  : this.customerDetailsById?.custTypeFilePath;
              const payBAllowed =
                this.customerDetailsById.customerPayBasis?.map(
                  (item: { payBasisId: any }) => item.payBasisId
                );
              this.customeformGeneralMaster.controls["payBasisId"].setValue(
                payBAllowed
              );
              // const branchPId = this.customerDetailsById.customerBranch.map((item: { custBranchMappingId: any; }) => item.custBranchMappingId);
              // this.customerBranch.controls['branchId'].patchValue(branchPId)
              // this.kamDetailsArray = this.customerDetailsById?.customerKAM
              // this.bindJsonForKam  = this.customerDetailsById?.customerKAM
              // this.getAddressMappingArray=this.customerDetailsById?.customerAdd
              // this.newArrayiWithSUbmission=this.customerDetailsById?.customerAdd
            }
            
          });
      }
    });
  }
  formValidation() {
    this.customeformGeneralMaster = this.formguilder.group({
      custGroupId: ["", Validators.required],
      custName: [
        "",
        [Validators.required, Validators.pattern(/^[a-z ,.&'-]+$/i)],
      ],
      decisionMakerEmpId: ["", Validators.required],
      industryTypeId: ["", Validators.required],
      mobileNo: [
        "",
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")], //
      ],
      panNo: [
        "",
        [Validators.required, Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")],
      ],
      typeOfOwnerShipId: ["", Validators.required],
      custCategoryId: ["", Validators.required],
      custTypeId: ["", Validators.required],
      custTypeFilePath: [""],
      custStageId: [null], //
      address: [""], //
      cityId: [null], //
      pincodeId: [null], //
      bankId: [null], //
      acountNumber: [
        "",
        [Validators.pattern("^((\\+91-?)|0)?[0-9]{12}$")], //
      ],
      tinNumber: [null], //
      billSubmissionTypeId: ["", [Validators.required]],
      serviceOptedId: ["", [Validators.required]],
      isPodRequired: [true],
      isCustContractModeOnline: [true],
      isActive: [true],
      payBasisId: ["", Validators.required],
      inActiveReason: [""],//additional
      isBlacklist: [false],//additional
      blacklistReason: [""],//additional
      //done gen validation
    });
    this.customerBranch = this.formguilder.group({
      branchId: ["", Validators.required],
    });
    this.kamDetailsForm = this.formguilder.group({
      kamTypeId: ["", Validators.required],
      kamEmpId: ["", Validators.required],
      isActive: [true],
    });
    this.addressSearchFilter = this.formguilder.group({
      stateId: ["", Validators.required],
      cityId: ["", Validators.required],
    });
  }
  get f() {
    return this.customeformGeneralMaster.controls;
  }
  get ff() {
    return this.customerBranch.controls;
  }
  get kamValidate() {
    return this.kamDetailsForm.controls;
  }
  get serAddFilter() {
    return this.addressSearchFilter.controls;
  }
  getCustomerGroup() {
    this.masterservice.getAllCustomerMaster().subscribe((res: any) => {
      this.CustomerGroupList = res.data;
    });
  }
  getKamNameCode() {
    this.masterservice.getAllUserMasterList().subscribe((res: any) => {
      this.KamNameCodeList = res.data;
    });
  }
  getUserMaster() {
    this.masterservice.getAllUserMasterList().subscribe((res: any) => {
      this.userMasterList = res.data;
    });
  }
  getBranchMaster() {
    this.masterservice.getAllBranchMasterList().subscribe((res: any) => {
      this.branchMasterList = res.data;
    });
  }
  getCityMaster() {
    this.masterservice.getAllCityMasterList().subscribe((res: any) => {
      // this.cityMasterList = res.data;
      this.checCitkList = res.data;
    });
  }
  getStateMaster() {
    this.masterservice.getAllStateMasterList().subscribe((res: any) => {
      this.stateMasterList = res.data;
    });
  }
  getCountryMaster() {
    this.masterservice.getAllCountryList().subscribe((res: any) => {
      this.countryMasterList = res.data;
    });
  }
  getPinCode(textSearch: any) {
    debugger
    let data = {
      cityId: 0,
      pageNumber: 0, // Use this.p for page number
      pageSize: 0,
      searchD: textSearch//==0?'5000':textSearch
    };
    this.masterservice.getAllPincodeMasterListTest(data).subscribe((res: any) => {
      this.pinCodeList = res.data
      if(this.customerDetailsById){
        let selectedPinCodeItem = this.pinCodeList?.find(
          (item: any) => item.pincodeId === this.customerDetailsById.pincodeId
        );
        this.cityMasterList = this.checCitkList.filter(
          (x: { cityId: any }) => x?.cityId == selectedPinCodeItem?.cityId
        );
      }
    })
   
  }
  getConsignerConsigneeList() {
    this.masterservice.getAll_Cngr_Cnse_Master().subscribe((res: any) => {
      this.cngr_cnge_list = res.data;
    });
  }
  getGeneralMasterDropDown() {
    this.masterservice
      .getGeneralMasterByCodeTyoeId(52)
      .subscribe((res: any) => {
        this.ConsignorConsigneeList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(34)
      .subscribe((res: any) => {
        this.industryTypeList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(33)
      .subscribe((res: any) => {
        this.payBasicAllowed = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(49)
      .subscribe((res: any) => {
        this.customerStageList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(48)
      .subscribe((res: any) => {
        this.CategoryType = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(47)
      .subscribe((res: any) => {
        this.typeOfOwerList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(50)
      .subscribe((res: any) => {
        this.serviceOptList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(51)
      .subscribe((res: any) => {
        this.billingSubList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(60)
      .subscribe((res: any) => {
        this.customertypeList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(31)
      .subscribe((res: any) => {
        this.KamTypeList = res.data;
      });
    this.masterservice
      .getGeneralMasterByCodeTyoeId(28)
      .subscribe((res: any) => {
        this.bankNameList = res.data;
      });
  }
  onTabClick(nextTab?: string) {
    this.activeTab = nextTab;
    console.log(this.activeTab);
  }
  modelopen(model: any) {
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
  }
  modelopenfor_cng(model: any) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    };
    $("#MyTable").DataTable().destroy();
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
  }
  OnSubmit() {
    debugger;
    if (this.activeTab == "general_details") {
      this.submitted = true;
      if (this.customeformGeneralMaster.invalid) {
        return;
      }
      this.onTabClick("branch_details");
      if (this.customerDetailsById.custId) {
        const branchPId = this.customerDetailsById?.customerBranch.map(
          (item: { branchId: any }) => item.branchId
        );
        this.customerBranch.controls["branchId"].patchValue(branchPId);
      }
    } else if (this.activeTab == "branch_details") {
      this.branchSubmitted = true;
      if (this.customerBranch.invalid) {
        return;
      }
      this.onTabClick("kam_details");
      if (this.customerDetailsById.custId) {
        this.kamDetailsArray = this.customerDetailsById?.customerKAM;
        this.bindJsonForKam = this.customerDetailsById?.customerKAM;
      }
    } else if (this.activeTab == "kam_details") {
      // this.kamSubmitted = true;
      if (this.bindJsonForKam.length == 0) {
        this.toastrService.warning(
          "Please submit atleast one Kam Address mapping",
          "Error 302"
        );
        return;
      }
      if (this.customerDetailsById.custId) {
        // this.getAddressMappingArray = this.customerDetailsById?.customerAdd; //for duplicacy here
        this.newArrayiWithSUbmission = this.customerDetailsById?.customerAdd;
      }
      this.onTabClick("customer_address_mapping");
    } else if (this.activeTab == "customer_address_mapping") {
      if (this.newArrayiWithSUbmission.length == 0) {
        this.toastrService.warning(
          "Please submit atleast one customer address mapping",
          "Error 302"
        );
        return;
      }
      this.onTabClick("cngr_or_cnge_cngemaster");
      if (this.customerDetailsById.custId) {
        // this.getCngrCnseArray = this.customerDetailsById?.customerCngrCnge;
        this.newArrayWithSUbmissionCngCnse =
          this.customerDetailsById?.customerCngrCnge;
      }
    } else if (this.activeTab == "cngr_or_cnge_cngemaster") {
      var customerJson = new customerMaster();
      customerJson = this.customeformGeneralMaster.value;
      customerJson.customerPayBasis = this.parseJsonForPayBasis(
        this.customeformGeneralMaster.controls["payBasisId"].value
      );
      customerJson.customerBranch = this.parseJsonForBranchSection(
        this.customerBranch.value?.branchId
      );
      customerJson.customerKAM = this.kamDetailsArray;
      customerJson.customerADD = this.parseJsonAddressForCust(
        this.newArrayiWithSUbmission
      ); //,.....
      customerJson.customerCngrCnge = this.parseJsonCngrCnseCust(
        this.newArrayWithSUbmissionCngCnse
      );
      console.log(customerJson);
      if (this.customerDetailsById?.custId == undefined) {
        customerJson.createdBy = +this.UserId;
      } else {
        customerJson.updatedBy = +this.UserId;
        customerJson.custId = this.customerDetailsById?.custId;
      }
      console.log(customerJson);
      if (this.customerDetailsById == "") {
        this.customerServicve.createCustomerMaster(customerJson).subscribe(
          (result) => {
            this.toastrService.success(
              "succesfully Created !",
              "Success-200 !"
            );
            this.routes.navigate(["master/customer-master"]);
          },
          (err) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 422) {
                debugger;

                Object.keys(err.error.Errors).forEach((prop: any) => {
                  const formControl = this.customeformGeneralMaster.get(
                    err.error.Errors[prop]?.PropertyName
                  );
                  //wrong key comes
                  if (formControl) {
                    // activate the error message
                    formControl.setErrors({
                      serverError: err.error.Errors[prop]?.ErrorMessage,
                    });
                  }
                });
              }
              this.toastrService.error(
                err.error.Message,
                `Error status:${err.status}`
              );
            }
          }
        );
      } else {
        this.customerServicve.editCustomerMaster(customerJson).subscribe(
          (result) => {
            this.toastrService.success(
              "succesfully Updated !",
              "Success-200 !"
            );
            this.routes.navigate(["master/customer-master"]);
          },
          (err) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 422) {
                debugger;

                Object.keys(err.error.Errors).forEach((prop: any) => {
                  const formControl = this.customeformGeneralMaster.get(
                    err.error.Errors[prop]?.PropertyName
                  );
                  //wrong key comes
                  if (formControl) {
                    // activate the error message
                    formControl.setErrors({
                      serverError: err.error.Errors[prop]?.ErrorMessage,
                    });
                  }
                });
              }
              this.toastrService.error(
                err.error.Message,
                `Error status:${err.status}`
              );
            }
          }
        );
      }
    }
  }
  kamDetailsArray: any = [];
  addKamDetails() {
    debugger;
    this.kamSubmitted = true;
    if (this.kamDetailsForm.invalid) {
      return;
    }
    //chng
    if (
      this.bindJsonForKam.some(
        (x: { kamTypeId: any; kamEmpId: any }) =>
          x.kamTypeId == this.kamDetailsForm.controls.kamTypeId.value
      )
    ) {
      this.toastrService.warning(
        "Different KAM type and Duplicate value not allowed",
        "Error 302"
      );
      return;
    }
    this.kamDetailsArray.push(this.kamDetailsForm.value);
    console.log(this.kamDetailsArray);
    this.bindJsonForKam = this.kamDetailsArray.map(
      (km: { kamTypeId: any; kamEmpId: any; isActive: any }) => {
        let kamType = this.KamTypeList.find(
          (kam: { generalId: any }) => kam.generalId === km.kamTypeId
        );
        let kamEmp = this.KamNameCodeList.find(
          (u: { userId: any }) => u.userId === km.kamEmpId
        );
        return {
          kamTypeId: km.kamTypeId,
          kamEmpId: km.kamEmpId,
          kamType: kamType ? kamType.codeDesc : null,
          kamEmpName: kamEmp ? kamEmp.name+'-'+kamEmp.userCode : null,
          isActive: km.isActive,
        };
      }
    );

    console.log("result to bind", this.bindJsonForKam);
  }
  previous_function() {
    if (this.activeTab == "branch_details") {
      this.onTabClick("general_details");
    } else if (this.activeTab == "kam_details") {
      this.onTabClick("branch_details");
    } else if (this.activeTab == "customer_address_mapping") {
      this.onTabClick("kam_details");
    } else if (this.activeTab == "cngr_or_cnge_cngemaster") {
      this.onTabClick("customer_address_mapping");
    }
  }
  parseJsonForBranchSection(data: any) {
    if (data) {
      // return data?.map((branchId: any) => {
      //   return {
      //     "branchId": branchId
      //   }
      // })
      return data.map((branchId: any) => {
        const mapping = this.customerDetailsById?.customerBranch?.find(
          (mapping: { branchId: any }) => mapping.branchId === branchId
        );
        return {
          custBranchMappingId: mapping ? mapping.custBranchMappingId : 0,
          custId: mapping ? mapping.custId : 0,
          branchId: branchId,
        };
      });
    }
    // return arr.map((branchId) => {
    //   return {
    //     "vendorBranchMappingId": this.vendorDetailsById==''?null:this.vendorDetailsById[0].branchMappings[0]?.vendorBranchMappingId,
    //     "branchId": branchId
    //   };
    // });
  }
  isActiveForAddress(index: any, value: any) {
    this.newArrayiWithSUbmission[index]["isGstApplicable"] = value.checked
      ? true
      : false;
  }
  @ViewChild("gstNumber") gstNumber: ElementRef | any;
  isgstForCust(index: any, value: any) {
    debugger;
    // this.getAddressMappingArray[index]['gstNumber'] = this.gstNumber.nativeElement.value
    // this.getAddressMappingArray[index]["gstNumber"] = value;
    this.newArrayiWithSUbmission[index]["gstNumber"] = value;
  }
  isTanForAddress(index: any, value: any) {
    this.newArrayiWithSUbmission[index]["isTanApplicable"] = value.checked
      ? true
      : false;
  }
  @ViewChild("tanNumber") tanNumber: ElementRef | any;
  isTanForCust(index: any, value: any) {
    debugger;
    this.newArrayiWithSUbmission[index]["tanNumber"] = value;
  }
  dataOptForCngCns(data: any, index: any) {
    this.newArrayWithSUbmissionCngCnse[index]["serviceTypeId"] = data;
  }
  parseJsonAddressForCust(arr: []) {
    debugger;
    return arr.map((item: any) => {
      // Check if the input array has a "custAddressMappingId" property,
      // which indicates that it's the second type of input
      if ("custAddressMappingId" in item) {
        return {
          custAddressMappingId: item.custAddressMappingId,
          custId: item.custId,
          addressId: item.addressId,
          address: item.address,
          isGstApplicable: item.isGstApplicable,
          gstNumber: item.gstNumber ? item.gstNumber : null,
          isTanApplicable: item.isTanApplicable,
          tanNumber: item.tanNumber ? item.tanNumber : null,
          isActive: item.isActive,
        };
      } else {
        return {
          custAddressMappingId: 0, // You can set the appropriate default value
          addressId: item.addressId,
          isGstApplicable: item.isGstApplicable ? true : false, // You can set the appropriate default value
          gstNumber: item.gstNumber ? item.gstNumber : null,
          isTanApplicable: item.isGstApplicable ? true : false, // You can set the appropriate default value
          tanNumber: item.tanNumber ? item.tanNumber : null,
          isActive: item.isActive,
        };
      }
    });
    // const customerIdJson: any = arr?.map(
    //   (item: { custAddressMappingId: any }) => item.custAddressMappingId
    // );

    // return customerIdJson.map((add: any) => {
    //   const mapping = this.customerDetailsById?.customerAdd?.find(
    //     (x: any) => x.custAddressMappingId == add
    //   );
    //   return {
    //     custAddressMappingId: mapping ? mapping.custAddressMappingId : 0,
    //     addressId: mapping?.addressId,
    //     isGstApplicable: mapping?.isGstApplicable ? true : false,
    //     gstNumber: mapping?.gstNumber ? mapping?.gstNumber : "",
    //     isTanApplicable: mapping?.isTanApplicable ? true : false,
    //     tanNumber: mapping?.tanNumber ? mapping?.tanNumber : "",
    //     isActive: mapping?.isActive,
    //   };
    // });
    // return arr.map((addressId:any) => {
    //   const mapping = this.customerDetailsById?.customerAdd.find((x:any)=>x.addressId==addressId)
    //   return {
    //     "custAddressMappingId": mapping ? mapping.custAddressMappingId : null,
    //     "custId": mapping ? mapping.custId : "",
    //     "addressId": mapping.addressId,
    //         "isGstApplicable": mapping?.isGstApplicable ? true : false,
    //         "gstNumber": mapping?.gstNumber ? mapping?.gstNumber : '',
    //         "isTanApplicable": mapping?.isTanApplicable ? true : false,
    //         "tanNumber": mapping?.tanNumber ? mapping?.tanNumber : '',
    //         "isActive": mapping?.isActive
    //   };
    // });
  }
  getcngr_cnse_Arr(event: any, index: any) {
    debugger;
    if (
      this.getCngrCnseArray.find(
        (x: any) => x.consiConseId == event.consiConseId
      )
    ) {
      this.getCngrCnseArray.splice(index, 1);
    } else {
      this.getCngrCnseArray.push(event);
    }
    console.log(this.getCngrCnseArray);
  }
  goToListingForCnge_Cnse() {
    debugger;
    if (this.getCngrCnseArray.length > 0) {
      if (this.compareJson(this.getCngrCnseArray, this.newArrayWithSUbmissionCngCnse, 'consiConseId')) {
        this.toastrService.warning('Can not select existing list need to uncheck', 'Error 302 !')
        return
      }
      this.newArrayWithSUbmissionCngCnse.push(...this.getCngrCnseArray);
      console.log("new", this.newArrayWithSUbmissionCngCnse);
      this.modalService.closeModal();
      this.getCngrCnseArray = [];
    }
  }
  getAddressMappingArr(event: any, index: any) {
    if (
      this.getAddressMappingArray.find(
        (x: any) => x.addressId == event.addressId
      )
    ) {
      this.getAddressMappingArray.splice(index, 1);
    } else {
      this.getAddressMappingArray.push(event);
    }
    console.log(this.getAddressMappingArray);
  }
  async goTOListing() {
    if (this.getAddressMappingArray.length > 0) {
      if (this.compareJson(this.getAddressMappingArray, this.newArrayiWithSUbmission, 'addressId')) {
        this.toastrService.warning('Can not select existing list need to uncheck', 'Error 302 !')
        return
      }
      await this.newArrayiWithSUbmission.push(...this.getAddressMappingArray);
      // this.newArrayiWithSUbmission = this.getAddressMappingArray;
      console.log(this.newArrayiWithSUbmission);
      this.modalService.closeModal();
      this.addressMasterList = [];
      this.getAddressMappingArray = [];
      $("#MyTableAdd").DataTable().destroy();
    }
  }
  parseJsonCngrCnseCust(arr: any) {
    // return arr.map((add: any) => {
    //   return {
    //     consiConseId: add.consiConseId,
    //     isActive: add.isActive,
    //   };
    // });
    // const cngrJson: any = arr?.map(
    //   (item: { consgMappingId: any }) => item.consgMappingId
    // );

    // return cngrJson.map((add: any) => {
    //   const mapping = this.customerDetailsById?.customerCngrCnge?.find(
    //     (x: any) => x.consgMappingId == add
    //   );
    //   return {
    //     consgMappingId: mapping ? mapping.consgMappingId : 0,
    //     consiConseId: mapping?.consiConseId,
    //   };
    // });
    return arr.map((item: any) => {
      if ("consgMappingId" in item) {
        return {
          consgMappingId: item.consgMappingId,
          consiConseId: item.consiConseId,
          serviceTypeId: item.serviceTypeId,
        };
      } else {
        return {
          consgMappingId: 0, // You can set the appropriate default value
          consiConseId: item.consiConseId,
          serviceTypeId: item.serviceTypeId,
        };
      }
    });
  }
  parseJsonForPayBasis(arr = []) {
    debugger;
    return arr.map((payBasisId) => {
      const mapping = this.customerDetailsById?.customerPayBasis?.find(
        (mapping: { payBasisId: any }) => mapping?.payBasisId === payBasisId
      );
      return {
        custPayBasisMappingId: mapping ? mapping.custPayBasisMappingId : 0,
        custId: mapping ? mapping.custId : 0,
        payBasisId: payBasisId,
      };
    });
  }
  //file msmed
  onFileChange(event: any) {
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      this.customeformGeneralMaster.controls["custTypeFilePath"].setValue(
        files.item(0)?.name || ""
      );
      this.selectedFileName = files.item(0)?.name || "";
    } else {
      this.customeformGeneralMaster.controls["custTypeFilePath"].setValue(null);
      this.selectedFileName = "";
    }
  }
  fileReset() {
    if (this.selectedFileName != "") {
      this.selectedFileName = undefined;
      this.customeformGeneralMaster.controls["custTypeFilePath"].setValue("");
    }
  }
  dropDownForbinding(selectedItem: any, eventTes: string) {
    debugger;
    if (eventTes == "pincode") {
      if (selectedItem?.target?.value.length > 4) this.getPinCode(selectedItem?.target?.value)
      let selectedPinCodeItem = this.pinCodeList?.find(
        (item: any) => item.pincodeId === selectedItem
      );
      this.cityMasterList = this.checCitkList.filter(
        (x: { cityId: any }) => x?.cityId == selectedPinCodeItem?.cityId
      );
      this.customeformGeneralMaster.controls["cityId"].setValue(null);
    }
  }
  searchFilterForAdd() {
    debugger;
    this.serchValidate = true;
    if (this.addressSearchFilter.invalid) return;
    console.log(this.addressSearchFilter.value);
    if (this.serchValidate) {
      $("#MyTableAdd").DataTable().destroy();
      this.customerServicve
        .getCustAdflrs(this.addressSearchFilter.value)
        .subscribe((res: any) => {
          if (res.succeeded) {
            this.addressMasterList = res.data;
            this.dtTrigger.next(null);
          }
        });
    }
  }
  handleValidateFile(data: any) {
    if (data == 210) {
      const control = this.customeformGeneralMaster.get("custTypeFilePath");
      control.setValidators([Validators.required]);
      control.updateValueAndValidity();
    } else {
      const control = this.customeformGeneralMaster.get("custTypeFilePath");
      control.clearValidators();
      control.updateValueAndValidity();
    }
  }
  compareJson(json1: any, json2: any, target: any) {
    debugger
    for (const element of json1) {
      const value = element[target];
      const found = json2.find((element: any) => element[target] === value);
      if (found) {
        return true;
      }
    }
    return false;
  }
  inActiveReason(a: any) {
    debugger
    if (a == 0) {
      if (this.customeformGeneralMaster.controls.isBlacklist.value == true) {
        const control = this.customeformGeneralMaster.get("blacklistReason");
        control.setValidators([Validators.required,Validators.pattern(/^[a-z ,.&'-]+$/i)]);
        control.updateValueAndValidity();
      } else {
        const control = this.customeformGeneralMaster.get("blacklistReason");
        control.clearValidators();
        control.updateValueAndValidity();
      }
    } else {
      if (this.customeformGeneralMaster.controls.isActive.value == false) {
        const control = this.customeformGeneralMaster.get("inActiveReason");
        control.setValidators([Validators.required,Validators.pattern(/^[a-z ,.&'-]+$/i)]);
        control.updateValueAndValidity();
      } else {
        const control = this.customeformGeneralMaster.get("inActiveReason");
        control.clearValidators();
        control.updateValueAndValidity();
      }
    }
  }
}
