import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { driverMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';
import { validateDateOfBirth } from 'src/app/shared/validatiors/dateDobValidation';
@Component({
  selector: 'app-create-driver-master',
  templateUrl: './create-driver-master.component.html',
  styleUrls: ['./create-driver-master.component.scss']
})
export class CreateDriverMasterComponent implements OnInit {
  constructor(private formbuilder: FormBuilder,
    private routes: ActivatedRoute, private router: Router,
    private cs: CommonServiceService,
    private toastrService: ToastrService,
    private test_service: SharedService,
    public masterservice: CountryMasterService) {
    this.UserId = this.cs.login_User_Code()//for id
  }
  driverMasterForm!: FormGroup;
  UserId: any
  viewPagecom = ""
  submitted = false
  handlinf:any=true
  qualificationlist: any = []
  maritalList: any = []
  religionList: any = []
  ethnicityList: any = []
  blood_group_lists: any = []
  payment_mode_list: any = []
  trainig_grade_list: any = []
  state_master_list: any = []
  category_list: any = []
  driverDetailsById: any = ""
  branch_master_List: any = []
  driver_master_status_list: any = []
  driver_master_document_type_list: any = []
  file_view_section: any = ''
  selectedFileName: any = undefined
  selectedDriversDocuments: any = undefined
  driverDetailsID: any = 0
  patchedAttachedData: any = ""
  owenerDetailsId = -1
  // @ViewChild('fileInput') fileInput: any;
  minDatePast: any = new Date().toISOString().slice(0, 10)
  ngOnInit(): void {

    this.formValidation()
    this.masterApi_s()
    this.routes.params.subscribe((res) => {
      debugger
      let stateMasterId = res.data || res.viewData
      if (res.data) this.viewPagecom = "edit"
      if (res.viewData) this.viewPagecom = "view"
      if (stateMasterId) {
        if (sessionStorage.getItem('finalSubmision')) {
          this.masterservice.getDriverMasterById(stateMasterId).subscribe((res: any) => {
            this.driverDetailsById = res.data[0]
            this.driverMasterForm.patchValue(res.data[0])
            this.selectedFileName = res.data?.driverRegistrationFile
            if (this.driverDetailsById.isRegistered == true && this.driverDetailsById.driverRegistrationFile != '') {
              // this.driverMasterForm.disable()
              this.makeFormReadOnly()
              this.driverMasterForm.controls['buddyName'].enable()
              this.driverMasterForm.controls['buddyContactNo'].enable()
              this.driverMasterForm.controls['buddyCode'].enable()
              this.driverMasterForm.controls['isDriverActive'].enable()
              this.driverMasterForm.controls['docTypeId'].enable()
              this.driverMasterForm.controls['documentPath'].enable()
              this.selectedDriversDocuments = 'exist'
              this.documentsList = this.driverDetailsById?.driverDetails
            }
          })
        } else {
          this.masterservice.getDriverById(stateMasterId).subscribe((res: any) => {
            this.driverDetailsById = res.data
            this.driverMasterForm.patchValue(res.data)
            this.selectedFileName = res.data?.driverRegistrationFile ?res.data?.driverRegistrationFile :undefined
            if (this.driverDetailsById.isRegistered == true && this.driverDetailsById.driverRegistrationFile != '') {
              // this.driverMasterForm.disable()
              this.makeFormReadOnly()
              this.driverMasterForm.controls['buddyName'].enable()
              this.driverMasterForm.controls['buddyContactNo'].enable()
              this.driverMasterForm.controls['buddyCode'].enable()
              this.driverMasterForm.controls['isDriverActive'].enable()
              this.driverMasterForm.controls['docTypeId'].enable()
              this.driverMasterForm.controls['documentPath'].enable()
            }
          })
        }

      }
    })
  }
  formValidation() {
    this.driverMasterForm = this.formbuilder.group({
      manualDriverCode: ['', [Validators.required, Validators.pattern('^(?! )[0-9]{4,}(?: [0-9]+)*$')]],
      driverName: ['', [Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)]],
      driverDob: ['', [Validators.required], [validateDateOfBirth.bind(this)]],
      driverWhatsappNo: ['', [ Validators.pattern('^[0-9()+\\-\\s]*$')]],
      driverMobileNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      driverQualificationId: ['', Validators.required],
      driverMaritalStatusId: ['', Validators.required],
      driverReligionId: ['', Validators.required],
      driverEthnicityId: ['', Validators.required],
      driverFatherName: ['', [Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)]],
      driverMotherName: ['', [Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)]],
      driverNeighbourContactNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      driverFamilyContactNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      driverGuardianName: ['', [Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)]],
      driverLocationId: ['', Validators.required],
      driverGuardianContactNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      driverPervillageName: ['', [Validators.required, Validators.pattern(/^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/)]],
      driverPerCityName: ['', [Validators.required, Validators.pattern(/^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/)]],
      driverPerAddress: ['', Validators.required],
      driverPerpostName: ['', [Validators.required, Validators.pattern(/^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/)]],
      driverPerthesilName: ['', [Validators.required, Validators.pattern(/^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/)]],
      driverPerdistrict: ['', [Validators.required, Validators.pattern(/^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/)]],
      driverPerthanaName: ['', [Validators.required, Validators.pattern(/^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/)]],
      driverCurCityName: ['', [Validators.required, Validators.pattern(/^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/)]],
      driverCurPostName: ['', [Validators.required, Validators.pattern(/^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/)]],
      driverCurVillageName: ['', [Validators.required, Validators.pattern(/^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/)]],
      driverCurThanaName: ['', [Validators.required, Validators.pattern(/^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/)]],
      driverCurThesilName: ['', [Validators.required, Validators.pattern(/^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/)]],
      driverCurDistrict: ['', [Validators.required, Validators.pattern(/^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/)]],
      isAddressVerificationStatus: [false],
      isDriverActive: [true],
      driverLicenseNo: ['', [Validators.required]],
      addressVerifiedBy: ['', [ Validators.pattern(/^[a-z ,.'-]+$/i)]],
      islicensenoVerified: [true],
      licensenoValidityDate: ['', Validators.required],
      licensenoInitialIssueDate: ['', Validators.required],
      licensenoCurrentIssueDate: ['', Validators.required],
      licensenoIssueByRto: ['', [Validators.required]],//, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
      licensenoVerificationDate: ['', Validators.required],
      hmvIssueDate: ['', Validators.required],
      hmvExpiryDate: ['', Validators.required],
      aadharVerificationDate: ['', Validators.required],
      isVerifiedAadhar: [true],
      driverAadharNo: ['', [Validators.required, Validators.pattern(/^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/)]],
      driverRejoiningDate: [''],
      driverPanNo: ['', [Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      driverPaymentModeId: ['', Validators.required],
      driverBloodGroupId: ['', Validators.required],
      driverNomineeName: ['', [Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)]],
      driverCategoryId: ['', Validators.required],
      driverGuarantorName: ['', [Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)]],
      driverVerificationStatus: [true],
      remarks: [''],
      driverTrainingStatus: [true],
      driverTrainingDate: [''],
      driverTrainingGradeId: [''],
      isVarunaNextAppInstalled: [true],
      driverPerpin: ['', [Validators.required, Validators.pattern("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$")]],
      driverPerStateId: ['', Validators.required],
      driverCurPin: ['', [Validators.required, Validators.pattern("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$")]],
      driverCurAddress: ['', Validators.required],
      driverCurStateId: ['', Validators.required],
     driverStatusId: [''],//from hidden class By Satish And Amit
      isRegistered: [false],
      driverPhotoFile: ['', Validators.required],
      driverRegistrationFile: [''],//changes on requirement driver
      isAddressSame: [false],//updated...//finalsubmissiondetails
      buddyName: ['', [Validators.pattern('^(?! )[a-zA-Z0-9]{5,}(?: [a-zA-Z0-9]+)*$')]],
      buddyContactNo: ['', Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      buddyCode: ['', Validators.pattern('^(?! )[a-zA-Z0-9]{5,}(?: [a-zA-Z0-9]+)*$')],
      docTypeId: [''],//secondjson
      documentPath: ['']//secondjson
    })
  }
  masterApi_s() {
    this.masterservice.getGeneralMasterByCodeTyoeId(25).subscribe((res) => {
      this.qualificationlist = Object.assign(res).data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(24).subscribe((res) => {
      this.maritalList = Object.assign(res).data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(26).subscribe((res) => {
      this.religionList = Object.assign(res).data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(15).subscribe((res) => {
      this.ethnicityList = Object.assign(res).data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(41).subscribe((res) => {
      this.blood_group_lists = Object.assign(res).data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(42).subscribe((res) => {
      this.payment_mode_list = Object.assign(res).data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(43).subscribe((res) => {
      this.trainig_grade_list = Object.assign(res).data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(44).subscribe((res) => {
      this.category_list = Object.assign(res).data
    })
    this.masterservice.getAllStateMasterList().subscribe((res: any) => {
      this.state_master_list = res.data;
    })
    this.masterservice.getAllBranchMasterList().subscribe((res: any) => {
      this.branch_master_List = res.data


    })
    this.masterservice.getGeneralMasterByCodeTyoeId(45).subscribe((res) => {
      this.driver_master_status_list = Object.assign(res).data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(53).subscribe((res) => {
      this.driver_master_document_type_list = Object.assign(res).data
    })
  }
  get f() {
    return this.driverMasterForm.controls;
  }
  onsubmit() {
    debugger
    this.submitted = true
    if (this.driverMasterForm.invalid) return
    var driverJson = new driverMaster()
    driverJson = this.driverMasterForm.value
    if (this.driverDetailsById.driverId == undefined) { driverJson.createdBy = +this.UserId }
    else if (this.driverDetailsById.isRegistered == true && this.driverDetailsById.driverRegistrationFile != '') {
      driverJson = this.driverMasterForm.getRawValue()
      driverJson.updatedBy = +this.UserId; driverJson.driverId = this.driverDetailsById.driverId
    }
    else {
      driverJson.updatedBy = +this.UserId; driverJson.driverId = this.driverDetailsById.driverId
    }
    console.log(driverJson)
    if (this.driverDetailsById == "") {
      this.masterservice.createDriverMaster(driverJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.router.navigate(['/master/driver-master'])
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.driverMasterForm.get(err.error.Errors[prop]?.PropertyName);
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

    }
    else if (this.driverDetailsById.isRegistered == true && this.driverDetailsById.driverRegistrationFile != '') {
      debugger
      // alert('final upload json')
      // driverJson=this.driverDetailsById
      driverJson.driverDetail = (this.documentsList)
      console.log(driverJson)
      this.masterservice.updateDriverMasterFinalJson(driverJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.router.navigate(['/master/driver-master'])
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.driverMasterForm.get(err.error.Errors[prop]?.PropertyName);
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
    }
    else {
      this.masterservice.updateDriverMaster(driverJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.router.navigate(['/master/driver-master'])
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.driverMasterForm.get(err.error.Errors[prop]?.PropertyName);
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
    }
  }
  checForAddressPatch(data: any) {
    debugger
    if (data?.checked) {
      this.driverMasterForm['controls'].driverCurCityName?.setValue(this.driverMasterForm['controls'].driverPerCityName.value)
      this.driverMasterForm['controls'].driverCurVillageName?.setValue(this.driverMasterForm['controls'].driverPervillageName.value)
      this.driverMasterForm['controls'].driverCurPostName?.setValue(this.driverMasterForm['controls'].driverPerpostName.value)
      this.driverMasterForm['controls'].driverCurThanaName?.setValue(this.driverMasterForm['controls'].driverPerthanaName.value)
      this.driverMasterForm['controls'].driverCurThesilName?.setValue(this.driverMasterForm['controls'].driverPerthesilName.value)
      this.driverMasterForm['controls'].driverCurAddress?.setValue(this.driverMasterForm['controls'].driverPerAddress.value)
      this.driverMasterForm['controls'].driverCurDistrict?.setValue(this.driverMasterForm['controls'].driverPerdistrict.value)
      this.driverMasterForm['controls'].driverCurPin?.setValue(this.driverMasterForm['controls'].driverPerpin.value)
      this.driverMasterForm['controls'].driverCurStateId?.setValue(this.driverMasterForm['controls'].driverPerStateId.value)

    } else {
      this.driverMasterForm['controls'].driverCurCityName?.setValue('')
      this.driverMasterForm['controls'].driverCurVillageName?.setValue('')
      this.driverMasterForm['controls'].driverCurPostName?.setValue('')
      this.driverMasterForm['controls'].driverCurThesilName?.setValue('')
      this.driverMasterForm['controls'].driverCurThanaName?.setValue('')
      this.driverMasterForm['controls'].driverCurDistrict?.setValue('')
      this.driverMasterForm['controls'].driverCurPin?.setValue('')
      this.driverMasterForm['controls'].driverCurStateId?.setValue('')
      this.driverMasterForm['controls'].driverCurAddress?.setValue('')


    }

  }
  // ..upload file /
  // https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg
  imageUrl: any =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhynLjCBXo1K0adX0xaT9YydgIP125g-ekGlZ9ZamWVA&s';
  editFile: boolean = true;
  removeUpload: boolean = false;

  uploadFile(event: any) {
    debugger
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      // this.Authentication.updateProfileImage(file).subscribe((results: any) => {
      //   this.imageUrl = results?.imagesUrl;
      this.imageUrl = event.target.files //testt
      this.driverMasterForm.controls['driverPhotoFile'].setValue('testtt');
      // });
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        // this.ProfileForm.controls['profilePic'].setValue(this.imageUrl);
        this.editFile = false;
        this.removeUpload = true;
      };
    }
    this.submitted = false;
  }
  download_pdf_print() {
    let elementId = 'viewData_information'
    this.test_service.print_file_to_pdf(elementId).subscribe((res: any) => {

    })
  }
  onFileChange(event: any) {
    debugger
    // const files: FileList | null = event.target.files;
    // if (files.length > 0) {
    // this.driverMasterForm.controls['driverRegistrationFile'].setValue(files.item(0));
    //   this.selectedFileName = files.item(0).name;
    // } else {
    //   this.driverMasterForm.controls['driverRegistrationFile'].setValue(null);
    //   this.selectedFileName = '';
    // }
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      this.driverMasterForm.controls['driverRegistrationFile'].setValue(files.item(0)?.name || '');
      this.selectedFileName = files.item(0)?.name || '';
    } else {
      this.driverMasterForm.controls['driverRegistrationFile'].setValue('');
      this.selectedFileName = '';
    }
  }
  fileReset() {
    if (this.selectedFileName != '') {
      this.selectedFileName = undefined
      this.driverMasterForm.controls['driverRegistrationFile'].setValue('');
    }
  }
  resetForm() {
    if (this.driverDetailsById == '') {
      this.driverMasterForm.reset()
    } else {
      this.toastrService.error('Not able to reset form in edit mode', 'Error 400');
    }
  }
  document_updation(data: any) {
    debugger
    if (data == 232) this.file_view_section = 'Driver Id Photo'
    else if (data == 234) this.file_view_section = 'Driver Licence'
    else if (data == 233) this.file_view_section = 'Driver Photo'
    else if (data == 235) this.file_view_section = 'Driver Registeration File'
    else if (data == 239) this.file_view_section = 'Driver Voter Card'
    else if (data == 240) this.file_view_section = 'Driver Pan Card Data'
  }
  documentsList: any = []
  onFileChangeForDocument(event: any) {
    debugger
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      // this.driverMasterForm.controls['driverRegistrationFile'].setValue(files.item(0)?.name || '');
      this.selectedDriversDocuments = files.item(0)?.name || '';
      // this.documentsList.push({
      //   // "driverDetailId": 0,
      //   "driverId": this.driverDetailsById.driverId,
      //   "driverDocumentType": this.file_view_section,
      //   "docTypeId": this.driverMasterForm.controls['docTypeId'].value,
      //   "documentPath": this.selectedDriversDocuments,
      //   "updatedBy": this.UserId
      //   // "codeId": 0

      // })
      console.log(this.documentsList)
      //  this.driverMasterForm.controls['documentPath'].reset()
    }
    else {
      // this.driverMasterForm.controls['driverRegistrationFile'].setValue(null);
      this.selectedDriversDocuments = '';
    }
    // this.fileInput.nativeElement.value = '';
  }
  addDocumentDetails() {
    debugger
    if (this.owenerDetailsId == -1) {
      if (this.driverMasterForm.controls['docTypeId'].value == 232 && this.documentsList?.some((x: any) => x?.docTypeId == 232)) {
        this.toastrService.warning('Not aplicable to upload multiple file for Driver Id Photo', 'Error 302'); return
      }
      else if (this.driverMasterForm.controls['docTypeId'].value == 233 && this.documentsList?.some((x: any) => x?.docTypeId == 233)) {
        this.toastrService.warning('Not aplicable to upload multiple file for Driver Photo', 'Error 302'); return
      }
      else if (this.driverMasterForm.controls['docTypeId'].value == 234 && this.documentsList?.some((x: any) => x?.docTypeId == 234)) {
        this.toastrService.warning('Not aplicable to upload multiple file for Driver Licence', 'Error 302'); return
      }
      else if (this.driverMasterForm.controls['docTypeId'].value == 240 && this.documentsList?.some((x: any) => x?.docTypeId == 240)) {
        this.toastrService.warning('Not aplicable to upload multiple file for Driver Pan Card Data', 'Error 302'); return
      }
      else if (this.driverMasterForm.controls['docTypeId'].value == 239 && this.documentsList?.some((x: any) => x?.docTypeId == 239)) {
        this.toastrService.warning('Not aplicable to upload multiple file for Driver Voter Card', 'Error 302'); return
      }
      else if (this.driverMasterForm.controls['docTypeId'].value == 235 && this.documentsList?.some((x: any) => x?.docTypeId == 235)) {
        this.toastrService.warning('Not aplicable to upload multiple file for Driver Refgistration File', 'Error 302'); return
      }
      else if (this.driverMasterForm.controls['docTypeId'].value == '' || this.driverMasterForm.controls['documentPath'].value == '') {
        this.toastrService.warning('select drop down ', 'Error 404'); return

      }
      this.documentsList.push({
        // "driverDetailId": 0,
        "driverId": this.driverDetailsById.driverId,
        "driverDocumentType": this.file_view_section,
        "docTypeId": this.driverMasterForm.controls['docTypeId'].value,
        "documentPath": this.selectedDriversDocuments,
        "updatedBy": this.UserId
        // "codeId": 0

      })
    }
    else if (this.owenerDetailsId > -1) {
      let documentsList = {
        "driverDetailId": this.patchedAttachedData?.driverDetailId,
        "driverId": this.driverDetailsById.driverId,
        "driverDocumentType": this.patchedAttachedData?.driverDocumentType,
        "docTypeId": this.patchedAttachedData.docTypeId,
        "documentPath": this.selectedDriversDocuments,
        "updatedBy": this.UserId
        // "codeId": 0

      }
      this.documentsList[this.owenerDetailsId] = documentsList
      this.driverMasterForm.controls['docTypeId'].setValue('')
      this.patchedAttachedData = ""
      this.owenerDetailsId = -1
      return
    }

  }
  driverDocumentDelete(data: any, dataFroFile: any) {
    debugger;
    this.driverDetailsID = dataFroFile?.driverDetailId
    this.documentsList.splice(data, 1)
    console.log(this.documentsList)
  }
  makeFormReadOnly() {
    Object.keys(this.driverMasterForm.controls).forEach(controlName => {
      const control = this.driverMasterForm.get(controlName) as FormControl;
      control.disable();
    });
  }
  redirectionToEdit(data: any, index: any) {
    debugger
    this.patchedAttachedData = data
    this.owenerDetailsId = index
    this.driverMasterForm.controls['docTypeId'].setValue(data?.docTypeId)
    this.driverMasterForm.controls['documentPath'].setValue(data?.documentPath)
  }

  addressHandliung(){
this.handlinf= !this.handlinf
  }
 }
