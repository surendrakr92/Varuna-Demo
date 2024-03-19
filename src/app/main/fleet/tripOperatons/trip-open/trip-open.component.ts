import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { popupclass } from "src/app/models/Class/enum";
import { CommonServiceService } from "src/app/services/commonService/common-service.service";
import { CountryMasterService } from "src/app/services/master-service/country-master.service";
import { CustomerMasterServiceService } from "src/app/services/master-service/customer-master-service.service";
import { FleetService } from "src/app/services/master-service/fleet.service";
import { ModalPopupService } from "src/app/services/modalServices/modal-popup.service";

@Component({
  selector: "app-trip-open",
  templateUrl: "./trip-open.component.html",
  styleUrls: ["./trip-open.component.scss"],
})
export class TripOpenComponent implements OnInit {
  formMaster!: FormGroup;
  submitted = false;
  cityList: any;
  vehicleList: any;
  driverMasterList: any;
  customerMasyterList: any;
  routeMasterList: any;
  showControl: boolean = false;
  showControl2: any = "";
  branchMasterList: any;
  totalItems: number = 5; // Initialize total items
  searchD: any = "";
  itemsPerPage: number = 5;
  responceData:any
  p: number = 1;
  constructor(
    private formbuilder: FormBuilder,
    private modalService: ModalPopupService,
    private masterService: CountryMasterService,
    private customerMaster: CustomerMasterServiceService,
    private cs: CommonServiceService,
    private fleetServ: FleetService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.formControl();
    this.getAllDropDownList();
  }

  formControl() {
    this.formMaster = this.formbuilder.group({
      vslipDate: ["", Validators.required],
      manualVslipNo: [""],
      vehicleId: ["", Validators.required],
      vslipStartLocId: [this.cs.login_UserBranchId()],
      vslipEndLocId: [this.cs.login_UserCurrBranchId()],
      branchId:[this.cs.login_UserCurrBranchId()],
      firstDriverId: ["", Validators.required],
      secondDriverId: [""],
      startKm: ["", Validators.required],
      marketOwnId: [""],//Validators.required
      categoryId: ["", Validators.required],
      custId: [""],
      routeId: [null],
      fromCityId: [null],//Validators.required
      toCityId: [null],//Validators.required
      transitTime: [""],
      isDriverReportingTimely: ["", Validators.required],
      docketId: [""],
      inTransitThcId: [null],
      category: [""],
      addressLine1: [""],
      driverLicenseNo: [""],
      driverName: [""],
      licensenoValidityDate: [""],
      driverStatusId: [""],
      driverLicenseNo1: [""],
      driverName2: [""],
      licensenoValidityDate2: [""],
      driverStatusId2: [""],
      splitTHC:[false],
      firstDriver:[''],
      secondDriver:[''],
      vehicleNo:[''],
      isActive:[true],
      routeSelctionId:[null,Validators.required],
      startDate:[new Date().toISOString().slice(0, 10)]
    });
  }
  get f() {
    return this.formMaster.controls;
  }
  OnSubmit(model:any) {
    this.submitted = true;
    if (this.formMaster.invalid) {
      return;
    }
    var tripJson: any = {}
    tripJson = this.formMaster.value
    tripJson['fleetTripInTransitOpening'] = {
      "docketId": this.formMaster.controls['docketId'].value,
      "inTransitThcId": this.formMaster.controls['inTransitThcId'].value
    }
    tripJson['thcTripIntransitStatus'] = {
      "thcId": 0,
      "newVslipId": 0,
      "vslipCloseDate": "2024-01-31T05:11:58.725Z",
      "vslipCloseBy": 0,
      "vslipGenDate": "2024-01-31T05:11:58.725Z",
      "vslipGenBy": 0,
      "isThcVslipTransit": true
    }
    tripJson['createdBy'] = this.cs.login_User_Code()
    console.log(tripJson)

    this.fleetServ.newTripOpen(tripJson).subscribe((result:any) => {
  if(result.succeeded){
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.small 
    ) 
    this.responceData=result.data
    this.formMaster.reset()
    this.submitted = false
  }
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
        this.toastrService.error(err.error.Message, `Error status:${err.status}`);
      }
    })


  }
  DriverReportingTimely = [
    { Id: 1, type: true },
    { Id: 2, type: false },
  ];
  CategoryList = [
    { Id: 1, type: "External Usage " },
    { Id: 2, type: "Internal Usage " },
  ];
  routeList = [
    { Id: "1", type: "City Based" },
    { Id: "2", type: "Route Based" },
  ];
  getAllDropDownList() {
    this.masterService.getAllCityMasterList().subscribe((res: any) => {
      this.cityList = res.data;
    });
    this.masterService.getAllVehicleMaster().subscribe((res: any) => {
      this.vehicleList = res.data;
    });
    this.masterService.getAllDriverMaster().subscribe((res: any) => {
      this.driverMasterList = res.data;
    });
    this.customerMaster.getAllCustomerMaster().subscribe((res: any) => {
      this.customerMasyterList = res.data;
    });
    this.masterService.getAllBranchMasterList().subscribe((res: any) => {
      this.branchMasterList = res.data
    });

    let data = {
      cityId: 0,
      pageNumber: this.p,
      pageSize: this.itemsPerPage,
      fromcity: this.searchD,
      tocity: this.searchD,
    };
  }
  eventChange(event: any) {
    this.formMaster.controls["driverLicenseNo"].setValue(event.driverLicenseNo);
    this.formMaster.controls["firstDriverId"].setValue(event.driverId);
    this.formMaster.controls["firstDriver"].setValue(event.manualDriverCode);
    this.formMaster.controls["driverName"].setValue(event.driverName);
    this.formMaster.controls["licensenoValidityDate"].setValue(
      event.licensenoValidityDate
    );
    this.formMaster.controls["driverStatusId"].setValue(event.driverStatusId);
  }
  keyup(data: any) {
    this.formMaster.controls["driverLicenseNo1"].setValue(data.driverLicenseNo);
    this.formMaster.controls["secondDriverId"].setValue(data.driverId);
    this.formMaster.controls["secondDriver"].setValue(data.manualDriverCode);
    this.formMaster.controls["driverName2"].setValue(data.driverName);
    this.formMaster.controls["licensenoValidityDate2"].setValue(
      data.licensenoValidityDate
    );
    this.formMaster.controls["driverStatusId2"].setValue(data.driverStatusId);
    console.log(data);
  }

  modelOpen(model: any) {
    debugger;
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.small
    );
  }
  modelOpen2(model: any) {
    debugger;
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.small
    );
  }
  ownList = [{ Id: 1, type: "Own" }];
  categorySetup(ev: number) {
    const resetForm = [
      "custId",
      "marketOwnId"
    ]
    resetForm.forEach(controlName => {
      const control: any = this.formMaster.get(controlName);
      control.clearValidators();
      control.updateValueAndValidity();
    });
    if (ev == 1) {
      debugger
      const control: any = this.formMaster.get("custId");
      control.setValidators([Validators.required]);
      control.updateValueAndValidity();
    } else {
      const control: any = this.formMaster.get("marketOwnId");
      control.setValidators([Validators.required]);
      control.updateValueAndValidity();
    }
  }
  routeSetupForm(ev: number) {
    const resetForm = [
      "fromCityId",
      "toCityId",
      "routeId"
    ]
    resetForm.forEach(controlName => {
      const control: any = this.formMaster.get(controlName);
      control.clearValidators();
      control.updateValueAndValidity();
    });
    if (ev == 1) {
      const control = [
        "fromCityId",
        "toCityId",
      ]
      control.forEach(controlName => {
        const control: any = this.formMaster.get(controlName);
        control.setValidators([Validators.required]);
        control.updateValueAndValidity();
      });
    } else {
      const control: any = this.formMaster.get("routeId");
      control.setValidators([Validators.required]);
      control.updateValueAndValidity();
    }
  }
  vhClNo(ev:any){
    debugger
  const vhNo=this.vehicleList.filter((x: { vehicleDetailId: any; })=>x.vehicleDetailId==ev)
  this.formMaster.controls['vehicleNo'].setValue(vhNo[0].vehicleNo)
  }
  getRouteMaster(textSearchFrom: any, textSearchCity: any, cond: any) {
    let data = {
      routeId: 0,
      pageNumber: 0, // Use this.p for page number
      pageSize: 0,
      fromcity: textSearchFrom,
      tocity: textSearchCity
    };
    this.masterService.getAllRouteMaster(data).subscribe((res: any) => {
      if (cond == 'fromCityId') this.routeMasterList = res.data;
      else this.routeMasterList = res.data;

    });
  }
  setUpJsonStructK(value: any, cond: string) {
    this.getRouteMaster(value?.target?.value, '', cond)
  }
  setUpJsonStruct(value: any, cond: string) {
    debugger
   this.formMaster.controls['routeId'].setValue(value)
  }



  modelOpen3(model: any) {
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
}
