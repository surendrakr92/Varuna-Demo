import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StationaryService {

  constructor(private http: HttpClient) { }
  // ----------------purchase challan master--------------------12 sep 2023
 getAllPurchaseMaster() {
  let url = environment.baseWebApiUrl + 'varuna/v1/purchasechallan/getallpurchasechallan'
  return this.http.post(url, {});
}
 
getAllPurchaseListDetailsById(challanId: number) {
  let url = environment.baseWebApiUrl + 'varuna/v1/purchasechallan/getpurchasechallanbyid'
  return this.http.post(url, { "challanId": challanId });
}
 
createPurchasechallan(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/purchasechallan/createpurchasechallan'
  return this.http.post(url, data);
}
 
editPurchaseMaster(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/purchasechallan/updatepurchasechallan'
  return this.http.put(url, data)
}
 
disableAndEnablePChallan(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/purchasechallan/deletepurchasechallan'
  return this.http.delete(url, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body: data
  });
}
 
checkPcSerialNo(data: any){
  let url = environment.baseWebApiUrl + 'varuna/v1/purchasechallan/checkpurchasechallanserialnumber'
  return this.http.post(url, data)
}
 
 // ----------------Stationery issue master--------------------19 sep 2023
 getAllBranchempMaster(branchId : number) {
  let url = environment.baseWebApiUrl + 'varuna/v1/issue/getallissue'
  return this.http.post(url, { "branchId": branchId });
}
 
getAllStationeryissueDetailsById(issueId: number) {
  let url = environment.baseWebApiUrl + 'varuna/v1/issue/getissuebyid'
  return this.http.post(url, { "issueId": issueId });
}
 
createissue(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/issue/createissue'
  return this.http.post(url, data);
}
 
editissue(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/issue/updateissue'
  return this.http.put(url, data)
}
 
 
checkIssueSerialNo(data: any){
  let url = environment.baseWebApiUrl + 'varuna/v1/issue/checkissuestockserialnumber'
  return this.http.post(url, data)
}
 
 
disableAndEnablebranchemp(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/issue/deleteissue'
  return this.http.delete(url, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body: data
  });
}
 
 // ----------------Receipt Master--------------------26 sep 2023
 getAllReceiptMaster(branchId: number) {
  let url = environment.baseWebApiUrl + 'varuna/v1/receipt/getallreceipt'
  return this.http.post(url, {"branchId": branchId});
}
 
 
getAllReceiptMasterbyId(receiptId: number) {
  let url = environment.baseWebApiUrl + 'varuna/v1/receipt/getreceiptbyid'
  return this.http.post(url, {"receiptId": receiptId});
}
 
submitReceipt(data: any){
  let url = environment.baseWebApiUrl + 'varuna/v1/receipt/createreceipt'
  return this.http.post(url, data);
}
 
getAllRequistion(){
  let url = environment.baseWebApiUrl + 'varuna/v1/requisition/getallrequisition'
  return this.http.post(url, {});
}
getAllRequistionListDetailsById(requisitionId: number) {
  let url = environment.baseWebApiUrl + 'varuna/v1/requisition/getrequisitionbyid'
  return this.http.post(url, { "requisitionId": requisitionId });
}
 
 
 
checkRequistionStock(data: any){
  let url = environment.baseWebApiUrl + 'varuna/v1/requisition/checkrequisitionstock'
  return this.http.post(url, data);
}
 
createRequistion(data: any){
  let url = environment.baseWebApiUrl + 'varuna/v1/requisition/createrequisition'
  return this.http.post(url, data);
}
 
updateRequistion(data: any){
  let url = environment.baseWebApiUrl + 'varuna/v1/requisition/updaterequisition'
  return this.http.put(url, data);
}
 
 
getAllTrackingData(serialNumber: number){
  let url = environment.baseWebApiUrl + 'varuna/v1/tracking/getalltracking'
  return this.http.post(url, {"serialNumber": serialNumber});
}
 
//Split Stock
 
getBranchListSplitStock(){
  let url = environment.baseWebApiUrl + 'varuna/v1/splitstock/getallsplitstockbranchlist'
  return this.http.post(url, {});
}
 
getAllSplitStock(){
  let url = environment.baseWebApiUrl + 'varuna/v1/splitstock/getallsplitstock'
  return this.http.post(url, {});
}
getAllSplitStockIssuebyById(branchId: number) {
  let url = environment.baseWebApiUrl + 'varuna/v1/splitstock/getallsplitstockissuebranchbyid'
  return this.http.post(url, { "branchId": branchId });
}
 
 
getSplitStockById(splitStockId: number) {
  let url = environment.baseWebApiUrl + 'varuna/v1/splitstock/getsplitstockbyid'
  return this.http.post(url, { "splitStockId": splitStockId });
}
 
createSplitStock(data: any){
  let url = environment.baseWebApiUrl + 'varuna/v1/splitstock/createsplitstock'
  return this.http.post(url, data);
}
 
updateSplitStock(data: any){
  let url = environment.baseWebApiUrl + 'varuna/v1/splitstock/updatesplitstock'
  return this.http.put(url, data);
}
 // ----------------item master--------------------6 sep 2023
getAllItemMaster() {
  let url = environment.baseWebApiUrl + 'varuna/v1/itemmaster/getallitemmaster'
  return this.http.post(url, {});
}
 
getAllItemListDetailsById(itemId: number) {
  let url = environment.baseWebApiUrl + 'varuna/v1/itemmaster/getitemmasterbyid'
  return this.http.post(url, { "itemId": itemId });
}
createItem(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/itemmaster/createitemmaster'
  return this.http.post(url, data);
}
editItemMaster(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/itemmaster/updateitemmaster'
  return this.http.put(url, data)
}
disableAndEnableItem(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/itemmaster/deleteitemmaster'
  return this.http.delete(url, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body: data
  });
}
submitEditListReceipt(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/receipt/updatereceiptlist'
  return this.http.put(url, data);
}
getAllReceiptItemMaster(branchId: number) {
  let url = environment.baseWebApiUrl + 'varuna/v1/receipt/getallreceiptitem'
  return this.http.post(url, { "branchId": branchId });
}
checkPcSerialNumber(data: any){
  let url = environment.baseWebApiUrl + 'varuna/v1/purchasechallan/checkpurchasechallannumber'
  return this.http.post(url, data)
}
}
