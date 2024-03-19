import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketMasterService {

  constructor(private http: HttpClient) { }

  // ......................................ticket..................
  getAllDeptMappingMasterList() {
    let url = environment.baseWebApiUrl + 'varuna/v1/department_mapping/getalldepartmentmapping'
    return this.http.post(url, {});
  }
  getAllDeptMappingDetailsById(stateId: number) {
    let url = environment.baseWebApiUrl + 'varuna/v1/state/getstatebyid'
    return this.http.post(url, { "stateId": stateId });
  }
  createState(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/state'
    return this.http.post(url, data);
  }
  editStateMaster(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/state/updatestate'
    return this.http.put(url, data)
  }
  disableAndEnableItem(data: any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/state/deletestate'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
}