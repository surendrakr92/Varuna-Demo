import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ToastrService } from "ngx-toastr";
import { popupclass } from "src/app/models/Class/enum";
import { CommonServiceService } from "src/app/services/commonService/common-service.service";
import { CountryMasterService } from "src/app/services/master-service/country-master.service";
import { CustomerMasterServiceService } from "src/app/services/master-service/customer-master-service.service";
import { OperationsService } from "src/app/services/master-service/operations.service";
import { ModalPopupService } from "src/app/services/modalServices/modal-popup.service";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: "app-forward-document",
  templateUrl: "./forward-document.component.html",
  styleUrls: ["./forward-document.component.scss"],
})
export class ForwardDocumentComponent implements OnInit {
  formMaster!: FormGroup;
  submitted = false;
  ForwardingList: any = [];
  setUpJson: any = [];
  payBasicList: any;
  branchId: any;
  ShowDaterange = false;
  customerList: any = [];
  brnachMasterList: any = [];
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerMasterServiceService,
    private oprerationMaster: OperationsService,
    private shserv: SharedService,
    private modalService: ModalPopupService,
    private masterServie: CountryMasterService,
    private cs: CommonServiceService,
    private toastrService: ToastrService
  ) {
    this.branchId = this.cs.login_UserCurrBranchId();
  }
  ngOnInit(): void {
    this.formMaster = this.fb.group({
      docTypeId: ["", Validators.required],
      docketlist: ["", Validators.required],
      paybasisId: ["", Validators.required], //
      selectDate: [""],
      fromdate: [""],
      todate: [""],
      branchId: [this.branchId],
      manualfmno: [""],
      fmdate: ["", Validators.required],
      fmentrydate: ["", Validators.required],
      docfwdto: ["", Validators.required],
      CustomerId: [""],
      locationId: [""],
      loccustcode: [""],
      fmdoctype: [null],
      couriercode: [""],
      courierwaybillno: [""],
      courierwaybilldate: [""], //
      fmfwdloccode: [""],
      fmrecdt: [null],
      fmstatus: [""],
      doctype: [""],
      vehicleno: [""], //
      fmno: [""],
      drivername: [""], //
      mode: ["", Validators.required],
      drivermobileno: [""],
      presentDate: new FormControl(new Date().toISOString().substring(0, 10)),
    });
    this.APIBind();
  }
  get f() {
    return this.formMaster.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.formMaster.invalid) {
      return;
    }
    this.oprerationMaster
      .getAllforwarddocuments(this.formMaster.value)
      .subscribe((res: any) => {
        this.ForwardingList = res.data;
      });
  }
  SubmitFrom() {
    debugger
    this.submitted = true;
    if (this.formMaster.invalid) {
      return;
    }
    let saveJson: any = {};
    saveJson = this.formMaster.value;
    saveJson["formwordDocumentDt1"] = this.setUpJson;
    console.log(saveJson);
    this.oprerationMaster.forwardDocuments(saveJson).subscribe((response: any) => {
      if (response.Succeeded) {
        this.toastrService.success('succesfully Saved !', 'Success-200 !');
      }
    }, err => {
      this.toastrService.error(
        err.error.Message,
        `Error status:${err.status}`
      );
    })
  }
  forwardTo = [
    { id: 1, type: "Customer" },
    { id: 2, type: "Location" },
  ];
  modeList = [
    { id: 1, type: "Courier" },
    { id: 2, type: "Own Vehicle" },
  ];

  documentList = [
    { id: 1, type: "Bill" },
    { id: 2, type: "POD" },
  ];
  selectDateList = [
    { id: 1, type: "Date Range [dd/mm/yyyy]" },
    { id: 2, type: "Last Week (Including Today)" },
    { id: 3, type: "Today" },
    { id: 4, type: "Till Date" },
  ];
  APIBind() {
    this.masterServie.getGeneralMasterByCodeTyoeId(33).subscribe((res: any) => {
      this.payBasicList = res.data;
    });
    this.customerService.getAllCustomerMaster().subscribe((res: any) => {
      this.customerList = res.data;
    });
    this.masterServie.getAllBranchMasterList().subscribe((res: any) => {
      this.brnachMasterList = res.data;
      console.log(this.brnachMasterList);
    });
  }
  modelOpen(model: any) {
    debugger;
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
  }

  // printPdf() {
  //   let id = "view_information";
  //   this.shserv.print_file_to_pdf(id).subscribe((res) => { });
    
  // }
  printPdf() {
    const doc = new jsPDF("p", "pt", "a4");
    const source:any = document.getElementById("view_information");
    // Set the width of the source element to match the width of the PDF document
    source.style.width = "100%";

    html2canvas(source, {
      scale: 1, // Set scale to 1 to capture the entire content in a single page
      scrollX: 2,
      scrollY: 2,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
      useCORS: true
    }).then(canvas => {
      const imageData = canvas.toDataURL("image/jpeg", 1.0);
      const imgWidth = 595; // Width of A4 paper in points
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(imageData, 'JPEG', 0, 0, imgWidth, imgHeight);
      doc.save("document.pdf");
    });
  }

  setupJson(data: any, check: any) {
    const isChecked = check;
    if (isChecked) {
      this.setUpJson.push(data);
    } else {
      const itemIndex = this.setUpJson.findIndex(
        (el: any) => el.docketId === data.docketId
      );
      if (itemIndex !== -1) {
        this.setUpJson.splice(itemIndex, 1);
      }
    }
    console.log(this.setUpJson);
  }
  handleModeForm(ev: any) {
    const AlllV = [
      "couriercode",
      "courierwaybillno",
      "courierwaybilldate",
      "vehicleno",
      "drivername",
      "drivermobileno",
      "docfwdto",
    ];
    AlllV.forEach((controlName) => {
      const c0: any = this.formMaster.get(controlName);
      c0.clearValidators();
      c0.updateValueAndValidity();
      c0.patchValue("");
    });
    if (ev == 1) {
      const controlsToClearValidators = [
        "couriercode",
        "courierwaybillno",
        "courierwaybilldate",
      ];
      controlsToClearValidators.forEach((controlName) => {
        const c1: any = this.formMaster.get(controlName);
        c1.setValidators([Validators.required]);
        c1.updateValueAndValidity();
      });
    } else {
      const controlsToClearValidators = [
        "vehicleno",
        "drivername",
        "drivermobileno",
        "docfwdto",
      ];
      controlsToClearValidators.forEach((controlName) => {
        const c2: any = this.formMaster.get(controlName);
        c2.setValidators([Validators.required]);
        c2.updateValueAndValidity();
      });
    }
  }
  handleforwardDoc(ev: any) {
    const AllC = [
      "locationId",
      "CustomerId"
    ];
    AllC.forEach((controlName) => {
      const c0: any = this.formMaster.get(controlName);
      c0.clearValidators();
      c0.updateValueAndValidity();
      c0.patchValue(0);
    });
    if (ev == 1) {
      const controlsToClearValidators = [
        "CustomerId"
      ];
      controlsToClearValidators.forEach((controlName) => {
        const c2: any = this.formMaster.get(controlName);
        c2.setValidators([Validators.required]);
        c2.updateValueAndValidity();
      });
    } else {
      const controlsToClearValidators = [
        "locationId"
      ];
      controlsToClearValidators.forEach((controlName) => {
        const c3: any = this.formMaster.get(controlName);
        c3.setValidators([Validators.required]);
        c3.updateValueAndValidity();
      });
    }
  }
  selectionDate(event: any) {
    debugger;
    this.formMaster.controls.fromdate.setValue("")
    this.formMaster.controls.todate.setValue("")
    if (event == 3) {
      this.ShowDaterange = true;
      this.formMaster.controls["fromdate"].setValue(
        this.formMaster.controls.presentDate.value
      );
      this.formMaster.controls["todate"].setValue(
        this.formMaster.controls.presentDate.value
      );
    } else if (event == 2) {
      this.ShowDaterange = true;
      this.formMaster.controls["todate"].setValue(
        this.formMaster.controls.presentDate.value
      );
      this.formMaster.controls["fromdate"].setValue(
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .substring(0, 10)
      );
    } else if (event == 4) {
      this.ShowDaterange = true;
      this.formMaster.controls["fromdate"].setValue("1990-12-12");
      this.formMaster.controls["todate"].setValue(
        this.formMaster.controls.presentDate.value
      );
    } else {
      this.ShowDaterange = true;
      this.formMaster.controls["fromdate"].setValue("");
      this.formMaster.controls["todate"].setValue("");
      this.formMaster.controls["fromdate"].enable();
      this.formMaster.controls["todate"].enable();
    }
  }
}
