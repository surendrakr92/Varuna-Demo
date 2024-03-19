import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { popupclass } from 'src/app/models/Class/enum';
import { HttpErrorResponse } from '@angular/common/http';
import { ownerMaster } from 'src/app/models/master';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-new-owner-master',
  templateUrl: './new-owner-master.component.html',
  styleUrls: ['./new-owner-master.component.scss']
})
export class NewOwnerMasterComponent implements OnInit {
  selectedCancelCheque: any = undefined
  selected15GsubFile: any = undefined
  selectedPanCard: any = undefined
  driverDetailsById: any = ""
  owenerDetailsId: any = -1
  viewPagecom: any = ''
  patchedAttachedData: any = ''
  isshowed = false
  UserId:any
  selectedcancelCheque:any=undefined
  checkListCity: any;
  checkStateList: any;
  countryCheckList: any;
  bankNameList: any;
  pinCodeList: any;
  cityList: any;
  stateList: any;
  countryMasterList: any=[];
  constructor(private activeroute: ActivatedRoute,
    private masterservice: CountryMasterService,
    private formbuilder: FormBuilder,
    private cs: CommonServiceService,
    private toastrService: ToastrService,
    private shared_service:SharedService,
    private router: Router,
    private modalService: ModalPopupService) {
    this.UserId = this.cs.login_User_Code()//for id
  }
  ownerMasterForm!: FormGroup
  ownerDetailForm: any = FormGroup
  ownerDetailsArray: any = []
  submitted !: true
  submittO !: true
  ngOnInit(): void {
    this.ownerMasterForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9]{3,}(?: [a-zA-Z0-9]+)*$')]],
      address: ['', Validators.required],
      cityId: ['', Validators.required],
      stateId: ['', Validators.required],
      countryId: ['', Validators.required],
      pincodeId: ['', Validators.required],
      panNo: ['', [Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      phoneNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      panCardFilePath: [''],//
      bankId: [null],//
      accountNo: ['', [ Validators.pattern("^((\\+91-?)|0)?[0-9]{12}$")]],
      clearingCode: ['', [ Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')]],
      swiftBIC: ['', [ Validators.pattern('^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$')]],
      cancelChequePath: [''],
      isActive: [true],
    })
    this.ownerDetailsFor()
    this.getAllCityList()
    this.getAllSatateMaster()
    this.getAllCountryMaster()
    // this.getPineCode()
    this.activeroute.params.subscribe((res) => {
      debugger
      let oWnerMasterId = res.data || res.viewData
      if (res.data) this.viewPagecom = 'edit'
      if (res.viewData) this.viewPagecom = 'view'
      if (oWnerMasterId) {
        this.masterservice.get_owner_master_ById(oWnerMasterId).subscribe((res: any) => {
          this.driverDetailsById = res.data[0]
          console.log(this.driverDetailsById)
          this.getPineCode(res.data[0].pinCode)
          setTimeout(() => {
            // this.dropDownForbinding(this.driverDetailsById.pincodeId,'pincode')
            this.dropDownForbinding(this.driverDetailsById.cityId,'cityName')
            this.dropDownForbinding(this.driverDetailsById.stateId,'stateName')
          }, 200);
         setTimeout(() => {
          debugger
          this.ownerMasterForm.patchValue(res.data[0])
          this.selectedPanCard = res.data[0].panCardFilePath==''?undefined:res.data[0].panCardFilePath
          this.selectedcancelCheque = res.data[0].cancelChequePath==''?undefined:res.data[0].cancelChequePath
          this.ownerDetailsArray = res.data[0].ownerDetails
         }, 200);
        })
      }
    })
  }
  ownerDetailsFor() {
    this.ownerDetailForm = this.formbuilder.group({
      is15GSubmited: [true],
      filePath: [this.isshowed ? [Validators.required] : ""],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    })
  }
  get f() {
    return this.ownerMasterForm.controls
  }
  get ff() {
    return this.ownerDetailForm.controls
  }
  onsubmit() {
    debugger
    this.submitted = true
    if (this.ownerMasterForm.invalid) {
      return
    }
    var ownerJson = new ownerMaster()
    ownerJson = this.ownerMasterForm.value
    if (this.driverDetailsById?.ownerId == undefined) {
      ownerJson.createdBy = +this.UserId
      ownerJson.ownerDetails = (this.ownerDetailsArray)
    }
    else {
      ownerJson.updatedBy = +this.UserId; ownerJson.ownerId = this.driverDetailsById.ownerId
      ownerJson.ownerDetails = (this.ownerDetailsArray)
    }
    console.log(ownerJson)
    if (this.ownerDetailsArray.length == 0) {
      this.toastrService.warning('At least Owner Details needed', 'Success-302 !');
      return
    }
    if (this.driverDetailsById == "") {
      this.masterservice.create_owner_master(ownerJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.router.navigate(['/master/owner-master'])
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.ownerMasterForm.get(err.error.Errors[prop]?.PropertyName);
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
      this.masterservice.update_owner_master(ownerJson).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.router.navigate(['/master/owner-master'])
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.ownerDetailForm.get(err.error.Errors[prop]?.PropertyName);
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

  modelopen(model: any) {
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.medium
    );
    // this.ownerDetailForm.reset(); //you should work on that
    this.ownerDetailsFor()
    this.selected15GsubFile = undefined
    this.ownerMasterForm.updateValueAndValidity()
    this.owenerDetailsId = -1
  }
  getAllCityList() {
    this.masterservice.getAllCityMasterList().subscribe((res: any) => {
      this.checkListCity=res.data
      this.cityList=res.data

    })
  }
  getAllSatateMaster(data?: any) {
    this.masterservice.getAllStateMasterList().subscribe((res: any) => {
      this.checkStateList=res.data
      this.stateList=res.data
    })
  }
  getAllCountryMaster() {
    this.masterservice.getAllCountryList().subscribe((res: any) => {
      this.countryCheckList = res.data
      this.countryMasterList=res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(28).subscribe((res: any) => {
      this.bankNameList = res.data
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
  dropDownForbinding(selectedItem: any, eventTes: string) {
    debugger
    // if (eventTes == 'pincode') {
    //   let selectedPinCodeItem = this.pinCodeList?.find((item: any) => item.pincodeId === selectedItem);
    //   this.cityList = this.checkListCity?.filter((x: { cityId: any; }) => x.cityId == selectedPinCodeItem.cityId)
    //   this.ownerMasterForm.controls['cityId'].setValue('')
    // } else if (eventTes == 'cityName') {
    //   let selectedCityCodeItem = this.cityList?.find((item: any) => item.cityId === selectedItem);
    //   this.stateList = this.checkStateList?.filter((x: { stateId: any; }) => x.stateId == selectedCityCodeItem.stateId)
    //   this.ownerMasterForm.controls['stateId'].setValue('')
    // } else if (eventTes == 'stateName') {
    //   let selectedstateCodeItem = this.stateList?.find((item: any) => item.stateId === selectedItem);
    //   this.countryMasterList = this.countryCheckList?.find((x: { countryId: any; }) => x.countryId == selectedstateCodeItem?.countryId)
    //   // this.ownerMasterForm.controls['countryId'].setValue('')
    // }
    if (eventTes == 'pincode') {
      if(selectedItem?.target?.value.length>4)this.getPineCode(selectedItem?.target?.value)
      let selectedPinCodeItem = this.pinCodeList?.find((item: any) => item.pincodeId === selectedItem);
      this.cityList = this.checkListCity.filter((x: { cityId: any; }) => x?.cityId == selectedPinCodeItem?.cityId)
      this.ownerMasterForm.controls['cityId'].setValue('')
      this.ownerMasterForm.controls['countryId'].setValue('')
      this.ownerMasterForm.controls['stateId'].setValue('')
    } else if (eventTes == 'cityName') {
      let selectedCityCodeItem = this.checkListCity?.find((item: any) => item.cityId === selectedItem);
      this.stateList = this.checkStateList.filter((x: { stateId: any; }) => x?.stateId == selectedCityCodeItem?.stateId)
      this.ownerMasterForm.controls['countryId'].setValue('')
      this.ownerMasterForm.controls['stateId'].setValue('')

    } else if (eventTes == 'stateName') {
      let selectedstateCodeItem = this.checkStateList?.find((item: any) => item.stateId === selectedItem);
      this.countryMasterList = this.countryCheckList.filter((x: { countryId: any; }) => x?.countryId == selectedstateCodeItem?.countryId)
      this.ownerMasterForm.controls['countryId'].setValue('')
      this.ownerMasterForm.controls['countryId'].setValue('')
    }
  }
  onFileChancancelChqque(event: any, a: number) {
    debugger
    if (a == 1) {
      const files: FileList | null = event.target.files;
      if (files && files.length > 0) {
        this.ownerMasterForm.controls['cancelChequePath'].setValue(files.item(0)?.name || '');
        this.selectedcancelCheque = files.item(0)?.name || '';
      } else {
        this.ownerMasterForm.controls['cancelChequePath'].setValue('');
        this.selectedcancelCheque = '';
      }
    } else if (a == 2) {
      const files: FileList | null = event.target.files;
      if (files && files.length > 0) {
        this.ownerDetailForm.controls['filePath'].setValue(files.item(0)?.name || '');
        this.selected15GsubFile = files.item(0)?.name || '';
      } else {
        this.ownerDetailForm.controls['filePath'].setValue('');
        this.selected15GsubFile = '';
      }
    } else if (a == 3) {
      const files: FileList | null = event.target.files;
      if (files && files.length > 0) {
        this.ownerMasterForm.controls['panCardFilePath'].setValue(files.item(0)?.name || '');
        this.selectedPanCard = files.item(0)?.name || '';
      } else {
        this.ownerMasterForm.controls['panCardFilePath'].setValue('');
        this.selectedPanCard = '';
      }
    }
  }
  fileResetcancelCheque() {
    if (this.selectedcancelCheque != '') {
      this.selectedcancelCheque = undefined
      this.ownerMasterForm.controls['cancelChequePath'].reset()
    }
  }
  fileResetPan() {
    if (this.selectedPanCard != '') {
      this.selectedPanCard = undefined
      this.ownerMasterForm.controls['panCardFilePath'].reset()
    }
  }
  fileresetForGS() {
    if (this.selected15GsubFile != '') {
      this.selected15GsubFile = undefined
      this.ownerDetailForm.controls['filePath'].setValue('')
    }
  }
  submitOwnerD() {
    debugger
    this.submittO = true
    if (this.ownerDetailForm.invalid) {
      return
    }
    if (this.ownerDetailForm.controls['fromDate'].value > this.ownerDetailForm.controls['toDate'].value) {
      this.toastrService.warning('From Date should be not greate than To Date', 'Error-302 !');
      return
    }
    if (this.owenerDetailsId > -1) {
      this.ownerDetailForm.value['ownerDtlId'] = this.patchedAttachedData?.ownerDtlId
      this.ownerDetailForm.value['ownerId'] = this.patchedAttachedData?.ownerId
      this.ownerDetailsArray[this.owenerDetailsId] = this.ownerDetailForm.value
      this.modalService.closeModal()
      console.log(this.ownerDetailsArray)
      this.ownerDetailForm.reset()
      this.ownerDetailForm.updateValueAndValidity()
      return
    }
    // this.submittO = true
    // if (this.ownerDetailForm.invalid) {
    //   return
    // }
    this.ownerDetailsArray.push(this.ownerDetailForm.value)
    this.modalService.closeModal()
    console.log(this.ownerDetailsArray)
    this.ownerDetailForm.reset()
    this.ownerDetailsFor()
    this.ownerDetailForm.updateValueAndValidity()
  }
  removeDetails(data: any) {
    this.ownerDetailsArray.splice(data, 1)
    console.log(this.documentsList)
  }
  documentsList(documentsList: any) {
    throw new Error('Method not implemented.');
  }
  redirectionEditForOwner(data: any, model: any, index: any) {
    debugger
    this.patchedAttachedData = data
    this.owenerDetailsId = index
    // this.ownerDetailForm.controls['fromDate'].disable()
    // this.ownerDetailForm.controls['toDate'].disable()
    if (this.owenerDetailsId > -1) {
      this.modalService.modalOpenSuccess(
        model,
        popupclass.info,
        true,
        false,
        false,
        popupclass.medium
      );
      this.ownerDetailForm.patchValue(data)
      this.selected15GsubFile = data.filePath
      this.ownerDetailForm.controls['fromDate'].setValue((data.fromDate).slice(0, 10))
      this.ownerDetailForm.controls['toDate'].setValue((data.toDate).slice(0, 10))
    }
  }
  is15Submitted(data: any) {
    debugger
    if (data.target.checked) {
      this.isshowed = true
      this.selected15GsubFile = undefined
      const control = this.ownerDetailForm.get('filePath');
      control.setValidators([Validators.required])
      control.updateValueAndValidity();
    } else {
      this.isshowed = false
      const control = this.ownerDetailForm.get('filePath');
      control.clearValidators();
      control.updateValueAndValidity();
    }
  }
  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }
}
