import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { popupclass } from "src/app/models/Class/enum";
import { CommonServiceService } from "src/app/services/commonService/common-service.service";
import { CountryMasterService } from "src/app/services/master-service/country-master.service";
import { CustomerMasterServiceService } from "src/app/services/master-service/customer-master-service.service";
import { ModalPopupService } from "src/app/services/modalServices/modal-popup.service";

@Component({
  selector: "app-customer-contact-master",
  templateUrl: "./customer-contact-master.component.html",
  styleUrls: ["./customer-contact-master.component.scss"],
})
export class CustomerContactMasterComponent implements OnInit {
  formMaster: any = FormGroup;
  filterValidationForm: any = FormGroup;
  contractByCustlist: any = []
  submitted = false;
  payBasisList: any;
  customerMasterList: any;
  show = false;
  masterList: any;
  isReadOnly: boolean = true;
  constructor(
    private formbuilder: FormBuilder,
    private cs: CommonServiceService, //for id
    private modalService: ModalPopupService,
    private route: Router,
    private routess: ActivatedRoute,
    private masterService: CountryMasterService,
    private customerMaster: CustomerMasterServiceService
  ) { }
  ngOnInit(): void {
    this.filterValidationForm = this.formbuilder.group({
      contractType: [151],
      custNC: [null, Validators.required],
    });
    this.filterValidationForm.controls['contractType'].disable()
    this.getGeneralMasterDropDownList();
    this.getCustomerMasterList();
    this.routess.queryParams.subscribe((parms) => {
      let urls_data_patched = parms
      debugger
      if (urls_data_patched?.custId) { this.filterValidationForm.controls['custNC'].setValue(+(urls_data_patched?.custId)) }
      this.customerMaster.getallContractsbyCustomer(urls_data_patched.custId).subscribe((res: any) => {
        if (res.succeeded == true) {
          this.contractByCustlist = res.data
        }
      })
    })
    let sessionData: any = sessionStorage.getItem('contClauseServBasic')
    if (sessionData) {
      this.customerMaster.getallContractsbyCustomer(+(sessionData)).subscribe((res: any) => {
        if (res.succeeded == true) {
          this.contractByCustlist = res.data
          this.filterValidationForm.controls['custNC'].setValue(+(sessionData))
        }
      })
    }
  }
  get filerValidate() {
    return this.filterValidationForm.controls;
  }
  submit() {
    this.submitted = true;
    if (this.formMaster.invalid) {
      return;
    }
  }
  getGeneralMasterDropDownList() {
    this.masterService
      .getGeneralMasterByCodeTyoeId(33)
      .subscribe((res: any) => {
        this.payBasisList = res.data;
      });
  }
  getCustomerMasterList() {
    this.customerMaster.getAllCustomerMaster().subscribe((res: any) => {
      this.customerMasterList = res.data;
    });
  }
  getCustomerMaster() {
    this.masterService.getAllCustomerMaster().subscribe((res: any) => {
      this.masterList = res.data;
    });
  }
  modelopen(model: any) {
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
  }
  Next(item: any) {
    if (this.filterValidationForm.controls['custNC'].value == '' || this.filterValidationForm.controls['custNC'].value == null && item == 'create') return alert('please select customer type')
    const queryParams = { qtyAlloted: 1, custId: this.filterValidationForm.controls['custNC'].value, contractId: item == 'create' ? '' : item.contractId };
    this.route.navigate(['/master/customer-contract-master/create-customer-contract-master'], {
      queryParams,
      //  skipLocationChange: true 
    });
  }
  showExistingTables() {
    this.submitted = true
    this.show = !this.show;
    let object = {
      custType: this.filterValidationForm.controls['contractType'].value,
      custNC: this.filterValidationForm.controls['custNC'].value
    }
    console.log(object)
    if (object.custNC) {
      this.customerMaster.getallContractsbyCustomer(object.custNC).subscribe((res: any) => {
        this.contractByCustlist = res.data
      })
    }
    sessionStorage.removeItem('contClauseServBasic')
  }
  gridRefresh(){
    this.contractByCustlist=[]
  }
}
