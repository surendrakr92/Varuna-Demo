import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Route, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { popupclass } from "src/app/models/Class/enum";
import { CommonServiceService } from "src/app/services/commonService/common-service.service";
import { CountryMasterService } from "src/app/services/master-service/country-master.service";
import { IndentServiceService } from "src/app/services/master-service/indent-service.service";
import { ModalPopupService } from "src/app/services/modalServices/modal-popup.service";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: "app-manifest",
  templateUrl: "./manifest.component.html",
  styleUrls: ["./manifest.component.scss"],
})
export class ManifestComponent implements OnInit {
  setupJson: any = [];
  formMaster!: FormGroup;
  submitted = false;
  transitModeList: any;
  cityList: any;
  branchList: any;
  ShowDaterange = false;
  meniFestDetList: any = [];
  constructor(
    private formbuilder: FormBuilder,
    private shared_service: SharedService,
    private masterService: CountryMasterService,
    private route: Router,
    public modalService: ModalPopupService,
    private toastrService: ToastrService,
    private cs: CommonServiceService,
    private indntServ: IndentServiceService
  ) { 
  }
  ngOnInit(): void {
    this.dropdownList();
    this.formMaster = this.formbuilder.group({
      manualTcNo: [null],
      tcDate: [null],
      toBhCode: [null],
      docketDate: [null],
      fromDate: [null],
      toDate: [null],
      transTypeId: [null],
      toCityId: [null],
      fromCityId: [null],
      to_ltoCityIdoc: [null],
      docketNo: [""],
      destId: [null],
      TCNO: [null],
      presentDate: new FormControl(new Date().toISOString().substring(0, 10)),
    });
    // this.formMaster.controls['fromDate'].setValue(this.formMaster.controls['presentDate'].value)
    // this.formMaster.controls['toDate'].setValue(this.formMaster.controls['presentDate'].value)
  }
  dateRanf = [
    { id: 1, type: "Date Range [dd/mm/yyyy]" },
    { id: 2, type: "Last Week (Including Today)" },
    { id: 3, type: "Today" },
    { id: 4, type: "Till Date" },
  ];

  get f() {
    return this.formMaster.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formMaster.invalid) {
      return;
    }
    this.indntServ.getManifestDetByFtr(this.formMaster.value).subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.meniFestDetList = res.data;
        }
      },
      (err) => {
        this.toastrService.error(err.error.Message);
      }
    );
  }

  dropdownList() {
    this.masterService
      .getGeneralMasterByCodeTyoeId(120)
      .subscribe((res: any) => {
        this.transitModeList = res.data;
      });
    this.masterService.getAllCityMasterList().subscribe((res: any) => {
      this.cityList = res.data;
    });
    this.masterService.getAllBranchMasterList().subscribe((res: any) => {
      this.branchList = res.data;
    });
  }

  OnPrepare() {
    this.route.navigate(["indent/manifest/manifest-view"]);
  }
  modelOpen2(model: any) {
    let json: any = {};
    (json["tcSf"] = ""),
      (json["tcDate"] = this.formMaster.controls["tcDate"].value), //mfdate
      (json["branchId"] = this.cs.login_UserCurrBranchId()), //session
      (json["totalDocket"] = this.setupJson.length), //number of docket
      (json["totalPackages"] = this.setupJson
        .map((x: { loadPkgsNo: string | number }) => +x.loadPkgsNo)
        .reduce((sum: any, value: any) => sum + value, 0)), //Pack.[L/B] calculate
      (json["totalActualWeight"] = this.setupJson
        .map((x: { loadActualWeight: string | number }) => +x.loadActualWeight)
        .reduce((sum: any, value: any) => sum + value, 0)), //Wt. [L/B] calculate
      (json["totalCftWeight"] = 0),
      (json["totalLoadPackages"] = 0),
      (json["totalLoadActualWeight"] = 0),
      (json["totalLoadCftWeight"] = 0),
      (json["tfFlag"] = true),
      (json["tchHdrFlag"] = true),
      (json["remarks"] = ""),
      (json["vehicleId"] = 0),
      (json["vehicleNo"] = "string"),
      (json["manualTcNo"] = this.formMaster.controls["manualTcNo"].value), //Manual MF
      (json["fromCityId"] = this.formMaster.controls["fromCityId"].value ?? 0), //fromcity
      (json["toCityId"] = this.formMaster.controls["toCityId"].value ?? 0), //fromcity
      (json["isBcProcess"] = true),
      (json["manifestDtllist"] = this.setupJson);
    this.indntServ.manifestEntry(json).subscribe(
      (result: any) => {
        if (result.succeeded) {
          this.modalService.modalOpenSuccess(
            model,
            popupclass.info,
            true,
            false,
            false,
            popupclass.medium
          );
          // this.modalService.closeModal()
          this.setupJson = [];
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger;
            Object.keys(err.error.Errors).forEach((prop: any) => {});
          }
          this.toastrService.error(
            err.error.Message,
            `Error status:${err.status}`
          );
        }
      }
    );
  }
  modelOpen(model: any) {
    debugger;
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.extralarge
    );
  }
  download_pdf_print() {
    let element_id = "viewData_information";
    this.shared_service.print_file_to_pdf(element_id).subscribe((rs) => {});
    this.masterService.getAllCityMasterList().subscribe((res: any) => {
      this.cityList = res.data;
    });
  }

  selectionDate(event: any) {
    debugger;
    this.formMaster.controls["fromDate"].setValue("");
    this.formMaster.controls["toDate"].setValue("");
    if (event == 3) {
      this.ShowDaterange = true;
      this.formMaster.controls["fromDate"].setValue(
        this.formMaster.controls.presentDate.value
      );
      this.formMaster.controls["toDate"].setValue(
        this.formMaster.controls.presentDate.value
      );
    } else if (event == 2) {
      this.ShowDaterange = true;
      this.formMaster.controls["toDate"].setValue(
        this.formMaster.controls.presentDate.value
      );
      this.formMaster.controls["fromDate"].setValue(
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .substring(0, 10)
      );
    } else if (event == 4) {
      this.ShowDaterange = true;
      this.formMaster.controls["fromDate"].setValue("1990-12-12");
      this.formMaster.controls["toDate"].setValue(
        this.formMaster.controls.presentDate.value
      );
    } else {
      this.ShowDaterange = true;
      this.formMaster.controls["fromDate"].setValue("");
      this.formMaster.controls["toDate"].setValue("");
      this.formMaster.controls["fromDate"].enable();
      this.formMaster.controls["toDate"].enable();
    }
  }
  handleAllMen(data: any) {
    debugger;
    if (data === true) {
      // Create a copy of the original data
      this.setupJson = [...this.meniFestDetList];
    } else {
      this.setupJson = [];
    }

    this.meniFestDetList.forEach((element: any) => {
      element["checked"] = data;
    });
    console.log(this.setupJson);
  }
  singleMen(data: any, index: any, item: any) {
    const isChecked = data;

    if (isChecked) {
      this.setupJson.push(item);
    } else {
      // Remove the item from the setupJson array
      const itemIndex = this.setupJson.findIndex(
        (el: any) => el.laneId === item.laneId
      );
      if (itemIndex !== -1) {
        this.setupJson.splice(itemIndex, 1);
      }
    }
    console.log(this.setupJson);
  }
  setJsonForOnCh(data: any, index: any, cond: any) {
    if (!this.meniFestDetList[index]) {
      this.meniFestDetList[index] = {};
    }
    this.meniFestDetList[index][cond] = data;
  }
}
