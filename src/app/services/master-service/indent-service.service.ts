import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class IndentServiceService {
  constructor(private http: HttpClient) { }
  //indent service  PRQ
  createPrqFetching(data: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/prq";
    return this.http.post(url, data);
  }
  updatePrqFetching(data: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/prq/updateprq";
    return this.http.put(url, data);
  }
  fltrBillAdd(data: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/prq/getaddressbycustid";
    return this.http.post(url, data);
  }
  getCOntractFilter(data: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/prq/getcontractdtlonprq";
    return this.http.post(url, data);
  }
  getAllPRq() {
    let url = environment.baseWebApiUrl + "varuna/v1/prq/getallprq";
    return this.http.post(url, {});
  }
  getconsignerbycustid(custId: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/prq/getconsignerbycustid";
    return this.http.post(url, { custId: custId });
  }
  getconsignerbycustidConsId(consiConseId: any, cityId: any) {
    let url =
      environment.baseWebApiUrl + "varuna/v1/prq/getconsgaddressbyconsginer";
    return this.http.post(url, { consiConseId: consiConseId, cityId: cityId });
  }
  getgetprqbyid(prqId: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/prq/getprqbyid";
    return this.http.post(url, { prqId: prqId });
  }
  //prq closure
  getAllPRqClosure(data: any) {
    let url =
      environment.baseWebApiUrl + "varuna/v1/prqclosure/getallprqclosure";
    return this.http.post(url, data);
  }
  getAllPRqClosureHistory(data: any) {
    let url =
      environment.baseWebApiUrl + "varuna/v1/prqclosure/getprqplacementhistory";
    return this.http.post(url, data);
  }
  CreatePRqClosure(data: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/prqclosure/closeprq";
    return this.http.put(url, data);
  }

//pickup-closure-update
getAllPRqClosureUpdate(data: any) {
  let url =
    environment.baseWebApiUrl + "varuna/v1/prqclosureupdate/getprqclosureupdatedatabyprqno";
  return this.http.post(url, data);
}





  getVehicletypebyvehicleno(vehicleNo: any, prqNo: any) {
    let url =
      environment.baseWebApiUrl +
      "varuna/v1/prqclosure/getvehicletypebyvehicleno";
    return this.http.post(url, {
      vehicleNo: vehicleNo,
      prqNo: prqNo,
    });
  }
  getdigitizedlrbyprq(pickupaddressId: any, consiConseId: any) {
    let url =
      environment.baseWebApiUrl + "varuna/v1/prqclosure/getdigitizedlrbyprq";
    return this.http.post(url, {
      pickupaddressId: pickupaddressId,
      consiConseId: consiConseId,
    });
  }
  getPrQListForAssignVh(data: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/assignvehicletoprq/getprqlistforassignvehicle";
    return this.http.post(url, data);
  }
  Assignvehicletoprq(data: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/assignvehicletoprq";
    return this.http.post(url, data);
  }
  gtVhByBranchId(data: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/assignvehicletoprq/getvehiclelistforprq";
    return this.http.post(url, data);
  }
  //docket
  getDigiData() {
    let url =
      environment.baseWebApiUrl + "varuna/v1/docketentry/getdigitizedprqdata";
    return this.http.post(url, {});
  }
  getDocketDfromVDocket(data: any) {
    let url =
      environment.baseWebApiUrl +
      "varuna/v1/docketentry/getdatafromvalidateddocket";
    return this.http.post(url, data);
  }
  // {
  //   "docketNo": "56738",
  //   "docketDate": "2023-10-03T09:04:41.333Z",
  //   "paybasisId":150,
  //   "custId": 122,
  //   "branchId": 1,
  //   "dlyBranchId": 1,
  //   "tamNo": "string"
  // }
  validateLr(docketNo: any, branchId: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/docketentry/validatelr";
    return this.http.post(url, { docketNo: docketNo, branchId: branchId });
  }
  docketEntry(data: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/docketentry";
    return this.http.post(url, data);
  }
  updateDocket(data: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/docketentry/updatedocket";
    return this.http.post(url, data);
  }
  getallcharges() {
    let url = environment.baseWebApiUrl + "varuna/v1/charge/getallcharges";
    return this.http.post(url, {});
  }
  getalldocketlist() {
    let url =
      environment.baseWebApiUrl + "varuna/v1/docketentry/getalldocketlist";
    return this.http.post(url, {});
  }
  getdigitizeddocketdataByPrq(prqId: number) {
    let url =
      environment.baseWebApiUrl +
      "varuna/v1/docketentry/getdigitizeddocketdata";
    return this.http.post(url, {
      prqId: prqId,
    });
  }
  getDocketDetails(Json: any) {
    let url =
      environment.baseWebApiUrl + "varuna/v1/docketentry/getdocketdetail";
    return this.http.post(url, Json);
  }
  finencialEdit(Json: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/docketentry/docketfinancialedit";
    return this.http.post(url, Json);
  }
  getDataForclublredit(docketNo: string) {
    let url = environment.baseWebApiUrl + "varuna/v1/docketentry/getdataforclublredit";
    return this.http.post(url, {
      "docketNo": docketNo,
      "docketId": 0
    }
    );
  }
  clublrEdit(data: {}) {
    let url = environment.baseWebApiUrl + "varuna/v1/docketentry/clublredit";
    return this.http.post(url, data);
  }
  docketFeedCancel(Json: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/docketcancel/cancelfeededdocket";
    return this.http.post(url, Json);
  }
  docketCancel(Json: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/docketcancel";
    return this.http.post(url, Json);
  }
  docketUnfinalize(Json: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/docketunfinalize";
    return this.http.post(url, Json);
  }
  // manifest
  getManifestDetByFtr(Json: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/manifest/getdocketdetailformanifest";
    return this.http.post(url, Json);
  }
  manifestEntry(Json: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/manifest";
    return this.http.post(url, Json);
  }
  getmanifestdetailByTc(tcNo: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/manifest/getmanifestdetail";
    return this.http.post(url, { "tcNo": tcNo });
  }
  cancelManifest(data: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/manifest/cancelmanifest";
    return this.http.post(url, data);
  }
  // POD
  createScanDocument(data: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/scandocuments";
    return this.http.post(url, data);
  }
  POD_Filter_Approval(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/pod/getdataforpodapprovalcommand'
    return this.http.post(url, data);
  }
  creatPODApproval(data: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/pod/createpodapprovalcommand";
    return this.http.post(url, data);
  }
  AllocationCMdCust(data: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/pod/alllocationcustomertostaffcommand";
    return this.http.post(url, data);
  }
  //Change POD Location
  getPODLocationtDetByFtr(data: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/pod/getdatafromprq";
    return this.http.post(url, data);
  }

  creatPODLocationTarget(data: any) {
    let url = environment.baseWebApiUrl + "varuna/v1/pod/podlocationupdate";
    return this.http.post(url, data);
  }
  // POD & PFM TARGET DAYS
getPODpfmTargetDays(){
  let url = environment.baseWebApiUrl + "varuna/v1/pod/getpodpfmtargetdaysdatabyzoneid";
  return this.http.post(url, {});
}
// CREATE POD & PFM TARGET DAYS
creatPODpfmTarget(data:any){
  let url = environment.baseWebApiUrl + "varuna/v1/pod/createpodpfmtargetdays";
  return this.http.post(url, data);
}
editPODpfmTarget(data:any){
  let url = environment.baseWebApiUrl + "varuna/v1/pod/editpodpfmtargetdays";
  return this.http.post(url, data);
}


//stock update
getDataForStockUpdate(data:any){
  let url = environment.baseWebApiUrl + "varuna/v1/stockupdate/getdataforstockupdate";
  return this.http.post(url, data);
}
// Loaded Auto THC

getmfdatePRQ(data:any){
  let url = environment.baseWebApiUrl + "varuna/v1/thc/getmfdatafromprq";
  return this.http.post(url, data);
}

getopentripbyvehicleno(data:any){
  let url = environment.baseWebApiUrl + "varuna/v1/thc/getopentripbyvehicleno";
  return this.http.post(url, data);
}
}
