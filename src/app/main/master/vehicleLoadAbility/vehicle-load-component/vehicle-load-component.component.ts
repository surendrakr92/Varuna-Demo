import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { popupclass } from "src/app/models/Class/enum";
import { CommonServiceService } from "src/app/services/commonService/common-service.service";
import { CountryMasterService } from "src/app/services/master-service/country-master.service";
import { EventMasterService } from "src/app/services/master-service/event-master.service";
import { ModalPopupService } from "src/app/services/modalServices/modal-popup.service";
import * as XLSX from "xlsx";
@Component({
  selector: "app-vehicle-load-component",
  templateUrl: "./vehicle-load-component.component.html",
  styleUrls: ["./vehicle-load-component.component.scss"],
})
export class VehicleLoadComponentComponent implements OnInit {
  vehicleLoadTypeList: any = [];
  UserId: any;
  vehicleLoadAbility!: FormGroup;
  submitted = false;
  vehicleTypeIdList: any = [];
  loadabilityIdList: any = [];
  vehicleLoadTypeAbility: any = "";
  constructor(
    private cs: CommonServiceService,
    private modalService: ModalPopupService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private evService: EventMasterService,
    private ms: CountryMasterService
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
    this.vehicleLoadAbility = this.fb.group({
      vehicleTypeId: ["", Validators.required],
      loadabilityId: ["", Validators.required],
      isActive: [true, Validators.required],
    });
    this.getVehicleLoadAbility();
    this.getDropDown();
  }
  get f() {
    return this.vehicleLoadAbility.controls;
  }
  getVehicleLoadAbility() {
    this.evService.getAllVehicleLoadability().subscribe((res: any) => {
      if (res) this.vehicleLoadTypeList = res.data;
      this.dtTrigger.next(null);
    });
  }
  downloadExcel() {
    let fileName = "vehicleLoadTypeList.xLsx";
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.vehicleLoadTypeList
    );
    Object.keys(ws).forEach((key) => {
      if (ws[key].v === "Action") {
        delete ws[key];
      }
    });
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    /* save to file */
    XLSX.writeFile(wb, fileName);
  }
  modelOpen(model: any, popCond: any) {
    debugger;
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.medium
    );
    if (popCond == "createW") {
      this.vehicleLoadAbility.reset();
      this.vehicleLoadTypeAbility = "";
    } else
      this.evService
        .getVehicleLoadAbilityById(popCond)
        .subscribe((res: any) => {
          if (res) {
            this.vehicleLoadTypeAbility = res.data[0];
            this.vehicleLoadAbility.patchValue(this.vehicleLoadTypeAbility);
          }
        });
  }
  submitClaimTDetails() {
    debugger;
    this.submitted = true;
    if (this.vehicleLoadAbility.invalid) return;
    var vehicleLoadTYpeJson: any;
    vehicleLoadTYpeJson = this.vehicleLoadAbility.value;
    if (this.vehicleLoadTypeAbility.detailId == undefined) {
      vehicleLoadTYpeJson.createdBy = +this.UserId;
    } else {
      vehicleLoadTYpeJson.updatedBy = +this.UserId;
      vehicleLoadTYpeJson.detailId = this.vehicleLoadTypeAbility.detailId;
    }
    console.log(vehicleLoadTYpeJson);
    if (this.vehicleLoadTypeAbility == "") {
      this.evService.createVehicleLoadAbility(vehicleLoadTYpeJson).subscribe(
        (result) => {
          this.toastrService.success("succesfully Created !", "Success-200 !");
          this.modalService.closeModal();
          $("#MyTable").DataTable().destroy();
          this.getVehicleLoadAbility();
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 422) {
              debugger;
              Object.keys(err.error.Errors).forEach((prop: any) => {
                const formControl = this.vehicleLoadAbility.get(
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
              `Error statu:${err.status}`
            );
          }
        }
      );
    } else {
      this.evService.editVehicleLoadAbility(vehicleLoadTYpeJson).subscribe(
        (result) => {
          this.toastrService.success("succesfully Updated !", "Success-200 !");
          this.modalService.closeModal();
          $("#MyTable").DataTable().destroy();
          this.getVehicleLoadAbility();
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 422) {
              debugger;
              Object.keys(err.error.Errors).forEach((prop: any) => {
                const formControl = this.vehicleLoadAbility.get(
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
              `Error statu:${err.status}`
            );
          }
        }
      );
    }
  }
  getDropDown() {
    this.ms
      .getGeneralMasterByCodeTyoeId(91)
      .subscribe((res: any) => (this.vehicleTypeIdList = res.data));
    this.ms
      .getGeneralMasterByCodeTyoeId(92)
      .subscribe((res: any) => (this.loadabilityIdList = res.data));
  }
  activeInactive(id: any) {
    debugger
    var json: any={};
    json['detailId'] = id
    json['updatedBy'] = this.UserId //for Id  
    this.evService.disableAndEnableVehicleLoadAbility(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getVehicleLoadAbility()
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          this.toastrService.error(err.error.Message, 'Error !');
        }

      }
    })
  }

}
