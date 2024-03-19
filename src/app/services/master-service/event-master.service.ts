import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { MvVehicleList } from 'src/app/models/Class/marketM';
import { MainCat, Remarks, SubCategory } from 'src/app/models/fleet';
import { EventReasonMaster, divisionMaster } from 'src/app/models/master';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EventMasterService {
  constructor(private http: HttpClient) { }
  //event reason master
  getAllEventReasonMasterList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/eventreasonmaster/getallevents'
    return this.http.post(url, {});
  }
  createEvenReasonmaster(data: EventReasonMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/eventreasonmaster'
    return this.http.post(url, data);
  }
  geteventRDetailsById(reasonId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/eventreasonmaster/geteventbyid'
    return this.http.post(url, { "reasonId": reasonId });
  }
  editReasonMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/eventreasonmaster/updateeventreasonmasterbyid'
    return this.http.put(url, data)
  }
  disableAndEnableEventReasonMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/eventreasonmaster/deleteeventreasonmaster'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  //sub event master
  getAllSubEventMaster() {
    let url = environment.baseWebApiUrl + 'varuna/v1/subeventmaster/getallsubevents'
    return this.http.post(url, {});
  }
  createSubEventmaster(data: EventReasonMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/subeventmaster'
    return this.http.post(url, data);
  }
  getSubEventDetailsById(eventId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/subeventmaster/getsubeventbyid'
    return this.http.post(url, { "eventId": eventId });
  }
  editSubEvent(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/subeventmaster/updatesubeventmasterbyid'
    return this.http.put(url, data)
  }
  disableAndEnableSubEvent(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/subeventmaster/deletesubeventmaster'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  //event master
  getAllMainEventMaster() {
    let url = environment.baseWebApiUrl + 'varuna/v1/eventmaster/getallevents'
    return this.http.post(url, {});
  }
  createEventmaster(data: EventReasonMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/eventmaster'
    return this.http.post(url, data);
  }
  getEventDetailsById(eventId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/eventmaster/geteventbyid'
    return this.http.post(url, { "eventId": eventId });
  }
  editEvent(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/eventmaster/updateeventmasterbyid'
    return this.http.put(url, data)
  }
  disableAndEnableEvent(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/eventmaster/deleteeventmaster'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  //.claim type services.//
  getAllClaimList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/claimtypemapping/getclaimdetails'
    return this.http.post(url, {});
  }
  createClaimType(data: EventReasonMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/claimtypemapping/createclaim'
    return this.http.post(url, data);
  }
  getClaimDetailById(claimDetailId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/claimtypemapping/getclaimdetailsbyid'
    return this.http.post(url, { "claimDetailId": claimDetailId });
  }
  editClaimType(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/claimtypemapping/updateclaimdetails'
    return this.http.put(url, data)
  }
  //vehicle loadability
  getAllVehicleLoadability() {
    let url = environment.baseWebApiUrl + 'varuna/v1/vehicleloadability/getvehicleloadabalitydetails'
    return this.http.post(url, {});
  }
  createVehicleLoadAbility(data: EventReasonMaster) {
    let url = environment.baseWebApiUrl + 'varuna/v1/vehicleloadability'
    return this.http.post(url, data);
  }
  getVehicleLoadAbilityById(detailId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/vehicleloadability/getvehicleloadabalitydetailsbyid'
    return this.http.post(url, { "detailId": detailId });
  }
  editVehicleLoadAbility(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/vehicleloadability/updatevehicleloadabilitymaster'
    return this.http.put(url, data)
  }
  disableAndEnableVehicleLoadAbility(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/vehicleloadability/deletevehicleloadabilitymaster'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
  //---------------- vehicle status---- 15 sep 2023--------
  getAllEventList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/vehiclestatusentry/getbyeventid'
    return this.http.post(url, {});
  }
  //---------------- MV Availability  ---- 18 sep 2023--------
  getAllMsAvalabilityList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/mvavailability/getmvvehicleavailabilitydeatils'
    return this.http.post(url, {});

  }
  // ---------------------------------- mv-vehicleList ---------------- 19 sep 2023------------
  getAllMvVehiclelist() {
    let url = environment.baseWebApiUrl + 'varuna/v1/mvvehiclelist/getunionvehicledetails'
    return this.http.post(url, {});
  }
  createMvVehiclelist(data: MvVehicleList) {
    let url = environment.baseWebApiUrl + 'varuna/v1/mvvehiclelist/unionvehiclelist'
    return this.http.post(url, data);
  }
  getMvVehiclelistDetailsById(unionVehId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/mvvehiclelist/getunionvehicledetailsbyid'
    return this.http.post(url, { "unionVehId": unionVehId });
  }
  editMvVehiclelist(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/mvvehiclelist/updateunionvehiclelist'
    return this.http.put(url, data)
  }
  disableAndEnableMvVehiclelist(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/mvvehiclelist/deleteunionvehiclelist'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
   //____________________ mv-vehicleList_______________01 nov 2023_____
   getAllMvLById(data:any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/mvavailability/getmvvehicleavailabilitydetailsbyid'
    return this.http.post(url, data);
  }
  createMvAvlblty(data:any){
    let url = environment.baseWebApiUrl + 'varuna/v1/mvavailability/createunionvehicleavailibility'
    return this.http.post(url, data);
  }
  updateMvAvlblty(data:any){
    let url = environment.baseWebApiUrl + 'varuna/v1/mvavailability/updatemvvehicleavailabilitylist'
    return this.http.put(url, data);
  }
  cancelMvAvlblty(data:any){
    let url = environment.baseWebApiUrl + 'varuna/v1/mvavailability/deletemvvehicleavailabilitylist'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    })
  }
  //______________________vehicle status entry ________________________
  getAllVStsList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/vehiclestatusentry/getallvehileslist'
    return this.http.post(url, {});
  }
  getDataByVehId(vehicleNo: string) {
    let url = environment.baseWebApiUrl + 'varuna/v1/vehiclestatusentry/getbyvehicleno'
    return this.http.post(url, { "vehicleNo": vehicleNo });
  }
  getColByEvId(eventId: number, vehicleNo: string,isType:Boolean) {
    let url = environment.baseWebApiUrl + 'varuna/v1/vehiclestatusentry/getallcolumnsbyeventid'
    return this.http.post(url, { "eventId": eventId, "vehicleNo": vehicleNo,"isType":isType });
  }
  createVSEntry(data:any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/vehiclestatusentry'
    return this.http.post(url,data);
  }
  patchLocDes(prqNo:string,vehicleNo:string,eventId:any,branchId:any){
    let url = environment.baseWebApiUrl + 'varuna/v1/vehiclestatusentry/getprqdtl'
    return this.http.post(url,{
      "prqNo": prqNo,
      "vehicleNo": vehicleNo,
      "eventId": eventId,
      "branchId": branchId
    });
  }
// Load ability Mapping
getAllLoadAbilitymappingList() {
  let url = environment.baseWebApiUrl + 'varuna/v1/loadabilitymapping/getallloadability'
  return this.http.post(url, {});
}
createAllLoadAbilitymapping(data: EventReasonMaster) {
  let url = environment.baseWebApiUrl + 'varuna/v1/loadabilitymapping'
  return this.http.post(url, data);
}
getLoadAbilitymappingById(recordId: number) {
  let url = environment.baseWebApiUrl + 'varuna/v1/loadabilitymapping/getloadabilitybyid'
  return this.http.post(url, { "recordId": recordId });
}
editLoadAbilitymapping(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/loadabilitymapping/updateloadabilitybyid'
  return this.http.put(url, data)
}
disableAndEnableLoadAbilitymapping(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/loadabilitymapping/deleteloadability'
  return this.http.delete(url, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body: data
  });
}
getLoabilityMaByVhType(){
  let url = environment.baseWebApiUrl + 'varuna/v1/loadabilitymapping/getallcustomervehilcetype'
  return this.http.post(url, {})
}
// ----------------------------Main Category Master--------------------
getAllMaincategoryMasterList() {
  let url = environment.baseWebApiUrl + 'varuna/v1/maincategorymaster/getallmaincategorymaster'
  return this.http.post(url, {});
}
 
createMainCategory(data: MainCat) {
  let url = environment.baseWebApiUrl + 'varuna/v1/maincategorymaster/createmaincategory'
  return this.http.post(url, data);
}
getMainCategoryDetailsById(catId: number) {
  let url = environment.baseWebApiUrl + 'varuna/v1/maincategorymaster/getmaincategorymaster?catId='+catId
  return this.http.get(url);
}
editMainCategory(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/maincategorymaster/updatemaincategorymaster'
  return this.http.put(url, data)
}
 
 
// ----------------------------Sub Category Master--------------------
getAllSubcategoryMasterList() {
  let url = environment.baseWebApiUrl + 'varuna/v1/subcategory/getallsubcategorymaster'
  return this.http.post(url, {});
}
 

createSubCategory(data: SubCategory) {
  let url = environment.baseWebApiUrl + 'varuna/v1/subcategory/createsubcategory'
  return this.http.post(url, data);
}
getSubCategoryDetailsById(subCatId: number) {
  let url = environment.baseWebApiUrl + 'varuna/v1/subcategory/getsubcategory?subCatId='+subCatId
  return this.http.get(url);
}
editSubCategory(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/subcategory/updatesubcategory'
  return this.http.put(url, data)
}

 
// ----------------------------Remarks  Master--------------------
getAllRemarkMasterList() {
  let url = environment.baseWebApiUrl + 'varuna/v1/remarkmaster/getallremarkmaster'
  return this.http.post(url, {});
}
 
createRemarkCategory(data: Remarks) {
  let url = environment.baseWebApiUrl + 'varuna/v1/remarkmaster/createremarkmaster'
  return this.http.post(url, data);
}
getRemarkDetailsById(remarksID: number) {
  let url = environment.baseWebApiUrl + 'varuna/v1/remarkmaster/getremarkmasterbyid?remarksID='+remarksID
  return this.http.get(url);
}
editRemark(data: any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/remarkmaster/updateremarkmaster'
  return this.http.put(url, data)
}
}
