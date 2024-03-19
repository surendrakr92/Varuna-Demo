import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
 
  constructor(private http: HttpClient) { }
  // scan Document  
    createScanDocument(data: any) {
      let url = environment.baseWebApiUrl + "varuna/v1/scandocuments";
      return this.http.post(url, data);
    }
    // empty route request
    createEmptyRouteRequest(data: any) {
      let url = environment.baseWebApiUrl + "varuna/v1/emptymovement";
      return this.http.post(url, data);
    }
    getEmptyRouteRequestById(id: number) {
      let url = environment.baseWebApiUrl + 'varuna/v1/remarkmaster/getemptymovementdata'
      return this.http.post(url, { "id": id });
    }
     // forwarddocuments  
  getAllforwarddocuments(data:any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/forwarddocuments/getallforwarddocuments'
    return this.http.post(url, data);
  }
  forwardDocuments(data:any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/forwarddocuments'
    return this.http.post(url, data);
  }
//Acknowledge Document
 
getAllAcknowlegedocuments(data:any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/forwarddocuments/getallacknowledgedfmocument'
  return this.http.post(url, data);
}
 
// View Document
getAllViewDocument(data:any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/dfm/getalldfmprintview'
  return this.http.post(url, data);
}
getallTrackDocuments(data:any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/updatearrivaldatetime/getalltrackdocuments'
  return this.http.post(url, data);
}
//invoice
uploadnvoice(data:any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/dfm/uploadinvoice'
  return this.http.post(url, data);
}
// dm lcn et
getalldfmlocationedit(data:any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/dfm/getalldfmlocationedit'
  return this.http.post(url, data);
}
updatelocationedit(data:any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/dfm/updatelocationedit'
  return this.http.post(url, data);
}
//arrival dt & tm
updateArrivalDateTime(data:any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/updatearrivaldatetime'
  return this.http.put(url, data);
}
getAllupdatearrivaldatetime(data:any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/updatearrivaldatetime/getallupdatearrivaldatetime'
  return this.http.post(url, data);
}
 //courieer
 getallUpdateCourierdetails(data:any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/updatearrivaldatetime/getallupdatecourierdetails'
  return this.http.post(url, data);
}
updateCourierdetails(data:any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/updatearrivaldatetime/updatecourierdetails'
  return this.http.post(url, data);
}
//Extend E-way Bill Expiry
 
getAllewaybillexpiry(data:any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/ewaybill/getallewaybillexpiry'
  return this.http.post(url, data);
}
 
createexpiry(data:any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/ewaybill/extendewaybillexpiry'
  return this.http.post(url, data);
}
 
billexpiryHistory(data:any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/ewaybill/getdataforewaybillhistory'
  return this.http.post(url, data);
}
 
 
//ovr iv entry
getAllotherVehicleist() {
  let url = environment.baseWebApiUrl + 'varuna/v1/othervehicleentry/getallothervehicledltentry'
  return this.http.post(url, {});
}
 
createOvrEntry(data:any){
  let url = environment.baseWebApiUrl + 'varuna/v1/othervehicleentry/createothervehicleentry'
  return this.http.post(url, data);
}
updateOvrEntry(data:any){
  let url = environment.baseWebApiUrl + 'varuna/v1/othervehicleentry/updateothervehicleentry'
  return this.http.put(url, data);
}
getOtherVehicleentrybyId(id:any){
  let url = environment.baseWebApiUrl + 'varuna/v1/othervehicleentry/getothervehicleentrybyid'
  return this.http.post(url, {
    "vehicleEntryId": id
  });
}
FilterOvrEntry(data:any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/othervehicleentry/getallothervehicleentryreports'
  return this.http.post(url, data);
}

// MvVehicleBlackList
createmvvehicleblack(data:any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/mvvehicleblacklist/mvvehicleblacklistcreate'
  return this.http.post(url, data);
}
updateemvvehicleblack(data:any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/mvvehicleblacklist/updatemvvehicleblacklistbyid'
  return this.http.put(url, data);
}
 
GetByDetailsmvvehicleblack(srNo:number) {
  let url = environment.baseWebApiUrl + 'varuna/v1/mvvehicleblacklist/getmvvehicleblacklistbyid'
  return this.http.post(url,{} );
}
getAllmvvehicleblacklist() {
  let url = environment.baseWebApiUrl + 'varuna/v1/mvvehicleblacklist/getallmvvehicleblacklist'
  return this.http.post(url,{});
}
disableAndEnablemvvehicleblack(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/mvvehicleblacklist/deletemvvehicleblacklist'
  return this.http.delete(url, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body: data
  });
}


}
