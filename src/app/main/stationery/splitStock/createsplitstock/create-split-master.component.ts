import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { SplitJson, itemList, purchaseMaster } from 'src/app/models/Class/stationary';

import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { StationaryService } from 'src/app/services/master-service/stationary.service';

@Component({
  selector: 'app-createsplit-master',
  templateUrl: './create-split-master.component.html',
  styleUrls: ['./create-split-master.component.scss']
})
export class CreateSplitMasterComponent implements OnInit {

  dtTrigger: Subject<any> = new Subject<any>()

  dtOptions: DataTables.Settings = {};
  UserId: any
  formSplitMaster!: FormGroup;
  formItemMaster!: FormGroup;
  submitted!: true
  countryList: any = []
  itemList: any = []
  sstart: any = 0;
  sendt: any = 0;
  branchCodeList: any = [];
  branchList: any = [];
  pcDetailsById: any = "";
  empList: Array<itemList> = [];
  indexItemList?:number | undefined;;
  // name: String | undefined;
  // itemCode: String | undefined;
  btnAddPc: String =""
  isedit= false;

  constructor(private formbuilder: FormBuilder, private stryservice: StationaryService, private masterservice: CountryMasterService,
    private toastrService: ToastrService,
    private routes: Router, private cs: CommonServiceService,//for id
    private router: ActivatedRoute) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
    this.UserId = this.cs.login_User_Code()//for id
  }

  ngOnInit(): void {
    this.btnAddPc="Add";
    this.getAllMasterDropDown();
    this.getAllItemDropDown();
    this.formSplitMaster = this.formbuilder.group({
      itemId: ['', Validators.required],
      serialEnd: ['', Validators.required],
      serialStart: ['', Validators.required],
      branchId: ['',Validators.required],
      splitSerialStart: ['', Validators.required],
      splitSerialEnd: ['', Validators.required],
      issueToBranchId: ['', Validators.required],
      isCanceled: ['true'],
      splitStockDate:['2023-10-18T08:34:23.527Z']

    })
   
    this.router.params.subscribe((res) => {
      let pcMasterId = res.data
   
   
      if (pcMasterId) {
        this.getAllItemDropDown();
        this.stryservice.getSplitStockById(pcMasterId).subscribe((res: any) => {
          alert(res.data)
          this.pcDetailsById = res.data
          this.formSplitMaster.patchValue({
            itemId: res.data.itemId,
            serialEnd: res.data.serialEnd,
            serialStart: res.data.serialStart,
            branchId: res.data.branchId,
            isCanceled: res.data.isCanceled,
            issueToBranchId: res.data.issueToBranchId,
            splitStockDate: res.data.splitStockDate,
            splitSerialEnd:res.data.splitSerialEnd,
            splitSerialStart:res.data.splitSerialStart

          });
        
        })
      }
    })
  }
  getAllMasterDropDown() {
    this.stryservice.getBranchListSplitStock().subscribe((res: any) => {
      this.branchCodeList = res.data
    })
    this.masterservice.getAllBranchMasterList().subscribe((res: any) => {
      this.branchList = res.data
    })

  
  }

  getAllItemDropDown() {
    this.stryservice.getAllItemMaster().subscribe((res: any) => {
      this.itemList = res.data
    })
  }


  redirectionEdit(data: itemList, index: any) {
    this.isedit=true;
    this.btnAddPc = "Update"
    this.formSplitMaster.patchValue(data)
    this.indexItemList = index;
  }
  removeDetails(data: any) {
    this.empList.splice(data, 1)
    this.clearitemData()
    console.log(this.empList)
  }

  get f() {
    return this.formSplitMaster.controls;
  }
 
 
  onSRStartSelected(e: any) {

    this.checkData(e);
   
  }

  checkSerialNo() {
    var json = new purchaseMaster
    json.itemId = this.formItemMaster.controls.itemId.value
    json.startNo = this.formItemMaster.controls.serialStart.value
    json.endNo = this.formItemMaster.controls.serialEnd.value
    console.log(json)
    this.stryservice.checkPcSerialNo(json).subscribe((res: any) => {
      //console.log(res.errors.errorMessage)
      if (res.succeeded) {

      } else {
        alert(res.errors[0].errorMessage)
        this.formItemMaster.controls.serialEnd.setValue("");
        this.formItemMaster.controls.serialStart.setValue("");
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          this.toastrService.error(err.error.Message, 'Error !');
          alert(err.error.Message)
        }
      }
    })
  }

 
  checkData(branchId: any){
    this.empList = [];
    this.formSplitMaster.controls['itemId'].setValue("");
    this.formSplitMaster.controls['serialEnd'].setValue("");
       this.formSplitMaster.controls['serialStart'].setValue("");
  this.stryservice.getAllSplitStockIssuebyById(branchId).subscribe((res:any) => {
   
      if (res.succeeded) {
        let data = new itemList();
        for (let v in res.data) {
        data.itemId = res.data[v].itemId;
        data.serialStart = res.data[v].serialStart;
        data.serialEnd = res.data[v].serialEnd;
        data.itemCode = res.data[v].itemCode;
        data.itemName = res.data[v].itemName;
        data.qty = res.data[v].qty;
        data.issueDetailsId= res.data[v].issueDetailsId;
    
        this.empList.push(data);
        }
     
      } else {
      
      
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger

          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formSplitMaster.get(err.error.Errors[prop]?.PropertyName);
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


 
  clearitemData() {
    this.formSplitMaster.reset();
  }
  onItemSelected(e: any) {
    this.sstart = this.empList.filter((x: any) => x.itemId == e).map((x: any) => x.serialStart)
    this.formSplitMaster.controls['serialStart'].setValue(this.sstart);
    this.formSplitMaster.controls['serialEnd'].setValue(this.empList.filter((x: any) => x.itemId == e).map((x: any) => x.serialEnd));
  
  }

  splitSubmit() {
    this.submitted = true;
    if (this.formSplitMaster.invalid) {
      return
    }
    var itemJson = new SplitJson
    itemJson = this.formSplitMaster.value
    itemJson.issueId=1


    if (this.pcDetailsById.splitStockId == undefined) { itemJson.createdBy = 1 }
    else { itemJson.updatedBy = 1; itemJson.splitStockId = this.pcDetailsById.splitStockId }



    console.log(itemJson)
    if (this.pcDetailsById == "") {
      this.stryservice.createSplitStock(itemJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['stationery/split-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formSplitMaster.get(err.error.Errors[prop]?.PropertyName);
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
      this.stryservice.updateSplitStock(itemJson).subscribe((result) => {

        console.log(itemJson)
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['stationery/split-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          console.log(itemJson)
          if (err.status === 422) {
            debugger

           

          }
          this.toastrService.error('some thing went wrong', 'Error !');
        }
      })
    }

  }
}

