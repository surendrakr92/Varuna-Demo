import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { popupclass } from "src/app/models/Class/enum";
import { CommonServiceService } from "src/app/services/commonService/common-service.service";
import { CountryMasterService } from "src/app/services/master-service/country-master.service";
import { CustomerMasterServiceService } from "src/app/services/master-service/customer-master-service.service";
import { EventMasterService } from "src/app/services/master-service/event-master.service";
import { IndentServiceService } from "src/app/services/master-service/indent-service.service";
import { ModalPopupService } from "src/app/services/modalServices/modal-popup.service";
declare var $: any;

@Component({
  selector: "app-podapproval",
  templateUrl: "./podapproval.component.html",
  styleUrls: ["./podapproval.component.scss"],
})
export class PodapprovalComponent implements OnInit {
  submitted = false;
  formMaster!: FormGroup;
  payBasicList: any;
  Reason_For_POD_Rejection: any;
  UserId: any;
  customerList: any;
  responceData:any
  vehicleList: any;
  showTable = false;
  setupJsonn:any=[]
  currentDate = new Date().toISOString().substring(0, 10);
  ShowDaterange = false;
  userList: any;
  indentFilter: any = [];

  constructor(
    private formbuilder: FormBuilder,
    private eventService: EventMasterService,
    private customerServices: CustomerMasterServiceService,
    private indentService: IndentServiceService,
    private masterService: CountryMasterService,
    private cs: CommonServiceService,
    private modalService: ModalPopupService,
    private toastrService:ToastrService
  ) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    };
    this.UserId = this.cs.login_UserId(); //for id
  }
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.formMaster = this.formbuilder.group({
      paybasisId: [0, Validators.required],
      podSupervisorId: [0, Validators.required],
      custId: [0, Validators.required],
      rangeDate: [0, Validators.required],
      scanDateFrom: [0, Validators.required],
      scanDateTo: [0, Validators.required],
      isDelivered: [0, Validators.required],
      isPODScan: [0, Validators.required],
      approvalList:[0, Validators.required],
      rejectRes:[0, Validators.required],
      presentDate: new FormControl(new Date().toISOString().substring(0, 10)),
    });
    this.downDownList();
  }
  get f() {
    return this.formMaster.controls;
  }

  Onsubmit() {
    this.submitted = true;
    if (this.formMaster.invalid) {
      return;
    }
    this.indentService
      .POD_Filter_Approval(this.formMaster.value)
      .subscribe((res: any) => {
       if(res.succeeded){
        this.indentFilter = res.data;
        console.log(this.indentFilter);
       }
      },err=>{
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
          this.toastrService.error(err.error.Message, `Error statu:${err.status}`);
        }
      });
  }

  downDownList() {
    this.masterService
      .getGeneralMasterByCodeTyoeId(33)
      .subscribe((res: any) => {
        this.payBasicList = res.data;
      });
    this.masterService
      .getGeneralMasterByCodeTyoeId(144)
      .subscribe((res: any) => {
        this.Reason_For_POD_Rejection = res.data;
      });
    this.customerServices.getAllCustomerMaster().subscribe((res: any) => {
      this.customerList = res.data;
    });
    this.eventService.getAllVStsList().subscribe((res: any) => {
      this.vehicleList = res.data;
      console.log(this.vehicleList);
      this.dtTrigger.next(null);
    });
    this.masterService.getAllUserMasterList().subscribe((res: any) => {
      this.userList = res.data;
    });
  }

  getVehicleMasterList() {
    this.masterService.getAllVehicleMaster().subscribe((res:any)=>{
      this.vehicleList= res.data
      console.log(this.vehicleList)
      this.dtTrigger.next(null)
    })
    }

  dateRange = [
    { id: 1, type: "Date Range [dd/mm/yyyy]" },
    { id: 2, type: "Last Week (Including Today)" },
    { id: 3, type: "Today" },
    { id: 4, type: "Till Date" },
  ];

  Docket_Delivered_Status = [
    { id: 1, type: "Yes" },
    { id: 2, type: "No" },
    { id: 3, type: "All" },
  ];

  Docket_POD_Scan_Status = [
    { id: 1, type: "Yes" },
    { id: 2, type: "No" },
    { id: 3, type: "All" },
  ];
  approval = [
    { id: 1, type: 'Approve'},
    { id: 0, type: 'Reject' },
  ];

  selectionDate(event: any) {
    this.formMaster.controls["scanDateFrom"].setValue("");
    this.formMaster.controls["scanDateTo"].setValue("");
    if (event == 3) {
      this.ShowDaterange = true;
      this.formMaster.controls["scanDateFrom"].setValue(
        this.formMaster.controls.presentDate.value
      );
      this.formMaster.controls["scanDateTo"].setValue(
        this.formMaster.controls.presentDate.value
      );
    } else if (event == 2) {
      this.ShowDaterange = true;
      this.formMaster.controls["scanDateTo"].setValue(
        this.formMaster.controls.presentDate.value
      );
      this.formMaster.controls["scanDateFrom"].setValue(
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .substring(0, 10)
      );
    } else if (event == 4) {
      this.ShowDaterange = true;
      this.formMaster.controls["scanDateFrom"].setValue("1990-12-12");
      this.formMaster.controls["scanDateTo"].setValue(
        this.formMaster.controls.presentDate.value
      );
    } else {
      this.ShowDaterange = true;
      this.formMaster.controls["scanDateFrom"].setValue("");
      this.formMaster.controls["scanDateTo"].setValue("");
      this.formMaster.controls["scanDateFrom"].enable();
      this.formMaster.controls["scanDateTo"].enable();
    }
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
  modelOpen2(model: any) {
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
  setupJson(data:any,inedex:any,cond:string){
    this.indentFilter[inedex][cond]=data
    console.log(this.indentFilter)
  }
  handleAllMen(data: any) {
    debugger;
    if (data === true) {
      // Create a copy of the original data
      this.setupJsonn = [...this.indentFilter];
    } else {
      this.setupJsonn = [];
    }

    this.indentFilter.forEach((element: any) => {
      element["checked"] = data;
    });
    console.log(this.setupJsonn);
  }
  singleMen(data: any, index: any, item: any) {
    const isChecked = data;

    if (isChecked) {
      this.setupJsonn.push(item);
    } else {
      const itemIndex = this.setupJsonn.findIndex(
        (el: any) => el.docketId === item.docketId
      );
      if (itemIndex !== -1) {
        this.setupJsonn.splice(itemIndex, 1);
      }
    }
    console.log(this.setupJsonn);
  }
  podApproval(){
    this.setupJsonn.forEach((element: { [x: string]: any; }) => {
      element['podApprovedBy']=this.UserId
      element['podApprovedDate']= new Date().toISOString().slice(0, 10)
    });
    let json={"podApprovallist":this.setupJsonn}
    this.indentService.creatPODApproval(json).subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.responceData = res.data;
          this.indentFilter=[]
          this.toastrService.success('Pod Approved Successfully')
          this.formMaster.reset(0)
          this.submitted = false;
        }
      },
      (err) => {
        this.toastrService.error(err.error.Message);
      }
    );
  }
}
