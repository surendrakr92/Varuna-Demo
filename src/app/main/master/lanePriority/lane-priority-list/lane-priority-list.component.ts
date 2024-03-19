import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { param } from "jquery";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { popupclass } from "src/app/models/Class/enum";
import { CommonServiceService } from "src/app/services/commonService/common-service.service";
import { CustomerMasterServiceService } from "src/app/services/master-service/customer-master-service.service";
import { ModalPopupService } from "src/app/services/modalServices/modal-popup.service";

import * as XLSX from "xlsx";
@Component({
  selector: "app-lane-priority-list",
  templateUrl: "./lane-priority-list.component.html",
  styleUrls: ["./lane-priority-list.component.scss"],
})
export class LanePriorityListComponent implements OnInit {
  lanePriorityList: any = [];
  UserId: any;
  formMaster: any = FormGroup;
  submitted = false;
  customerList: any;
  customerListBYPr: any = [];
  selectedCustomer: any = undefined;
  patchedCustIdDetails: any = ''
  customerId: any
  constructor(
    private custService: CustomerMasterServiceService,
    private modalService: ModalPopupService,
    private route: ActivatedRoute,
    private routes: Router,
    private cs: CommonServiceService, //for id,
    private toastrService: ToastrService,
    private formbiuilder: FormBuilder,
    private router: ActivatedRoute
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
    this.getLanePriorityList();
    this.getCustomerMaster();
    this.formMaster = this.formbiuilder.group({
      custId: ["", Validators.required], // bind contract master here
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      isActive: [true],
    });
    this.router.queryParams.subscribe((params) => {
      this.patchedCustIdDetails = params
      debugger
      if (this.patchedCustIdDetails.custId) {
        this.custService
          .getLanePrioritybyCustomerId(this.patchedCustIdDetails.custId)
          .subscribe((res: any) => {
            this.customerListBYPr = res.data;
            this.dtTrigger.next(null);
          })
      }
    });
  }
  getLanePriorityList() {
    //discussed where to use
    // this.custService.getAllLanePriorityMaster().subscribe((res: any) => {
    //   this.lanePriorityList = res.data
    //   this.dtTrigger.next(null)
    // })
  }
  getCustomerMaster() {
    this.custService.getAllCustomerMaster().subscribe((res: any) => {
      this.customerList = res.data;
    });
  }
  get f() {
    return this.formMaster.controls;
  }
  OnSubmit() {
    this.submitted = true;
    if (this.formMaster.invalid) {
      return;
    }
    const queryParams = this.formMaster.value;
    this.routes.navigate(["/master/lane-priority-list/update-lane-priority"], {
      queryParams: queryParams,
    });
    this.modalService.closeModal();
  }
  redirectionEdit(id: any) {
    // this.routes.navigate(['master/branch-master/update-branch-master/', id])
  }
  activeInactive(id: any) {
    debugger
    var json: any = {}
    json.priorityId = id
    json.updatedBy = this.UserId
    this.custService.disableAndEnablelanepriority(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        this.showExistCust(this.customerId)
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          this.toastrService.error(err.error.Message, 'Error !');
        }

      }
    })
  }
  //excel_converter_download
  downloadExcel() {
    let fileName = "lanePriorityTarget.xLsx";
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.customerListBYPr);
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
  update(item: any) {
    debugger
    const queryParams = item
    this.routes.navigate(["/master/lane-priority-list/update-lane-priority"], {
      queryParams: queryParams,
    });
  }
  modelopen2(model: any) {
    this.cs.destryTableData();

    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
  }
  showExistCust(data: any) {
    debugger;
    this.customerId = data
    if (data) {
      $('#MyTable').DataTable().destroy();
      this.custService
        .getLanePrioritybyCustomerId(data)
        .subscribe((res: any) => {
          this.customerListBYPr = res.data;
          this.dtTrigger.next(null);
        });
    }
  }
  refreshGrid(){
    this.customerListBYPr=[]
  }
}
