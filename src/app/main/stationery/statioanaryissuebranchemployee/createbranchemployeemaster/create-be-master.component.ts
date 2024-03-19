import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { issueMaster, issueserialJson, itemList } from 'src/app/models/Class/stationary';

import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { StationaryService } from 'src/app/services/master-service/stationary.service';

@Component({
    selector: 'app-createitem-master',
    templateUrl: './create-be-master.component.html',
    styleUrls: ['./create-be-master.component.scss']
})

export class CreateBEMasterComponent implements OnInit {
    branchid: any = "";
    branchname: any = "";
    showMyContainerFrom: boolean = false;
    showMyContainerTo: boolean = false;
    constructor(private formbuilder: FormBuilder, private masterservice: CountryMasterService, private stryservice: StationaryService,
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
        // this.branchid = this.cs.login_UserBranchId();
        // this.branchname = this.cs.login_UserBranch();
    }
    dtTrigger: Subject<any> = new Subject<any>()
    isedit = false;
    dtOptions: DataTables.Settings = {};
    UserId: any
    formIssueMaster!: FormGroup;
    formItemMaster!: FormGroup;
    submitted!: true;
    submittedItem: boolean = false;
    countryList: any = []
    itemList: any = []
    noofSheet: number = 0;
    branchCodeList: any = []
    userList: any = []

    beDetailsById: any = ""
    empList: Array<itemList> = [];
    indexItemList?: number | undefined;
    unitTypeList: any[] = [];
    btnAdd: String = "";
    btnDisabled: boolean = true;
    getIsNumber: any;
    todayDate: any = new Date().toISOString().slice(0, 10);
    ngOnInit(): void {
        this.btnAdd = "Add";
        this.onLoadUnitType();
        this.formIssueMaster = this.formbuilder.group({
            issueDate: [this.todayDate, Validators.required],
            branchId: [this.branchid],
            issuedToBranch: ['0', Validators.required],
            issuedToEmployee: ['0', Validators.required],
            isCanceled: [true]
        })
        this.formItemMaster = this.formbuilder.group({
            issueDetailsId: [0],
            itemId: ['', [Validators.required]],
            itemCode: ['', [Validators.required]],
            itemName: ['', [Validators.required]],
            qty: ['', [Validators.required]],
            qtyChange: [''],
            getSerialStart: ['0'],
            getSerialEnd: ['0'],
            receiptDetailsIdList: ['0'],
            unitTypeId: [{ value: '', disabled: true }],
            serialStart: [''],
            serialEnd: [''],
        })
        this.formIssueMaster.get('issueDate')?.disable();
        this.getAllMasterDropDown();
        if (this.branchid == 1) {
            this.formIssueMaster.get('issuedToEmployee')?.disable();
        }
        this.router.params.subscribe((res) => {
            let beMasterId = res.data
            if (beMasterId) {
                this.stryservice.getAllStationeryissueDetailsById(beMasterId).subscribe((res: any) => {
                    this.beDetailsById = res.data
                    this.formIssueMaster.patchValue({
                        issueDate: res.data.issueDate,
                        branchId: res.data.branchId,
                        issuedToBranch: res.data.issuedToBranchId,
                        issuedToEmployee: res.data.issuedToEmployee,
                        isCanceled: res.data.isCanceled,
                    });
                    for (let v in res.data.issueDetailsView) {
                        let data = new itemList();
                        data.itemId = res.data.issueDetailsView[v].itemId;
                        data.serialStart = res.data.issueDetailsView[v].serialStart;
                        data.serialEnd = res.data.issueDetailsView[v].serialEnd;
                        data.itemCode = res.data.issueDetailsView[v].itemCode;
                        data.itemName = res.data.issueDetailsView[v].itemName;
                        data.qty = res.data.issueDetailsView[v].qty;
                        data.qtyChange = res.data.issueDetailsView[v].qtyChange;
                        this.empList.push(data);
                    }
                })
            }
        })
    }
    onLoadUnitType() {
        this.masterservice.getGeneralMasterByCodeTyoeId(98).subscribe((res: any) => {
            this.unitTypeList = res.data
        })
    }

    getAllMasterDropDown() {
        this.masterservice.getAllBranchMasterList().subscribe((res: any) => {
            this.branchCodeList = res.data.filter((x: any) => x.branchId != this.branchid && x.branchId != 1);
        })
        this.masterservice.getAllUserMasterList().subscribe((res: any) => {
            this.userList = res.data;
        })
        this.stryservice.getAllItemMaster().subscribe((res: any) => {
            this.itemList = res.data;
        })
    }
    get f() {
        return this.formIssueMaster.controls;
    }
    get f2() {
        return this.formItemMaster.controls;
    }
    onqtyChange(e: any) {
        if (this.isedit) {
            this.fetchSerialEnd();
            //this.checkSerialNo();
            this.checkValidQuantityorNot();
        }
        if (this.getIsNumber.toString() == 'N') {
            var quantityJson = new issueserialJson
            quantityJson.itemId = this.formItemMaster.controls.itemId.value;
            quantityJson.serialStart = 0;
            quantityJson.serialEnd = 0;
            quantityJson.qty = e.target.value;
            quantityJson.branchId = this.formIssueMaster.controls.branchId.value;
            quantityJson.isNumbered = this.getIsNumber.toString();
            quantityJson.issueDate = this.formIssueMaster.controls.issueDate.value;
            this.stryservice.checkIssueSerialNo(quantityJson).subscribe((res: any) => {
                if (res.succeeded == true) {
                    this.formItemMaster.controls.qty.setValue(e.target.value);
                } else {
                    if (res.succeeded == false) {
                        let errors = "";
                        res.errors.forEach((val: any, index: number) => {
                            errors = val.errorMessage;
                        })
                        this.toastrService.error(errors, 'Error !');
                        this.formItemMaster.controls.qty.setValue("");
                    }
                }
            }, err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 422) {
                        this.toastrService.error(err.error.Message, 'Error !');
                    }
                }
            })
        }
        this.formItemMaster.get('serialStart')?.setValue('0');
        this.formItemMaster.get('serialEnd')?.setValue('0');
    }
    fetchSerialEnd() {
        let serialEnd = (this.noofSheet * this.formItemMaster.controls.qty.value) + Number(this.formItemMaster.controls.serialStart.value);
        this.formItemMaster.controls.serialEnd.setValue(serialEnd - 1);
    }
    onSRStartSelected(e: any) {
        this.formItemMaster.controls['qtyChange'].setValue(this.formItemMaster.controls['qty'].value);
        this.fetchSerialEnd();
        //   this.checkSerialNo();
        this.checkValidQuantityorNot();
    }
    checkSerialNo() {
        var json = new issueMaster
        json.itemId = this.formItemMaster.controls.itemId.value
        json.startNo = this.formItemMaster.controls.serialStart.value
        json.endNo = this.formItemMaster.controls.serialEnd.value
        this.stryservice.checkPcSerialNo(json).subscribe((res: any) => {
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
    checkValidQuantityorNot() {
        if (this.getIsNumber == 'Y') {
            var quantityJson = new issueserialJson
            quantityJson.itemId = this.formItemMaster.controls.itemId.value
            quantityJson.serialStart = this.formItemMaster.controls.serialStart.value
            quantityJson.serialEnd = this.formItemMaster.controls.serialEnd.value
            quantityJson.qty = this.formItemMaster.controls.qty.value
            quantityJson.branchId = this.formIssueMaster.controls.branchId.value
            quantityJson.isNumbered = this.getIsNumber.toString();
            quantityJson.issueDate = this.formIssueMaster.controls.issueDate.value
            this.stryservice.checkIssueSerialNo(quantityJson).subscribe((res: any) => {
                if (res.succeeded == true) {
                    this.formItemMaster.controls.getSerialStart.setValue(res.data.serialStart);
                    this.formItemMaster.controls.getSerialEnd.setValue(res.data.serialEnd);
                    this.formItemMaster.controls.receiptDetailsIdList.setValue(res.data.receiptDetailsIdList);
                } else {
                    if (res.succeeded == false) {
                        let errors = "";
                        res.errors.forEach((val: any, index: number) => {
                            errors = val.errorMessage;
                        })
                        this.toastrService.error(errors, 'Error !');
                        this.formItemMaster.controls.serialEnd.setValue("");
                        this.formItemMaster.controls.serialStart.setValue("");
                        this.formItemMaster.controls.qty.setValue("");
                    }
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
    onIssueBranchSelected(e: any) {
        if (parseInt(e) > 0) {
            this.formIssueMaster.controls['issuedToEmployee'].disable();
            this.formIssueMaster.controls['issuedToEmployee'].setValue('0');
        }
    }
    onIssueEmpSelected(e: any) {
        if (parseInt(e) > 0) {
            this.formIssueMaster.controls['issuedToBranch'].disable();
            this.formIssueMaster.controls['issuedToBranch'].setValue('0');
        }
    }

    onLocalAdd() {
        this.submittedItem = true;
        if (this.formItemMaster.invalid) {
            return
        }
        if (this.getIsNumber.toString() == 'Y') {
            if (this.formItemMaster.get('serialStart')?.value == '0' ) {
                this.toastrService.error('Serial Start number must be greater than 0', 'Error !');
                return
            }
            if (this.formItemMaster.get('serialEnd')?.value == '0' ) {
                this.toastrService.error('Serial End number must be greater than 0', 'Error !');
                return
            }
            this.checkValidQuantityorNot();
        }
        if (this.empList.length > 0) {
            this.empList.forEach((val: any, index: number) => {
                if (this.indexItemList === undefined) {
                    let data = new itemList();
                    data.issueDetailsId = 0;
                    data.itemId = this.formItemMaster.controls.itemId.value;
                    data.itemName = this.formItemMaster.controls.itemName.value;
                    data.itemCode = this.formItemMaster.controls.itemCode.value;
                    data.getSerialStart = this.formItemMaster.controls.getSerialStart.value;
                    data.getSerialEnd = this.formItemMaster.controls.getSerialEnd.value;
                    data.receiptDetailsIdList = this.formItemMaster.controls.receiptDetailsIdList.value;
                    data.unitTypeId = this.formItemMaster.controls.unitTypeId.value;
                    data.serialStart = this.formItemMaster.controls.serialStart.value;
                    data.serialEnd = this.formItemMaster.controls.serialEnd.value;
                    data.qty = this.formItemMaster.controls.qty.value;
                    data.qtyChange = this.formItemMaster.controls.qty.value;
                    data.unitTypeId = this.formItemMaster.controls.unitTypeId.value;
                    this.empList.push(data);
                    this.clearitemData();
                }
                else {
                    if (this.indexItemList == index) {
                        val.issueDetailsId = this.formItemMaster.controls['issueDetailsId'].value;
                        val.itemId = this.formItemMaster.controls['itemId'].value;
                        val.serialStart = this.formItemMaster.controls['serialStart'].value;
                        val.serialEnd = this.formItemMaster.controls['serialEnd'].value;
                        val.itemCode = this.formItemMaster.controls['itemCode'].value;
                        val.getSerialStart = this.formItemMaster.controls['getSerialStart'].value;
                        val.getSerialEnd = this.formItemMaster.controls['getSerialEnd'].value;
                        val.receiptDetailsIdList = this.formItemMaster.controls['receiptDetailsIdList'].value;
                        val.itemName = this.formItemMaster.controls['itemName'].value;
                        val.unitTypeId = this.formItemMaster.controls.unitTypeId.value;
                        val.qty = this.formItemMaster.controls['qty'].value;
                        val.qtyChange = this.formItemMaster.controls['qtyChange'].value;
                        val.unitTypeId = this.formItemMaster.controls['unitTypeId'].value;
                        if (val.qty != this.formItemMaster.controls['qty'].value) {
                            this.fetchSerialEnd();
                        }
                        this.clearitemData();
                    }
                }
            });
            this.btnDisabled = false;
        }
        else {
            let data = new itemList();
            data.issueDetailsId = 0;
            data.itemId = this.formItemMaster.controls.itemId.value;
            data.itemName = this.formItemMaster.controls.itemName.value;
            data.itemCode = this.formItemMaster.controls.itemCode.value;
            data.getSerialStart = this.formItemMaster.controls.getSerialStart.value;
            data.getSerialEnd = this.formItemMaster.controls.getSerialEnd.value;
            data.receiptDetailsIdList = this.formItemMaster.controls.receiptDetailsIdList.value;
            data.serialStart = this.formItemMaster.controls.serialStart.value;
            data.serialEnd = this.formItemMaster.controls.serialEnd.value;
            data.unitTypeId = this.formItemMaster.controls.unitTypeId.value;
            data.qty = this.formItemMaster.controls.qty.value;
            data.qtyChange = this.formItemMaster.controls.qty.value;
            data.unitTypeId = this.formItemMaster.controls.unitTypeId.value;
            this.empList.push(data);
            this.clearitemData();
            this.btnDisabled = false;
        }
        this.submittedItem = false;
    }
    clearitemData() {
        this.formItemMaster.reset();
    }

    onItemSelected(e: any) {
        const itemId = this.empList.filter((x: any) => x.itemId == e).map((x: any) => x.itemId);
        if (itemId == e) {
            this.toastrService.error('Please select different Item', 'Error !');
            this.clearitemData();
        }
        else {
            this.formItemMaster.controls['itemName'].setValue(this.itemList.filter((x: any) => x.itemId == e).map((x: any) => x.itemName).toString());
            this.formItemMaster.controls['itemCode'].setValue(this.itemList.filter((x: any) => x.itemId == e).map((x: any) => x.itemCode).toString());
            this.formItemMaster.controls['unitTypeId'].setValue(this.itemList.filter((x: any) => x.itemId == e).map((x: any) => x.defaultUnitType).toString());
            const numberOfSheet = this.itemList.filter((x: any) => x.itemId == e).map((x: any) => x.numberOfSheet);
            this.getIsNumber = this.itemList.filter((x: any) => x.itemId == e).map((x: any) => x.isNumbered);
            this.formItemMaster.get('serialStart')?.setValue('');
            this.formItemMaster.get('serialEnd')?.setValue('');
            if (this.getIsNumber == 'Y') {
                this.noofSheet = numberOfSheet;
                this.showMyContainerTo = true;
                this.showMyContainerFrom = true;
            } else {
                this.showMyContainerTo = false;
                this.showMyContainerFrom = false;
            }

        }
    }
    redirectionEdit(data: itemList, index: any) {
        this.isedit = true;
        this.btnAdd = "Update "
        this.formItemMaster.patchValue(data)
        this.indexItemList = index;
    }
    removeDetails(data: any) {
        this.empList.splice(data, 1);
        this.clearitemData();
    }
    beSubmit() {
        this.submitted = true;
        if (this.formIssueMaster.invalid) {
            return
        }
        let branchEmployeeIssue: number = 0;
        if (this.formIssueMaster.get('issuedToBranch')?.value != '0') {
            branchEmployeeIssue = 1;
        }
        if (this.formIssueMaster.get('issuedToEmployee')?.value != '0') {
            branchEmployeeIssue = 1;
        }
        if (parseInt(branchEmployeeIssue.toString()) == 0) {

            this.toastrService.error('Please Select Issued To Branch or  Issued To Employee', 'Error !');
            return
        }
        var itemJson = new issueMaster
        itemJson = this.formIssueMaster.getRawValue()
        if (this.beDetailsById.issueId == undefined) { itemJson.createdBy = 1 }
        else { itemJson.updatedBy = 1; itemJson.itemId = this.beDetailsById.issueId }
        itemJson.issueDtls = this.empList;
        if (this.beDetailsById == "") {
            this.stryservice.createissue(itemJson).subscribe((result: any) => {
                if (result.succeeded) {
                    this.toastrService.success('succesfully Created !', 'Success-200 !');
                    this.routes.navigate(['stationery/branchemp-master']);
                } else {
                    this.toastrService.error(result.errors[0].errorMessage, 'Error !');
                }
            }, err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 422) {
                        Object.keys(err.error.Errors).forEach((prop: any) => {
                            const formControl = this.formIssueMaster.get(err.error.Errors[prop]?.PropertyName);
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
            this.stryservice.editissue(itemJson).subscribe((result) => {
                this.toastrService.success('succesfully Updated !', 'Success-200 !');
                this.routes.navigate(['stationery/branchemp-master']);
            }, err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 422) {
                        Object.keys(err.error.Errors).forEach((prop: any) => {
                            const formControl = this.formIssueMaster.get(err.error.Errors[prop]?.PropertyName);
                            if (formControl) {
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

