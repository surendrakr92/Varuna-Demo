import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { popupclass } from 'src/app/models/Class/enum';
import { cngr_cnse_Master } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-new-cngr-cnge-master',
  templateUrl: './new-cngr-cnge-master.component.html',
  styleUrls: ['./new-cngr-cnge-master.component.scss']
})
export class NewCngrCngeMasterComponent implements OnInit {
  submitted!: true
  formMaster!: FormGroup;
  searchCriteria!: FormGroup;
  addressList: any = []
  addressDetailsData: any = []
  addressDetails: any = []
  indentficList: any = []
  newAddressDetails: any = []
  viewPagecom = ""
  cng_cnse_details_by_Id: any = []
  selectedFileName: any = undefined;
  countryList: any
  stateList: any
  clityList: any
  constructor(private masterservice: CountryMasterService, private formbuilder: FormBuilder, private modalService: ModalPopupService,
    private router: ActivatedRoute, private cs: CommonServiceService,
    private shared_service: SharedService,
    private routes: Router,
    private toastrService: ToastrService) {
    this.UserId = this.cs.login_User_Code()//for id
  }
  UserId: any
  ngOnInit(): void {
    this.formMaster = this.formbuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)]],
      phoneNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      emailId: ['', [Validators.email]],
      identificationTypeId: ['', Validators.required],
      identificationFilePath: [''],//removed
      docNumber: [''],
      isActive: true,
    })
    this.searchCriteria = this.formbuilder.group({
      countryId: [''],
      stateId: [''],
      cityId: [''],
      pincode: [''],
    })
    this.dropDownMaster()
    this.router.params.subscribe((res) => {
      debugger
      let cngcnsId = res.data || res.viewData
      if (res.data) this.viewPagecom = "edit"
      if (res.viewData) this.viewPagecom = "view"
      if (cngcnsId) {
        this.masterservice.get_Cngr_Cnse_ById(cngcnsId).subscribe((res: any) => {
          this.cng_cnse_details_by_Id = res.data
          debugger
          this.formMaster.patchValue(res.data[0])
          this.selectedFileName = this.cng_cnse_details_by_Id[0].identificationFilePath
          this.newAddressDetails = res.data[0]?.addressMap
          console.log('checkkkkk..' + this.newAddressDetails)
          this.handleFIleValidation()
        })
      }
    })
  }
  get f() {
    return this.formMaster.controls;
  }
  dropDownMaster() {
    this.masterservice.getAllAddressMaster().subscribe((res: any) => {
      this.addressList = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(165).subscribe((res) => {
      this.indentficList = Object.assign(res).data
    })
    this.masterservice.getAllCountryList().subscribe((res: any) => {
      this.countryList = res.data
    })
    this.masterservice.getAllStateMasterList().subscribe((res: any) => {
      this.stateList = res.data
    })
    this.masterservice.getAllCityMasterList().subscribe((res: any) => {
      this.clityList = res.data
    })
  }
  searchCriteriaDe() {
    this.masterservice.getaddressbyqueryperm(this.searchCriteria.value).subscribe((rs: any) => {
      console.log(rs)
      if (rs.succeeded) {
        this.addressDetails = rs.data
      }
    })
  }
  onFileChange(event: any) {
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      this.formMaster.controls["identificationFilePath"].setValue(
        files.item(0)?.name || ""
      );
      this.selectedFileName = files.item(0)?.name || "";
    } else {
      this.formMaster.controls["identificationFilePath"].setValue(null);
      this.selectedFileName = "";
    }
  }
  fileReset() {
    if (this.selectedFileName != "") {
      this.selectedFileName = undefined;
      this.formMaster.controls["identificationFilePath"].setValue("");
    }
  }
  OnSubmit() {
    debugger
    this.submitted = true;
    if (this.formMaster.invalid) {
      return
    }
    var json: any = new cngr_cnse_Master
    json = this.formMaster.value
    json['addressMap'] = this.newAddressDetails
    if (this.cng_cnse_details_by_Id[0]?.consiConseId == undefined) { json.createdBy = +this.UserId }
    else { json.updatedBy = +this.UserId; json['consiConseId'] = this.cng_cnse_details_by_Id[0]?.consiConseId }
    console.log(json)
    if (this.cng_cnse_details_by_Id == "") {
      this.masterservice.create_Cngr_Cnse_Master(json).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/cngr-cnge-master']);
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
      this.masterservice.update_Cngr_Cnse_Master(json).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/cngr-cnge-master']);
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
  download_pdf_print() {
    let element_id = "viewData_information"
    this.shared_service.print_file_to_pdf(element_id).subscribe((rs) => {
    })
  }
  modelOpen(model: any) {
    debugger
    this.addressDetailsData = []
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.extralarge
    )
  }
  changeSavedAddressDetals(ev: any, index: any) {
    debugger;
    if (ev) {
      if (
        this.addressDetailsData.find(
          (x: any) => x == ev
        )
      ) {
        this.addressDetailsData.splice(index, 1);
      } else {
        this.addressDetailsData.push(ev);
      }
    }
  }
  submissionADd() {
    debugger;
    if (this.addressDetailsData.length == 0) {
      alert('Please add at least one address details')
    } else {
      this.newAddressDetails = this.newAddressDetails.concat(this.addressDetailsData)
      console.log(this.newAddressDetails)
      this.modalService.closeModal()
    }
  }
  handleFIleValidation(){
    if(this.formMaster.controls['identificationTypeId'].value===1821){
      this.formMaster.controls["docNumber"].setValidators([Validators.required,Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]);
      this.formMaster.controls["docNumber"].updateValueAndValidity();
  }else {
    this.formMaster.controls["docNumber"].setValidators([Validators.required,Validators.pattern(/^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/)]);
    this.formMaster.controls["docNumber"].updateValueAndValidity();
  }
}
}