import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { itemList, receiptItem, receiptItemList } from 'src/app/models/Class/stationary';
import { item } from 'src/app/models/vendorMaster';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { StationaryService } from 'src/app/services/master-service/stationary.service';
declare var $: any
import * as XLSX from 'xlsx'
@Component({
    selector: 'app-state-master',
    templateUrl: './viewreceiptitem-master.component.html',
    styleUrls: ['./viewreceiptitem-master.component.scss']
})
export class ReceiptItemComponent implements OnInit {
    receiptList: any = [];
    //receiptdetailsList: Array<itemList> = [];
    receiptdetailsList: Array<any> = [];
    UserId: any
    flag = 0;
    submitted!: true
    branchid: any = "";
    branchname: any = "";
    receiptDate?: Date;
    constructor(private itemService: StationaryService, private routes: Router,
        private cs: CommonServiceService,//for id
        private toastrService: ToastrService, private router: ActivatedRoute) {
        this.dtOptions = {
            lengthMenu: [5, 10, 20, 50, 100],
        }
        this.UserId = this.cs.login_User_Code();//for id
        this.branchid = this.cs.login_UserCurrBranchId()
        this.branchname = this.cs.login_UserCurrBranch();
        // this.branchid = this.cs.login_UserBranchId();
        // this.branchname = this.cs.login_UserBranch()
    }
    dtTrigger: Subject<any> = new Subject<any>()
    dtOptions: DataTables.Settings = {};
    ngOnInit(): void {
        this.router.params.subscribe((res) => {
            let receiptId = res.id
            if (receiptId) {
                this.getItemList(receiptId);
            }
        })
    }
    onCheckboxChange(e: any) {
        alert(e.target.checked);
    }
    getItemList(receiptId: number) {
        this.itemService.getAllReceiptItemMaster(receiptId).subscribe((res: any) => {
            let data = res.data.receiptDetailsView;
            let indexData: Array<number> = [];
            res.data.forEach((val: any, index: number) => {
                val.receiptDetailsView.forEach((val2: any, index2: number) => {
                    if (val2.issuedToBranchId > 0 || val2.issuedToUserId > 0) {
                        indexData.push(val2.receiptId);
                    }
                })
            })
            let outputArray = indexData.filter(function (v, i, self) {
                return i == self.indexOf(v);
            });
            res.data.forEach((val: any, index: number) => {
                outputArray.forEach((val2: number) => {
                    if (val2 === val.receiptId) {
                        val.receiptDetailsView.forEach((val3: any, index3: number) => {
                            this.receiptDate = val.receiptDate.toString();
                            var itemObj = {
                                receiptDetailsId: val3.receiptDetailsId,
                                branchId: val.branchId,
                                branchName: val.branchName,
                                receiptDate: val.receiptDate,
                                itemId: val3.itemId,
                                itemCode: val3.itemCode,
                                itemName: val3.itemName,
                                unitTypeId: val3.unitTypeId,
                                unitTypeName: val3.unitTypeName,
                                qty: val3.qty,
                                serialStart: val3.serialStart,
                                serialEnd: val3.serialEnd,
                                receiptId: val3.receiptId,
                                isChecked: false
                            }
                            this.receiptdetailsList.push(val3);
                        })
                    }
                })
            })
            this.dtTrigger.next(null)
        })

    }
    changeStatus(Id: number, data: any) {
        //this.receiptdetailsList.at(i);
        if (data.isChecked == false) {
            data.isChecked = true;
        }
        else {
            data.isChecked = false;
        }
    }
    receiptSubmit() {
        let itemCount: number = 0;
        let purchaseReceipt: Array<receiptItemList> = [];
        this.receiptdetailsList.forEach((val: any, index: number) => {
            var receiptItemObj = new receiptItemList;
            receiptItemObj.receiptId = val.receiptId;
            receiptItemObj.receiptDate = this.receiptDate;
            receiptItemObj.branchId = this.branchid;
            receiptItemObj.isCanceled = true
            receiptItemObj.updatedBy = 1
            purchaseReceipt.push(receiptItemObj);
        })
        purchaseReceipt.forEach((val2: any, index2: number) => {
            let itemListJson: Array<itemList> = [];
            this.receiptdetailsList.filter(x => x.receiptId == val2.receiptId).forEach((val: any, index: number) => {
                if (val.receiptId === val2.receiptId) {
                    if (val.isChecked == true) {
                        var itemJson = new itemList;
                        itemJson.receiptHistoryId = val.receiptHistoryId;
                        itemJson.receiptDetailsId = val.receiptDetailsId;
                        itemJson.itemId = val.itemId;
                        itemJson.qty = val.qty;
                        itemJson.serialStart = val.serialStart;
                        itemJson.serialEnd = val.serialEnd;
                        itemListJson.push(itemJson);
                    }
                }
            });
            if (itemListJson.length > 0) {
                itemCount = 1;
            }
            val2.purchaseReceiptDtls = itemListJson;
        });
        let objData = Array.from(purchaseReceipt.reduce((m, t) => m.set(t.receiptId, t), new Map()).values());
        let purchaseReceiptObj = {
            purchaseReceipt: objData
        };
        if (itemCount == 0) {
            this.toastrService.error('Please Select the Min 1 Item', 'Error !');
        }
        else {
            this.itemService.submitEditListReceipt(purchaseReceiptObj).subscribe((result) => {
                this.toastrService.success('succesfully Created !', 'Success-200 !');
                this.routes.navigate(['stationery/receipt-master-list']);
            }, err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 422) {
                        debugger
                    }
                    this.toastrService.error('some thing went wrong', 'Error !');
                }
            })
        }
    }
    downloadExcel(tablerefrece: any) {
        let fileName = 'ReceiptMaster.xLsx'
        let element = document.getElementById(tablerefrece.id);
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
        Object.keys(ws).forEach(key => {
            if (ws[key].v === "Action") {
                delete ws[key];
            }
        });
        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        /* save to file */
        XLSX.writeFile(wb, fileName);
    }
}

