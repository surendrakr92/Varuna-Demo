import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { itemList, purchaseMaster } from 'src/app/models/Class/stationary';

import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { StationaryService } from 'src/app/services/master-service/stationary.service';

@Component({
  selector: 'app-createitem-master',
  templateUrl: './create-pc-master.component.html',
  styleUrls: ['./create-pc-master.component.scss']
})
export class CreatePCMasterComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject<any>()
  showMyContainerFrom: boolean = false;
  showMyContainerTo: boolean = false;
  dtOptions: DataTables.Settings = {};
  UserId: any
  branchid: any
  formPurchaseMaster!: FormGroup;
  formItemMaster!: FormGroup;
  submitted!: true;
  submittedItem: boolean = false;
  countryList: any = []
  itemList: any = []
  noofSheet: number = 0;
  vendorCodeList: any = [];
  pcDetailsById: any = "";
  empList: Array<itemList> = [];
  indexItemList?: number | undefined;;
  // name: String | undefined;
  // itemCode: String | undefined;
  btnAddPc: String = ""
  isedit = false;
  selitemid: any;
  btnDisabled: boolean = true;
  todayDate: any = new Date().toISOString().slice(0, 10);

  constructor(private formbuilder: FormBuilder, private masterservice: CountryMasterService, private stryservice: StationaryService,
    private toastrService: ToastrService,
    private routes: Router, private cs: CommonServiceService,//for id
    private router: ActivatedRoute) {
    this.dtOptions = {
      lengthMenu: [5, 10, 20, 50, 100],
    }
    this.UserId = this.cs.login_User_Code();//for id
    this.branchid = this.cs.login_UserCurrBranchId();
  }

  ngOnInit(): void {
    this.btnAddPc = "Add";
    this.getAllMasterDropDown();
    this.getAllItemDropDown();
    this.formPurchaseMaster = this.formbuilder.group({
      challanNo: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[A-Za-z0-9 ]+$/)]],
      challanDate: [this.todayDate, Validators.required],
      vendorId: ['', Validators.required],
      branchId: [this.branchid],
      isCanceled: ['false'],
      //itemList: this.formbuilder.array([]),
    })
    this.formPurchaseMaster.get('challanDate')?.disable();
    this.formItemMaster = this.formbuilder.group({
      challanDetailsId: [0],
      itemId: ['', [Validators.required]],
      itemCode: ['', [Validators.required]],
      itemName: ['', [Validators.required]],
      //qty: ['', [Validators.required, Validators.max(100), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      qty: ['', [Validators.required]],
      qtyChange: [''],
      serialStart: [''],
      serialEnd: [''],
    })
    this.router.params.subscribe((res) => {
      let pcMasterId = res.data
      if (pcMasterId) {
        this.getAllItemDropDown();
        this.stryservice.getAllPurchaseListDetailsById(pcMasterId).subscribe((res: any) => {
          this.pcDetailsById = res.data
          this.formPurchaseMaster.patchValue({
            challanNo: res.data.challanNo,
            challanDate: res.data.challanDate,
            vendorId: res.data.vendorId,
            branchId: res.data.branchId,
            isCanceled: res.data.isCanceled,
          });
          for (let v in res.data.purchaseChallanDetails) {
            let data = new itemList();
            data.challanDetailsId = res.data.purchaseChallanDetails[v].challanDetailsId;
            data.itemId = res.data.purchaseChallanDetails[v].itemId;
            data.serialStart = res.data.purchaseChallanDetails[v].serialStart;
            data.serialEnd = res.data.purchaseChallanDetails[v].serialEnd;
            data.itemCode = res.data.purchaseChallanDetails[v].itemCode;
            data.itemName = res.data.purchaseChallanDetails[v].itemName;
            data.qty = res.data.purchaseChallanDetails[v].qty;
            data.qtyChange = res.data.purchaseChallanDetails[v].qtyChange;
            this.empList.push(data);
          }
        })
        this.formPurchaseMaster.disable();
      }
    })
    this.formItemMaster.get('itemId')?.disable;
    this.formItemMaster.get('itemId')?.disabled;
  }
  getAllMasterDropDown() {
    this.masterservice.getAllVendorMaster().subscribe((res: any) => {
      this.vendorCodeList = res.data
    })
  }
  getAllItemDropDown() {
    this.stryservice.getAllItemMaster().subscribe((res: any) => {
      this.itemList = res.data
    })
  }

  onChangeChallanNo(e: any) {
    const vendorVal = this.formPurchaseMaster.get('vendorId')?.value;
    if (parseInt(vendorVal) > 0) {
      if (e.target.value != null) {
        var json = {
          challanNo: parseInt(e.target.value),
          vendorId: vendorVal.toString()
        };
        //alert(JSON.stringify(vendorVal) + ' - ' + JSON.stringify(e.target.value) + ' - ' + JSON.stringify(json));
        this.stryservice.checkPcSerialNumber(json).subscribe((res: any) => {
          alert(JSON.stringify(res));
          if (res.succeeded == false) {
            this.toastrService.error(res.errors[0].errorMessage, 'Error !');
            this.formPurchaseMaster.controls.challanNo.setValue("");
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
    else {
      this.toastrService.error('Please Select the vendor name', 'Error !');
    }
  }

  onqtyChange(e: any) {
    if (this.isedit) {
      this.fetchSerialEnd();
      this.checkSerialNo();
      this.formItemMaster.get('serialStart')?.setValue('');
      this.formItemMaster.get('serialEnd')?.setValue('');
    }
  }
  fetchSerialEnd() {
    let serialEnd = ((this.noofSheet * this.formItemMaster.controls.qty.value) + Number(this.formItemMaster.controls.serialStart.value) - 1);
    this.formItemMaster.controls.serialEnd.setValue(serialEnd);
  }

  redirectionEdit(data: itemList, index: any) {
    this.formItemMaster.get('itemId')?.disable;
    const numberOfSheet = this.itemList.filter((x: any) => x.itemId == data.itemId).map((x: any) => x.numberOfSheet);
    const isNumber = this.itemList.filter((x: any) => x.itemId == data.itemId).map((x: any) => x.isNumbered);
    if (isNumber == 'Y') {
      this.noofSheet = numberOfSheet;
      this.showMyContainerTo = true;
      this.showMyContainerFrom = true;
    } else {
      this.showMyContainerTo = false;
      this.showMyContainerFrom = false;
    }
    this.isedit = true;
    this.btnAddPc = "Update "
    this.formItemMaster.patchValue(data)
    this.indexItemList = index;

  }
  removeDetails(data: any) {
    this.empList.splice(data, 1)
    this.clearitemData()
    console.log(this.empList)
  }
  get f() {
    return this.formPurchaseMaster.controls;
  }
  get f2() {
    return this.formItemMaster.controls;
  }
  onSRStartSelected(e: any) {


    this.formItemMaster.controls['qtyChange'].setValue(this.formItemMaster.controls['qty'].value);
    this.fetchSerialEnd();
    this.checkSerialNo();
  }
  checkSerialNo() {
    var json = new purchaseMaster
    json.challanDetailsId = this.formItemMaster.controls.challanDetailsId.value
    json.itemId = this.formItemMaster.controls.itemId.value
    json.startNo = this.formItemMaster.controls.serialStart.value
    json.endNo = this.formItemMaster.controls.serialEnd.value
    this.stryservice.checkPcSerialNo(json).subscribe((res: any) => {
      //console.log(res.errors.errorMessage)
      if (res.succeeded) {
      } else {
        this.toastrService.error(res.errors[0].errorMessage, 'Error !');
        this.formItemMaster.controls.serialEnd.setValue("");
        this.formItemMaster.controls.serialStart.setValue("");
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          this.toastrService.error(err.error.Message, 'Error !');
        }
      }
    })
  }
  onLocalAdd() {
    this.submittedItem = true;
    if (this.formItemMaster.invalid) {
      return
    }
    if (this.empList.length > 0) {
      this.empList.forEach((val: any, index: number) => {
        if (this.indexItemList === undefined) {
          let data = new itemList();
          val.challanDetailsId = 0;
          data.itemId = this.formItemMaster.controls.itemId.value;
          data.itemName = this.formItemMaster.controls.itemName.value.toString();
          data.itemCode = this.formItemMaster.controls.itemCode.value.toString();
          data.serialStart = this.formItemMaster.controls.serialStart.value;
          data.serialEnd = this.formItemMaster.controls.serialEnd.value;
          data.qty = this.formItemMaster.controls.qty.value;
          data.qtyChange = this.formItemMaster.controls.qty.value;
          this.empList.push(data);
          this.clearitemData();
        }
        else {
          if (this.indexItemList == index) {
            val.challanDetailsId = this.formItemMaster.controls['challanDetailsId'].value;
            val.itemId = this.formItemMaster.controls['itemId'].value;
            val.serialStart = this.formItemMaster.controls['serialStart'].value;
            val.serialEnd = this.formItemMaster.controls['serialEnd'].value;
            val.itemCode = this.formItemMaster.controls['itemCode'].value.toString();
            val.itemName = this.formItemMaster.controls['itemName'].value.toString();
            val.qty = this.formItemMaster.controls['qty'].value;
            val.qtyChange = this.formItemMaster.controls['qtyChange'].value;
            if (val.qty != this.formItemMaster.controls['qty'].value) {
              this.fetchSerialEnd();
            }
            this.btnAddPc = "Add"
            this.isedit = false;
            index = 0;
            this.clearitemData();
          }
        }
      });
      this.btnDisabled = false;
    }
    else {
      let data = new itemList();
      data.challanDetailsId = 0;
      data.itemId = this.formItemMaster.controls.itemId.value;
      data.itemName = this.formItemMaster.controls.itemName.value.toString();
      data.itemCode = this.formItemMaster.controls.itemCode.value.toString();
      data.serialStart = this.formItemMaster.controls.serialStart.value;
      data.serialEnd = this.formItemMaster.controls.serialEnd.value;
      data.qty = this.formItemMaster.controls.qty.value;
      data.qtyChange = this.formItemMaster.controls.qty.value;
      this.empList.push(data);
      this.clearitemData();
      this.btnDisabled = false;
      //this.formItemMaster.valid;
    }
    this.submittedItem = false;
  }
  clearitemData() {
    this.formItemMaster.reset();
  }
  onItemSelected(e: any) {
    this.selitemid = this.empList.filter((x: any) => x.itemId == e).map((x: any) => x.itemId);
    if (this.selitemid == e) {
      this.toastrService.error('Please select different Item', 'Error !');
      this.clearitemData();
    } else {
      this.formItemMaster.controls['itemName'].setValue(this.itemList.filter((x: any) => x.itemId == e).map((x: any) => x.itemName.toString()));
      this.formItemMaster.controls['itemCode'].setValue(this.itemList.filter((x: any) => x.itemId == e).map((x: any) => x.itemCode.toString()));
      const numberOfSheet = this.itemList.filter((x: any) => x.itemId == e).map((x: any) => x.numberOfSheet);
      const isNumber = this.itemList.filter((x: any) => x.itemId == e).map((x: any) => x.isNumbered);
      if (isNumber == 'Y') {
        this.noofSheet = numberOfSheet;
        this.showMyContainerTo = true;
        this.showMyContainerFrom = true;
      } else {
        this.showMyContainerTo = false;
        this.showMyContainerFrom = false;
        this.formItemMaster.controls['serialStart'].setValue('0');
        this.formItemMaster.controls['serialEnd'].setValue('0');
      }
    }
    // this.formItemMaster.controls['itemName'].setValue(this.itemList.filter((x: any) => x.itemId == e).map((x: any) => x.itemName.toString()));
    // this.formItemMaster.controls['itemCode'].setValue(this.itemList.filter((x: any) => x.itemId == e).map((x: any) => x.itemCode.toString()));
    // const numberOfSheet = this.itemList.filter((x: any) => x.itemId == e).map((x: any) => x.numberOfSheet);
    // const isNumber = this.itemList.filter((x: any) => x.itemId == e).map((x: any) => x.isNumbered);
    // if (isNumber == 'Y') {
    //   this.noofSheet = numberOfSheet;
    //   this.showMyContainerTo = true;
    //   this.showMyContainerFrom = true;
    // } else {
    //   this.showMyContainerTo = false;
    //   this.showMyContainerFrom = false;
    // }

  }

  pcSubmit() {
    this.submitted = true;
    if (this.formPurchaseMaster.invalid) {
      return
    }
    var itemJson = new purchaseMaster
    itemJson = this.formPurchaseMaster.getRawValue();
    if (this.pcDetailsById.challanId == undefined) {
      itemJson.createdBy = 1
    }
    else { itemJson.updatedBy = 1; itemJson.challanId = this.pcDetailsById.challanId }
    itemJson.purchaseChallanDtls = this.empList
    if (this.pcDetailsById == "") {
      this.stryservice.createPurchasechallan(itemJson).subscribe((result: any) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['stationery/purchase-master']);

      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formPurchaseMaster.get(err.error.Errors[prop]?.PropertyName);
              //wrong key comes 
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: err.error.Errors[prop]?.ErrorMessage
                });
              }
            });
          }
          this.toastrService.error('some thing went wrong', 'Error !');
        }
      })

    } else {
      this.stryservice.editPurchaseMaster(itemJson).subscribe((result) => {
        console.log(itemJson)
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['stationery/purchase-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          console.log(itemJson)
          if (err.status === 422) {
            debugger
          }
          this.toastrService.error('something went wrong', 'Error !');
        }
      })
    }

  }
}

