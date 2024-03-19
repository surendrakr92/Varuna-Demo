import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { itemList, requistionData, requistionItem } from 'src/app/models/Class/stationary';

import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { StationaryService } from 'src/app/services/master-service/stationary.service';

@Component({
  selector: 'app-createitem-master',
  templateUrl: './createrequistion-master.component.html',
  styleUrls: ['./createrequistion-master.component.scss']
})
export class CreateRequistionComponent implements OnInit {

  dtTrigger: Subject<any> = new Subject<any>()

  dtOptions: DataTables.Settings = {};
  UserId: any
  formrequistion!: FormGroup;

  submitted!: true
  countryList: any = []
  itemList: any = []
  noofSheet: number = 0;
  vendorCodeList: any = [];

  pcDetailsById: any = "";
  empList: Array<requistionItem> = [];
  indexItemList?: number | undefined;;
  // name: String | undefined;
  // itemCode: String | undefined;
  btnAddPc: String = ""
  isedit = false;
  branchid: any;
  branchname: any;
  btnHideShow:boolean=true;


  constructor(private formbuilder: FormBuilder, private masterservice: StationaryService, private commonservice: CountryMasterService,
    private toastrService: ToastrService,
    private routes: Router, private cs: CommonServiceService,//for id
    private router: ActivatedRoute) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
    this.UserId = this.cs.login_User_Code()//for id
    this.branchid = this.cs.login_UserCurrBranchId();
    this.branchname = this.cs.login_UserCurrBranch();
    // this.branchid = this.cs.login_UserBranchId()
    // this.branchname = this.cs.login_UserBranch()
  }

  ngOnInit(): void {
    this.btnAddPc = "Add";
    this.getAllMasterDropDown();
    this.getAllItemDropDown();
    this.formrequistion = this.formbuilder.group({
      itemId: ['', Validators.required],
      qtyInHand: ['', Validators.required],
      qtyReq: ['', Validators.required],
    })

    this.router.params.subscribe((res) => {
      let pcMasterId = res.data
      if (pcMasterId) {
        this.getAllItemDropDown();
        this.masterservice.getAllRequistionListDetailsById(pcMasterId).subscribe((res: any) => {
          this.pcDetailsById = res.data
          this.formrequistion.patchValue({
            itemId: res.data.requisitionDtlView[0].itemId,
            qtyInHand: res.data.requisitionDtlView[0].qtyInHand,
            qtyReq: res.data.requisitionDtlView[0].qtyReq,
          });
          this.formrequistion.disable();
          this.btnHideShow = false;
        })
      }
    })
  }
  getAllMasterDropDown() {
    this.commonservice.getAllVendorMaster().subscribe((res: any) => {
      this.vendorCodeList = res.data
    })
  }

  getAllItemDropDown() {
    this.masterservice.getAllItemMaster().subscribe((res: any) => {
      this.itemList = res.data
    })
  }


  redirectionEdit(data: itemList, index: any) {
    this.isedit = true;
    this.btnAddPc = "Update "
    this.formrequistion.patchValue(data)
    this.indexItemList = index;
  }
  removeDetails(data: any) {
    this.empList.splice(data, 1)
    this.clearitemData()
    console.log(this.empList)
  }

  get f() {
    return this.formrequistion.controls;
  }
  clearitemData() {
    this.formrequistion.reset();
  }
  onItemSelected(e: any) {
    this.checkRequistionStock()
  }
  checkRequistionStock() {
    var itemJson = new requistionData
    itemJson.itemId = this.formrequistion.controls.itemId.value;
    itemJson.branchId = this.branchid;//for id
    this.masterservice.checkRequistionStock(itemJson).subscribe((res: any) => {
      if (res.succeeded) {
        this.formrequistion.controls['qtyInHand'].setValue(res.data);
      } else {
        //alert(res.errors[0].errorMessage)
        //this.toastrService.error('Error Message', res.errors[0].propertyName);
        this.formrequistion.controls['qtyInHand'].setValue("0");

      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger
          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formrequistion.get(err.error.Errors[prop]?.PropertyName);
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





  }

  ReqAddon() {
    this.submitted = true;
    if (this.formrequistion.invalid) {
      return
    }

    // alert("yes")
    var itemJson = new requistionData
    itemJson.branchId = this.branchid;
    itemJson.isActive = true

    let data = new requistionItem();
    // data.requisitionDetailsId = this.pcDetailsById.requisitionDtlView[0].requisitionDetailsId;
    data.requisitionDetailsId = 0
    data.itemId = this.formrequistion.controls.itemId.value;
    data.qtyInHand = this.formrequistion.controls.qtyInHand.value;
    data.qtyReq = this.formrequistion.controls.qtyReq.value;
    this.empList.push(data);
    if (this.pcDetailsById.requisitionId == undefined) { itemJson.createdBy = 1 }
    else { itemJson.updatedBy = 1; itemJson.requisitionId = this.pcDetailsById.requisitionId }

    itemJson.requisitionDtls = this.empList

    console.log(itemJson)
    if (this.pcDetailsById == "") {
      this.masterservice.createRequistion(itemJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['stationery/requistion-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formrequistion.get(err.error.Errors[prop]?.PropertyName);
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
      this.masterservice.updateRequistion(itemJson).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['stationery/requistion-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formrequistion.get(err.error.Errors[prop]?.PropertyName);
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
    }

  }
}

