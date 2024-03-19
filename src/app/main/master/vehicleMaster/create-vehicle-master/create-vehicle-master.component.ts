import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { vehicleMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
@Component({
  selector: 'app-create-vehicle-master',
  templateUrl: './create-vehicle-master.component.html',
  styleUrls: ['./create-vehicle-master.component.scss']
})
export class CreateVehicleMasterComponent implements OnInit {
  formMaster: any = FormGroup
  submitted = false
  vendorMasterList: any
  branchMasterList: any
  insuranceTypeList: any = []
  vehicleTypeList: any = []
  FtlTypeList: any = []
  vehicleModelList: any = []
  vehicleStatus: any = []
  insurancetypeNmaeList: any = []
  vehicleContainerList: any = []
  gpsProviderList: any = []
  loadTypeList: any = []
  floorTypeList: any = []
  vehicleMasterDetailsbyId: any = ""
  UserId: any
  selectedFileName: any = undefined
  selectedFileNameforFront: any = undefined
  selectBackFileName: any = undefined
  constructor(private formbuilder: FormBuilder, private masterservice: CountryMasterService,
    private toastrService: ToastrService,
    public routes: Router,
    public router: ActivatedRoute,
    private cs: CommonServiceService) {
    this.UserId = this.cs.login_User_Code()//for id
  }
  ngOnInit(): void {
    this.formMaster = this.formbuilder.group({
      vehicleTypeId: ['', Validators.required],
      vehicleBranchId: ['', Validators.required],//
      vehicleNo: ['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9]{5,}(?: [a-zA-Z0-9]+)*$')]],
      vehicleRegNo: ['', Validators.required],
      veicleRegDate: ['', Validators.required],
      vehicleChesisNo: ['', Validators.required],
      vehicleEngineNo: ['', Validators.required],
      vehicleFitnessValidityDate: ['', Validators.required],
      vehicleLength: [''],//
      vehicleHeight: [''],//
      vehicleUnloadingWeight: ['', Validators.required],
      vehicleWeidth: [''],//
      vehicleStatusId: ['', Validators.required],
      thcAttachedStatus: [true],
      isGpsDeviseEnabled: [true],
      vehicleFtlTypeId: ['', Validators.required],
      insuranceFromDate: ['', Validators.required],
      insuranceTypeId: ['', Validators.required],
      insuranceToDate: ['', Validators.required],
      claimStatus: [true],
      lastClaimDate: ['', Validators.required],
      vehiclePermitValidityDate: ['', Validators.required],
      noOfTyres: ['', Validators.required],
      isVehicleStatusEnabled: [true],
      vehicleContainerId: [''],//
      oldVehicleNo: [''],//
      vehiclePurchaseDate: [''],//
      insurancePartyNameId: ['', Validators.required],
      vehiclePurchaseAmount: [''],//
      vehicleSoldDate: [''],//
      vehicleSaleAmount: [''],//
      vehicleManufacturingYear: [''],//
      vehicleModelNoId: [''],//
      vehicleLoadCapacityId: ['', Validators.required],//
      vehiclePermitValidityDateFIveYears: ['', Validators.required],
      vehicleTaxValidityDate: ['', Validators.required],
      vehicleTotalRunKm: [''],//
      gpsServiceProviderId: [''],
      vehicletTrailerRegistrationNumber: ['', Validators.required],
      vehicleFloorTypeId: [''],//
      vehicleFirstTankCapacity: [''],//
      vehicleSecondTankCapacity: [''],//
      noOfTank: ['', Validators.required],
      accidentDate: [''],//
      accidentRemarks: [''],//
      vehicleAdblueTankCapacity: [''],//
      vehicleFrontPhotoFileName: [''],//
      vehicleBackPhotoFileName: [''],//
      loadInsurance: [true],
      policyAttachmentFileName: [''],//
      isVehicleActive: [true],

    })
    this.getAllVendorMasterList()
    this.getAllBranchMasterList()
    this.getAllGenDropDown()
    this.router.params.subscribe((res) => {
      debugger
      let VehicleId = res.data
      if (VehicleId) {
        this.masterservice.getvehicleDetailById(VehicleId).subscribe((res: any) => {
          this.vehicleMasterDetailsbyId = res.data[0]
          this.formMaster.patchValue(this.vehicleMasterDetailsbyId)
          this.selectedFileNameforFront = this.vehicleMasterDetailsbyId.vehicleFrontPhotoFileName==''
          this.selectedFileName = this.vehicleMasterDetailsbyId.policyAttachmentFileName
          this.selectBackFileName = this.vehicleMasterDetailsbyId.vehicleBackPhotoFileName
        })
      }
    })
  }

  get f() {
    return this.formMaster.controls
  }
  submit() {
    debugger
    this.submitted = true
    if (this.formMaster.invalid) {
      return
    }
    var vehicleMasterjson = new vehicleMaster()
    vehicleMasterjson = this.formMaster.value
    if (this.vehicleMasterDetailsbyId.vehicleDetailId == undefined) vehicleMasterjson.createdBy = +this.UserId
    else vehicleMasterjson.updatedBy = +this.UserId; vehicleMasterjson['vehicleDetailId'] = this.vehicleMasterDetailsbyId?.vehicleDetailId
    console.log(vehicleMasterjson)
    if (this.vehicleMasterDetailsbyId == "") {
      this.masterservice.createVehicleMaster(vehicleMasterjson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/vehicle-master-list']);
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
          this.toastrService.error(`${err.error.Message}`, `Staus Code-${err.status}`);
        }
      })

    } else {
      this.masterservice.updateVehicleMaster(vehicleMasterjson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/vehicle-master-list']);
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
          this.toastrService.error(`${err.error.Message}`, `Staus Code-${err.status}`);
        }
      })
    }
  }
  getAllVendorMasterList() {
    this.masterservice.getAllVendorMaster().subscribe((res: any) => {
      this.vendorMasterList = res.data
    })
  }
  getAllBranchMasterList() {
    this.masterservice.getAllBranchMasterList().subscribe((res: any) => {
      this.branchMasterList = res.data
    })
  }
  getAllGenDropDown() {
    this.masterservice.getGeneralMasterByCodeTyoeId(75).subscribe((res) => {
      if (res) this.insuranceTypeList = Object.assign(res).data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(87).subscribe((res) => {
      if (res) this.vehicleTypeList = Object.assign(res).data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(81).subscribe((res) => {
      if (res) this.FtlTypeList = Object.assign(res).data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(74).subscribe((res) => {
      if (res) this.vehicleModelList = Object.assign(res).data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(82).subscribe((res) => {
      if (res) this.vehicleStatus = Object.assign(res).data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(83).subscribe((res) => {
      if (res) this.vehicleContainerList = Object.assign(res).data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(85).subscribe((res) => {
      if (res) this.gpsProviderList = Object.assign(res).data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(62).subscribe((res) => {
      if (res) this.loadTypeList = Object.assign(res).data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(86).subscribe((res) => {
      if (res) this.floorTypeList = Object.assign(res).data
    })
    //vendor filter master
    this.masterservice.getAllVendorMaster().subscribe((res) => {
      if (res) {
        let vList = Object.assign(res).data
        this.insurancetypeNmaeList = vList.filter((x: any) => x.vendorType == 194)
      }
    })
  }
  onFileChange(event: any, switchh: any) {
    debugger
    const files: FileList | null = event.target.files;
    if (switchh == 1) {
      if (files && files.length > 0) {
        this.formMaster.controls['policyAttachmentFileName'].setValue(files.item(0)?.name || '');
        this.selectedFileName = files.item(0)?.name || '';
      } else {
        this.formMaster.controls['policyAttachmentFileName'].setValue(null);
        this.selectedFileName = '';
      }
    } else if (switchh == 2) {
      if (files && files.length > 0) {
        this.formMaster.controls['vehicleFrontPhotoFileName'].setValue(files.item(0)?.name || '');
        this.selectedFileNameforFront = files.item(0)?.name || '';
      } else {
        this.formMaster.controls['vehicleFrontPhotoFileName'].setValue(null);
        this.selectedFileNameforFront = '';
      }
    } else if (switchh == 3) {
      if (files && files.length > 0) {
        this.formMaster.controls['vehicleBackPhotoFileName'].setValue(files.item(0)?.name || '');
        this.selectBackFileName = files.item(0)?.name || '';
      } else {
        this.formMaster.controls['vehicleBackPhotoFileName'].setValue(null);
        this.selectBackFileName = '';
      }
    }
  }
  fileReset(a: any) {
    if (a == 1) {
      if (this.selectedFileName != '') {
        this.selectedFileName = undefined
        this.formMaster.controls['policyAttachmentFileName'].setValue(null);
      }
    } else if (a == 2) {
      this.selectedFileNameforFront = undefined
      this.formMaster.controls['vehicleFrontPhotoFileName'].setValue(null);
    } else if (a == 3) {
      this.selectBackFileName = undefined
      this.formMaster.controls['vehicleBackPhotoFileName'].setValue(null);
    }
  }
}
