export class commonProperties {
    createdBy: Number | undefined;
    updatedBy: Number | undefined;
}
export class itemMaster extends commonProperties {
    itemId: Number | undefined;
    itemCode: String | undefined;
    itemName: String | undefined;
    itemDescription: String | undefined;
    categoryId: Number | undefined;
    categoryName: String | undefined;
    defaultUnitType: Number | undefined;
    defaultUnitTypeName: String | undefined;
    numberOfSheet: Number | undefined;
    isNumbered: String | undefined;
    isActive: String | undefined;
  }
  
  export class trackingData extends commonProperties {
    itemName: String | undefined;
    challanDate: String | undefined;
    issueByBranchName: String | undefined;
    issueToBranchName: String | undefined;
    qty: Number | undefined;
    startSerial: Number | undefined;
    endSerial: Number | undefined;
    challan: String | undefined;
    remarks: String | undefined;
  }  
  export class itemList extends commonProperties {
    itemId: Number | undefined;
    itemName: String | undefined;
    itemCode: String | undefined;
    getSerialStart: String | undefined;
    getSerialEnd: String | undefined;
    receiptDetailsIdList: String | undefined;
    qty: String | undefined;
    serialStart: Number | undefined;
    serialEnd: Number | undefined;
    qtyChange: Number | undefined;
    challanDetailsId: Number | undefined;
    issueDetailsId: Number | undefined;
    unitTypeId: Number | undefined;
    receiptDetailsId: Number | undefined;
    receiptHistoryId: Number | undefined;
  }
  export class purchaseMaster extends commonProperties {
    challanId: Number | undefined;
    challanNo: String | undefined;
    challanDate: String | undefined;
    vendorId: String | undefined;
    branchId: Number | undefined;
    branchName: String | undefined;
    vendorName: String | undefined;
    challanDetailsId: String | undefined;
    itemId: Number | undefined;
    itemName: String | undefined;
    qty: Number | undefined;
    qtyChange: Number | undefined;
    serialStart: Number | undefined;
    serialEnd: Number | undefined;
    isCanceled: String | undefined;
    startNo: Number | undefined;
    endNo: Number | undefined;
    purchaseChallanDtls: Array<itemList> | undefined;
  }
  
  export class issueMaster extends commonProperties {
    issueId: Number | undefined;
    issueDate: String | undefined;
    branchId: String | undefined;
    branchName: String | undefined;
    issuedToBranch: Number | undefined;
    issuedToBranchName: String | undefined;
    issuedToEmployee: Number | undefined;
    issuedToEmployeeName: String | undefined;
    issueDetailsId: Number | undefined;
    itemId: Number | undefined;
    itemName: String | undefined;
    qty: Number | undefined;
    qtyChange: String | undefined;
    serialStart: Number | undefined;
    serialEnd: Number | undefined;
    isActive: String | undefined;
    startNo: Number | undefined;
    endNo: Number | undefined;
    issueDtls: Array<itemList> | undefined;
  }
  
  export class issueserialJson extends commonProperties {
    issueDate: String | undefined;
    branchId: Number | undefined;
    itemId: Number | undefined;
    isNumbered: String | undefined;
    qty: Number | undefined;
    serialStart: Number | undefined;
    serialEnd: Number | undefined;
  }
  
  export class requistionData extends commonProperties {
    branchId: Number | undefined;
    isActive: Boolean | undefined;
    itemId: Number | undefined;
    qtyInHand: Number | undefined;
    requisitionDtls: Array<requistionItem> | undefined;
    requisitionId: any;
  }
  
  export class requistionItem extends commonProperties {
    requisitionDetailsId: Number | undefined;
    itemId: Number | undefined;
    qtyInHand: Number | undefined;
    qtyReq: Number | undefined;
  }
  
  export class receiptMaster extends commonProperties {
    receiptId: Number | undefined;
    receiptDate: Number | undefined;
    receiptAgainstChallanId: Boolean | undefined;
    branchId: Number | undefined;
    branchName: String | undefined;
    isCanceled: Boolean | undefined;
    receiptDetailsId: Number | undefined;
    itemId: String | undefined;
    qty: Number | undefined;
    serialStart: Number | undefined;
    serialEnd: Number | undefined;
    receiptDetailsView: Array<itemList> | undefined;
  }
  
  export class receiptItem extends commonProperties {
    receiptDate: Number | undefined;
    receiptAgainstChallanId: Boolean | undefined;
    branchId: Number | undefined;
    isCanceled: Boolean | undefined;
    receiptDtls: Array<itemList> | undefined;
  }
  export class SplitMaster extends commonProperties {
    splitStockId: Number | undefined;
    splitStockDate: Number | undefined;
    branchId: Number | undefined;
    branchName: Number | undefined;
    itemId: Number | undefined;
    itemCode: Number | undefined;
    itemName: Number | undefined;
    serialStart: Number | undefined;
    serialEnd: Boolean | undefined;
    issueToBranchId: Number | undefined;
    issueToBranchName: Number | undefined;
    splitSerialStart: Number | undefined;
    splitSerialEnd: Boolean | undefined;
    isCanceled: Number | undefined;
  }
  export class SplitJson extends commonProperties {
    splitStockDate: Number | undefined;
    branchId: Number | undefined;
    itemId: Number | undefined;
    serialStart: Number | undefined;
    serialEnd: Number | undefined;
    splitSerialStart: Number | undefined;
    splitSerialEnd: Number | undefined;
    issueToBranchId: Number | undefined;
    isCanceled: Boolean | undefined;
    issueId: Number | undefined;
    splitStockId: Number | undefined;
  }
  export class receiptItemList extends commonProperties {
    receiptId: Number | undefined;
    receiptDate: Date | undefined;
    //receiptAgainstChallanId: Boolean | undefined;
    branchId: Number | undefined;
    isCanceled: Boolean | undefined;
    purchaseReceiptDtls: Array<itemList> | undefined;
  }