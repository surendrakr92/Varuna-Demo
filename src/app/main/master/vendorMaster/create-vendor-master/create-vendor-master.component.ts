import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { item } from 'src/app/models/vendorMaster';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
@Component({
  selector: 'app-create-vendor-master',
  templateUrl: './create-vendor-master.component.html',
  styleUrls: ['./create-vendor-master.component.scss']
})
export class CreateVendorMasterComponent implements OnInit {
  vendorTypeList: any
  branchList: any
  cityList: any = []
  generalMasterList: any
  stateList: any
  pinCodeList: any
  countryMasterList: any
  formVendorMaster: any = FormGroup
  submitted = false
  ThirdPartyCompanyList: any
  serviceTypeList: any
  bankNameList: any
  creditNatureList: any
  selectedValue1: any = false;
  formActivetion: any = "";
  vendorDetailsById: any = "";
  UserId: any;
  vendorId: any = ""
  userMasterList: any
  businessType: any
  taxCategory: any
  selectedValue: any;
  selectedFileName: any = undefined
  selectedFileNameForOther: any = undefined
  selectedFileNamegetCert: any = undefined
  selectedFileNamevendroAgreement: any = undefined
  selectedCancelCheque: any = undefined
  selectedPanCardFile: any = undefined
  checCitkList: any = []
  checSitkList: any = []
  checCOitkList: any = []
  UserEmpID: any
  @ViewChild('yourInput') yourInput: ElementRef | any;
  constructor(private masterservice: CountryMasterService,
    private routes: Router,
    private renderer: Renderer2,
    private formbuilder: FormBuilder,
    private toastrService: ToastrService,
    private cs: CommonServiceService,//for id
    private router: ActivatedRoute) {
    this.UserId = this.cs.login_User_Code()//for id
    this.UserEmpID = this.cs.login_UserId()//for id
  }
  ngOnInit(): void {
    this.getAllCityList()
    this.getAllBranchMasterList()
    this.getAllSatateMaster()
    // this.getPineCode()
    this.getAllCountryMaster()
    this.getAllGeneralMasterDropDown()
    this.getAllUserMaster()
    this.formValidation()
    this.router.params.subscribe((res) => {
      debugger
      let v_id = res.id
      if (v_id) {
        this.masterservice.getVendorMasterById(v_id).subscribe((res: any) => {
          this.vendorDetailsById = res.data
          console.log(this.vendorDetailsById)
          this.selectedValue = this.vendorDetailsById[0].vendorType;
          this.getPineCode(res.data[0].pinCode)
          const branchIdsArray = res.data[0].branchMappings.map((item: { branchId: any; }) => item.branchId);
          this.formVendorMaster.patchValue(res.data[0])
          this.formVendorMaster.controls['branchId'].setValue(branchIdsArray)
          this.formVendorMaster.patchValue(res.data[0]?.vendorAcc[0])
          this.formVendorMaster.patchValue(res.data[0]?.vendorThirdParty[0])
          this.selectedCancelCheque = res.data[0]?.vendorAcc[0]?.cancelChequeFile
          this.selectedCancelCheque = res.data[0]?.vendorAcc[0]?.cancelChequeFile==''?undefined:res.data[0]?.vendorAcc[0]?.cancelChequeFile
          this.selectedFileNamegetCert = res.data[0]?.gstCertificateFile
          this.selectedFileNamevendroAgreement = res.data[0]?.vendorAgreementFile
          this.selectedFileName = res.data[0]?.msmedCertificateFile
          this.selectedPanCardFile = res.data[0]?.panCardFile==''?undefined:res.data[0]?.panCardFile
          this.selectedFileNameForOther = res.data[0]?.otherFile
          this.selection_open_close_form(this.selectedValue)
        })
      }
    })
  }
  get f() {
    return this.formVendorMaster.controls
  }
  formValidation() {
    this.formVendorMaster = this.formbuilder.group({
      vendorName: ['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9]{3,}(?: [a-zA-Z0-9]+)*$')]],
      vendorType: ['', Validators.required],
      cityId: ['', Validators.required],
      pincodeId: ['', Validators.required],
      stateId: ['', Validators.required],
      countryId: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],//
      contactPerson: ['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9]{2,}(?: [a-zA-Z0-9]+)*$')]],
      contactPersonMobileNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      contactNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      contactPersonEmailId: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      tinNumber: ['', Validators.required],
      typeOfBusinessId: ['', Validators.required],
      regNumber: ['', Validators.required],
      isInterGroupCompany: [false, Validators.required],
      bankName: ['', Validators.required],
      accountNo: ['', Validators.required],
      name: ['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9]{2,}(?: [a-zA-Z0-9]+)*$')]],
      swiftBIC: ['', [Validators.pattern('^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$')]],//required removed
      creditNatureId: ['', Validators.required],
      creditPeriod: ['', Validators.required],
      isPanAvailable: [true],
      panNo: ['', [Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      panCardFile: ['', Validators.required],
      gstNumber: ['', [Validators.required, Validators.pattern('^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')]],
      gstCertificateFile: ['', Validators.required],
      taxServiceTypeId: ['', Validators.required],
      serviceTaxNo: ['', Validators.required],
      taxCategoryId: ['', Validators.required],
      otherFile: ['', Validators.required],
      msmedCertificateFile: ['', Validators.required],
      isMsmedReg: [true],
      clearingCode: ['', [Validators.required, Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')]], //('^[A-Z]{4}0[A-Z0-9]{6}$')]],'^[A-Z]{4}0[0-9]{6}$'
      isUnderAgreement: [true],
      vendorAgreementFile: ['', Validators.required],
      isActive: [true],
      thirdPartyCompanyId: [null],
      thirdPartyId: [null],
      refUserId: ['', Validators.required],
      branchId: ['', Validators.required],
      cancelChequeFile: ['', Validators.required],
      longitude: ['', [Validators.required,Validators.pattern(/^(\d{1,2}(\.\d{1,4})?|90(\.0{1,4})?)$/)]],
      latitude: ['', [Validators.required,Validators.pattern(/^(\d{1,2}(\.\d{1,4})?|90(\.0{1,4})?)$/)]],
      isBlacklisted: [false],
    })
  }
  getAllGeneralMasterDropDown() {
    this.masterservice.getAllCodeType().subscribe((res: any) => {
      this.generalMasterList = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(46).subscribe((res: any) => {
      this.vendorTypeList = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(22).subscribe((res: any) => {
      this.ThirdPartyCompanyList = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(30).subscribe((res: any) => {
      this.serviceTypeList = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(21).subscribe((res: any) => {
      this.businessType = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(28).subscribe((res: any) => {
      this.bankNameList = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(29).subscribe((res: any) => {
      this.creditNatureList = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(37).subscribe((res: any) => {
      this.taxCategory = res.data
    })
  }
  getAllBranchMasterList() {
    this.masterservice.getAllBranchMasterList().subscribe((res: any) => {
      this.branchList = res.data
    })
  }
  getAllCityList() {
    this.masterservice.getAllCityMasterList().subscribe((res: any) => {
      this.cityList = res.data
      this.checCitkList = res.data

    })
  }
  getPineCode(textSearch:any) {
    let data = {
      cityId: 0,
      pageNumber: 0, // Use this.p for page number
      pageSize: 0,
      searchD: textSearch//==0?'5000':textSearch
    };
    this.masterservice.getAllPincodeMasterListTest(data).subscribe((res:any)=>{
      this.pinCodeList= res.data
    })
  }
  getAllSatateMaster(data?: any) {
    this.masterservice.getAllStateMasterList().subscribe((res: any) => {
      this.stateList = res.data
      this.checSitkList = res.data
    })
  }
  getAllCountryMaster() {
    this.masterservice.getAllCountryList().subscribe((res: any) => {
      this.countryMasterList = res.data
      this.checCOitkList = res.data
    })
  }
  getAllUserMaster() {
    this.masterservice.getAllUserMasterList().subscribe((res: any) => {
      this.userMasterList = res.data
    })
  }
  selection_open_close_form(data: any) {
    if (data) {
      this.selectedValue1 = true
      this.formActivetion = ''
      this.mainopenningFormvalidation(data)
    } else {
      this.selectedValue1 = false
    }
  }
  //city
  dropDownForbinding(selectedItem: any, eventTes: string) {
    debugger
    if (eventTes == 'pincode') {
      if(selectedItem?.target?.value.length>4)this.getPineCode(selectedItem?.target?.value)
      let selectedPinCodeItem = this.pinCodeList?.find((item: any) => item.pincodeId === selectedItem);
      this.cityList = this.checCitkList.filter((x: { cityId: any; }) => x?.cityId == selectedPinCodeItem?.cityId)
      this.formVendorMaster.controls['cityId'].setValue('')
      this.formVendorMaster.controls['countryId'].setValue('')
      this.formVendorMaster.controls['stateId'].setValue('')
    } else if (eventTes == 'cityName') {
      let selectedCityCodeItem = this.checCitkList.find((item: any) => item.cityId === selectedItem);
      this.stateList = this.checSitkList.filter((x: { stateId: any; }) => x?.stateId == selectedCityCodeItem?.stateId)
      this.formVendorMaster.controls['countryId'].setValue('')
      this.formVendorMaster.controls['stateId'].setValue('')

    } else if (eventTes == 'stateName') {
      let selectedstateCodeItem = this.checSitkList.find((item: any) => item.stateId === selectedItem);
      this.countryMasterList = this.checCOitkList.filter((x: { countryId: any; }) => x?.countryId == selectedstateCodeItem?.countryId)
      this.formVendorMaster.controls['countryId'].setValue('')
      this.formVendorMaster.controls['countryId'].setValue('')
    }
  }
  //file msmed
  onFileChange(event: any) {
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      this.formVendorMaster.controls['msmedCertificateFile'].setValue(files.item(0)?.name || '');
      this.selectedFileName = files.item(0)?.name || '';
    } else {
      this.formVendorMaster.controls['msmedCertificateFile'].setValue(null);
      this.selectedFileName = '';
    }
  }
  fileReset() {
    if (this.selectedFileName != '') {
      this.selectedFileName = undefined
      this.formVendorMaster.controls['msmedCertificateFile'].setValue(null);
    }
  }
  //file other
  onFileChangeforOther(event: any) {
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      this.formVendorMaster.controls['otherFile'].setValue(files.item(0)?.name || '');
      this.selectedFileNameForOther = files.item(0)?.name || '';
    } else {
      this.formVendorMaster.controls['otherFile'].setValue(null);
      this.selectedFileNameForOther = '';
    }
  }
  fileResetforOther() {
    if (this.selectedFileNameForOther != '') {
      this.selectedFileNameForOther = undefined
      this.formVendorMaster.controls['otherFile'].setValue(null);
    }
  }
  //file vendroAgreement
  onFileChangevendroAgreement(event: any) {
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      this.formVendorMaster.controls['vendorAgreementFile'].setValue(files.item(0)?.name || '');
      this.selectedFileNamevendroAgreement = files.item(0)?.name || '';
    } else {
      this.formVendorMaster.controls['vendorAgreementFile'].setValue(null);
      this.selectedFileNamevendroAgreement = '';
    }
  }
  fileResetvendroAgreement() {
    if (this.selectedFileNamevendroAgreement != '') {
      this.selectedFileNamevendroAgreement = undefined
      this.formVendorMaster.controls['vendorAgreementFile'].setValue(null);
    }
  }
  // file gstCertificate
  onFileChangegetCert(event: any) {
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      this.formVendorMaster.controls['gstCertificateFile'].setValue(files.item(0)?.name || '');
      this.selectedFileNamegetCert = files.item(0)?.name || '';
    } else {
      this.formVendorMaster.controls['gstCertificateFile'].setValue(null);
      this.selectedFileNamegetCert = '';
    }
  }
  //file cancelcheque
  onFileChancancelChqque(event: any) {
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      this.formVendorMaster.controls['cancelChequeFile'].setValue(files.item(0)?.name || '');
      this.selectedCancelCheque = files.item(0)?.name || '';
    } else {
      this.formVendorMaster.controls['cancelChequeFile'].setValue(null);
      this.selectedCancelCheque = '';
    }
  }
  //file pancardfile
  onFilepanCardFile(event: any) {
    debugger
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      this.formVendorMaster.controls['panCardFile'].setValue(files.item(0)?.name || '');
      this.selectedPanCardFile = files.item(0)?.name || '';
    } else {
      this.formVendorMaster.controls['panCardFile'].setValue(null);
      this.selectedPanCardFile = '';
    }
  }
  fileResetcancelCheque() {
    if (this.selectedCancelCheque != '') {
      this.selectedCancelCheque = undefined
         this.formVendorMaster.controls['cancelChequeFile'].setValue(null);
    }
  }
  fileResetPanCardFile() {
    debugger
    if (this.selectedPanCardFile != '') {
      this.selectedPanCardFile = undefined
      this.formVendorMaster.controls['panCardFile'].setValue('');
    }
  }
  fileResetgetCert() {
    if (this.selectedFileNamegetCert != '') {
      this.selectedFileNamegetCert = undefined
      this.formVendorMaster.controls['gstCertificateFile'].setValue('');
    }
  }
  third_part_Data_bind(data: any) {
    if (data) {
      const control: any = this.formVendorMaster.controls['thirdPartyId'];
      this.yourInput.nativeElement.removeAttribute('readonly');
      control.setValidators([Validators.required]);
      control.updateValueAndValidity();
    } else {
      const control: any = this.formVendorMaster.controls['thirdPartyId'];
      this.renderer.setAttribute(this.yourInput.nativeElement, 'readonly', 'true');
      this.formVendorMaster.controls['thirdPartyId'].setValue('')
      control.clearValidators()
      control.updateValueAndValidity();
    }
  }
  //parsing
  // parseJson(arr = []) {
  //   debugger
  //   return arr.map((branchId) => {
  //     return {
  //       "vendorBranchMappingId": this.vendorDetailsById==''?null:this.vendorDetailsById[0].branchMappings[0]?.vendorBranchMappingId,
  //       "branchId": branchId
  //     };
  //   });
  // }
  //supported working
  parseJson(arr = []) {
    debugger
    return arr.map((branchId) => {
      const mapping = this.vendorDetailsById[0]?.branchMappings.find((mapping: { branchId: any; }) => mapping.branchId === branchId);
      return {
        "vendorBranchMappingId": mapping ? mapping.vendorBranchMappingId : 0,
        "vendorId": mapping ? mapping.vendorId : "",
        "branchId": branchId
      };
    });
  }
  submit() {
    this.submitted = true;
    if (this.formVendorMaster.invalid) {
      return
    }
    let postJson: any = {
      "vendorId": this.vendorDetailsById == '' ? null : this.vendorDetailsById[0]?.vendorId,
      "vendorCode": this.vendorDetailsById == '' ? null : this.vendorDetailsById[0]?.vendorCode,
      "vendorName": this.formVendorMaster?.controls['vendorName'].value,
      "vendorType": this.formVendorMaster?.controls['vendorType'].value == '' ? 0 : this.formVendorMaster?.controls['vendorType'].value,
      "isPanAvailable": this.formVendorMaster?.controls['isPanAvailable'].value == '' ? false : this.formVendorMaster?.controls['isPanAvailable'].value,
      "panNo": this.formVendorMaster?.controls['panNo'].value,
      "panCardFile": this.formVendorMaster?.controls['panCardFile'].value,
      "serviceTaxNo": this.formVendorMaster?.controls['serviceTaxNo'].value,
      "addressLine1": this.formVendorMaster?.controls['addressLine1'].value,
      "addressLine2": this.formVendorMaster?.controls['addressLine2'].value,
      "contactNo": this.formVendorMaster?.controls['contactNo'].value,
      "countryId": this.formVendorMaster?.controls['countryId'].value == '' ? 0 : this.formVendorMaster?.controls['countryId'].value,
      "stateId": this.formVendorMaster?.controls['stateId'].value == '' ? 0 : this.formVendorMaster?.controls['stateId'].value,
      "cityId": this.formVendorMaster?.controls['cityId'].value == '' ? 0 : this.formVendorMaster?.controls['cityId'].value,
      "pincodeId": this.formVendorMaster?.controls['pincodeId'].value == '' ? 0 : this.formVendorMaster?.controls['pincodeId'].value,
      "contactPerson": this.formVendorMaster?.controls['contactPerson'].value,
      "contactPersonMobileNo": this.formVendorMaster?.controls['contactPersonMobileNo'].value,
      "contactPersonEmailId": this.formVendorMaster?.controls['contactPersonEmailId'].value,
      "tinNumber": this.formVendorMaster?.controls['tinNumber'].value,
      "creditNatureId": this.formVendorMaster?.controls['creditNatureId'].value == '' ? 0 : this.formVendorMaster?.controls['creditNatureId'].value,
      "creditPeriod": this.formVendorMaster?.controls['creditPeriod'].value == '' ? 0 : this.formVendorMaster?.controls['creditPeriod'].value,
      "registrationTypeId": 1,
      "gstNumber": this.formVendorMaster?.controls['gstNumber'].value,
      "gstCertificateFile": this.formVendorMaster?.controls['gstCertificateFile'].value,
      "isMsmedReg": this.formVendorMaster?.controls['isMsmedReg'].value == '' ? 0 : this.formVendorMaster?.controls['isMsmedReg'].value,
      "msmedCertificateFile": this.formVendorMaster?.controls['msmedCertificateFile'].value,
      "isUnderAgreement": this.formVendorMaster?.controls['isUnderAgreement'].value == '' ? 0 : this.formVendorMaster?.controls['isUnderAgreement'].value,
      "vendorAgreementFile": this.formVendorMaster?.controls['vendorAgreementFile'].value,
      "isInterGroupCompany": this.formVendorMaster?.controls['isInterGroupCompany'].value == '' ? 0 : this.formVendorMaster?.controls['isInterGroupCompany'].value,
      "typeOfBusinessId": this.formVendorMaster?.controls['typeOfBusinessId'].value == '' ? 0 : this.formVendorMaster?.controls['typeOfBusinessId'].value,
      "regNumber": this.formVendorMaster?.controls['regNumber'].value,
      "refUserId": this.formVendorMaster?.controls['refUserId'].value == '' ? 0 : this.formVendorMaster?.controls['refUserId'].value,
      "otherFile": this.formVendorMaster?.controls['otherFile'].value,
      "taxServiceTypeId": this.formVendorMaster?.controls['taxServiceTypeId'].value == '' ? 0 : this.formVendorMaster?.controls['taxServiceTypeId'].value,
      "taxCategoryId": this.formVendorMaster?.controls['taxCategoryId'].value == '' ? 0 : this.formVendorMaster?.controls['taxCategoryId'].value,
      "vendorAcc":
        [{
          "accInfoId": this.vendorDetailsById == '' ? null : this.vendorDetailsById[0]?.vendorAcc[0].accInfoId,
          "countryId": this.formVendorMaster?.controls['countryId'].value == '' ? 0 : this.formVendorMaster?.controls['countryId'].value,
          "name": this.formVendorMaster?.controls['name'].value,
          "accountNo": this.formVendorMaster?.controls['accountNo'].value,
          "clearingCode": this.formVendorMaster?.controls['clearingCode'].value,
          "bankName": this.formVendorMaster?.controls['bankName'].value,
          "swiftBIC": this.formVendorMaster?.controls['swiftBIC'].value,
          "cancelChequeFile": this.formVendorMaster?.controls['cancelChequeFile'].value,
        }]
      ,
      "vendorThirdParty":
        [{
          "integId": this.vendorDetailsById == '' ? null : this.vendorDetailsById[0]?.vendorThirdParty[0].integId,
          "thirdPartyCompanyId": this.formVendorMaster?.controls['thirdPartyCompanyId'].value == '' ? 0 : this.formVendorMaster?.controls['thirdPartyCompanyId'].value,
          "thirdPartyId": +(this.formVendorMaster?.controls['thirdPartyId'].value),
        }]
      ,
      "branchMappings": this.parseJson(this.formVendorMaster?.controls.branchId.value),
      "isActive": this.formVendorMaster?.controls['isActive'].value,
      "isBlacklisted": this.formVendorMaster?.controls['isBlacklisted'].value,
      "longitude": this.formVendorMaster?.controls['longitude'].value == '' ? 0 : this.formVendorMaster?.controls['longitude'].value,
      "latitude": this.formVendorMaster?.controls['latitude'].value == '' ? 0 : this.formVendorMaster?.controls['latitude'].value,
      //"createdBy": 1581,

    }
    if (this.vendorDetailsById[0]?.vendorId == undefined) { postJson.createdBy = +this.UserId }
    else { postJson.updatedBy = +this.UserId; postJson.vendorId = this.vendorDetailsById[0]?.vendorId }
    console.log(postJson)
    // alert(JSON.stringify(postJson))
    if (this.vendorDetailsById == "") {
      this.masterservice.createVendorMaster(postJson).subscribe((result) => {

        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/vendor-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formVendorMaster.get(err.error.Errors[prop]?.PropertyName);
              //wrong key comes 
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: err.error.Errors[prop]?.ErrorMessage
                });
              }
            });

          }
          this.toastrService.error(
            err.error.Message,
            `Error statu:${err.status}`
          );
        }
      })

    }
    else {
      this.masterservice.updateVendorMaster(postJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/vendor-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formVendorMaster.get(err.error.Errors[prop]?.PropertyName);
              //wrong key comes 
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: err.error.Errors[prop]?.ErrorMessage
                });
              }
            });

          }
          this.toastrService.error(
            err.error.Message,
            `Error statu:${err.status}`
          );
        }
      })
    }
  }
  vendoragreementdiv = false
  regMsMeddiv = false
  panAvailibilityDiv = true
  isFilehideshow(keepar: number) {
    debugger
    if (keepar === 1) {
      this.vendoragreementdiv = !this.vendoragreementdiv
      if (this.vendoragreementdiv) {
        const fullnameControl = this.formVendorMaster.get('vendorAgreementFile');
        fullnameControl.clearValidators();
        fullnameControl.updateValueAndValidity();
      } else {
        const fullnameControl = this.formVendorMaster.get('vendorAgreementFile');
        fullnameControl.setValidators([Validators.required]);
        fullnameControl.updateValueAndValidity();
      }
    } else if (keepar === 2) {
      this.regMsMeddiv = !this.regMsMeddiv
      if (this.regMsMeddiv) {
        const fullnameControl = this.formVendorMaster.get('msmedCertificateFile');
        fullnameControl.clearValidators();
        fullnameControl.updateValueAndValidity();
      } else {
        const fullnameControl = this.formVendorMaster.get('msmedCertificateFile');
        fullnameControl.setValidators([Validators.required]);
        fullnameControl.updateValueAndValidity();
      }
    } else if (keepar == 3) {
      debugger //changes 7/9/23
      this.panAvailibilityDiv = this.formVendorMaster.controls['isPanAvailable'].value
      if (!this.panAvailibilityDiv) {
        const fullnameControl = this.formVendorMaster.get('panNo')
        const vfile = this.formVendorMaster.get('panCardFile')
        fullnameControl.clearValidators();
        fullnameControl.updateValueAndValidity();
        vfile.clearValidators();
        vfile.updateValueAndValidity();
      } else {
        const fullnameControl = this.formVendorMaster.get('panNo') || this.formVendorMaster.get('panCardFile')
        const vfile = this.formVendorMaster.get('panCardFile')
        fullnameControl.setValidators([Validators.required]);
        fullnameControl.updateValueAndValidity();
        vfile.setValidators([Validators.required]);
        vfile.updateValueAndValidity();
      }
    }

  }
  async mainopenningFormvalidation(data: any) {
    debugger
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (this.vendorDetailsById == "") {
      this.formValidation();
      this.selectedFileName = undefined
      this.selectedFileNameForOther = undefined
      this.selectedFileNamegetCert = undefined
      this.selectedFileNamevendroAgreement = undefined
      this.selectedCancelCheque = undefined
      this.selectedPanCardFile = undefined
    }
    this.formVendorMaster.controls['vendorType'].setValue(data);

    if (data == 24) {
      this.formActivetion = 'maritial_active';
    } else if (data == 194 || data == 197 || data == 198 || data == 199 || data==200 || data == 201 || data == 202 || data==203) {//otherIt//otherproc
      this.formActivetion = 'Insurance_activation';
      const controlsToClearValidators = [
        "contactPerson",
        "contactPersonMobileNo",
        "serviceTaxNo",
        'thirdPartyCompanyId',
        'longitude',
        'latitude'
      ]
      controlsToClearValidators.forEach(controlName => {
        const control = this.formVendorMaster.get(controlName);
        control.clearValidators();
        control.updateValueAndValidity();
      });
    } else if (data == 193||data==196) {
      this.formActivetion = 'Attached';//labour contract
      await this.isFilehideshow(1);
      await this.isFilehideshow(2);
      // return this.isFilehideshow(1).pipe(concatMap(() => this.isFilehideshow(2)));
      const controlsToClearValidators = [
        'refUserId',
        'tinNumber',
        'regNumber',
        'typeOfBusinessId',
        'isInterGroupCompany',
        'otherFile',
        'taxServiceTypeId',
        'thirdPartyCompanyId',
        'longitude',
        'latitude'
      ];
      ; // Controls to clear validators
      // Clear validators for form controls as needed
      controlsToClearValidators.forEach(controlName => {
        const control = this.formVendorMaster.get(controlName);
        control.clearValidators();
        control.updateValueAndValidity();
      });
    } else if (data == 204) {
      this.formActivetion = 'vendor_fuel';
      await this.isFilehideshow(1);
      await this.isFilehideshow(2);
      await this.isFilehideshow(3);
      const controlsToClearValidators = [
        'refUserId',
        'contactPerson',
        'contactPersonMobileNo',
        'contactNo',
        'contactPersonEmailId',
        'tinNumber',
        'regNumber',
        'typeOfBusinessId',
        'isInterGroupCompany',
        'otherFile',
        'msmedCertificateFile',//
        'vendorAgreementFile',//
        "bankName",
        "accountNo",
        "name",
        "swiftBIC",
        "creditNatureId",
        "creditPeriod",
        "clearingCode",
        "cancelChequeFile",
        "gstNumber",
        "gstCertificateFile",
        "serviceTaxNo",
        "taxServiceTypeId",
        "taxCategoryId",
        "panCardFile",
        "panNo"
      ]; // Controls to clear validators
      // Clear validators for form controls as needed
      controlsToClearValidators.forEach(controlName => {
        const control = this.formVendorMaster.get(controlName);
        control.clearValidators();
        control.updateValueAndValidity();
      });
    } else if(data==195){
      this.formActivetion = 'vendor_Competitor';
      const controlsToClearValidators = [
        // 'vendorName',removed by rahul sir
        'vendorType',
        'addressLine1',
        'addressLine2',
        'contactPerson',
        'contactPersonMobileNo',
        'contactNo',
        'contactPersonEmailId',
        'tinNumber',
        'typeOfBusinessId',
        'regNumber',
        'isInterGroupCompany',
        'bankName',
        'accountNo',
        'name',
        'swiftBIC',
        'creditNatureId',
        'creditPeriod',
        'isPanAvailable',
        'panNo',
        'panCardFile',
        'gstNumber',
        'gstCertificateFile',
        'taxServiceTypeId',
        'serviceTaxNo',
        'taxCategoryId',
        'otherFile',
        'msmedCertificateFile',
        'isMsmedReg',
        'clearingCode',
        'isUnderAgreement',
        'vendorAgreementFile',
        'isActive',
        'thirdPartyCompanyId',
        'thirdPartyId',
        'refUserId',
        // 'branchId',
        'cancelChequeFile',
        'longitude',
        'latitude',
        'isBlacklisted'
      ]; // Controls to clear validators
      // Clear validators for form controls as needed
      controlsToClearValidators.forEach(controlName => {
        const control = this.formVendorMaster.get(controlName);
        control.clearValidators();
        control.updateValueAndValidity();
      });
    }
    this.formVendorMaster.controls['refUserId'].setValue(+this.UserEmpID)//chnaged acc. discussion
    this.formVendorMaster.controls['refUserId'].disable()
    // Code below the setTimeout will execute after the timeout has elapsed


  }

}

