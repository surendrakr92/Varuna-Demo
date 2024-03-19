import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonServiceService } from '../commonService/common-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  constructor(private http: HttpClient,
    private cs: CommonServiceService) { }
  newTripOpen(data:any) {
    let url = environment.baseWebApiUrl + 'varuna/v1/newtripopen'
    return this.http.post(url, data);
  }
  // Driver Performance Remarks Entry
getFilterDriverPerformance(data:any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/dprentryunsettledtrip/getunsettledtripbydriverid'
  return this.http.post(url, data);
}
createDriverPerfHistory(data:any) {
  let url = environment.baseWebApiUrl + 'varuna/v1/driverperformanceremarkentry/createdriverperformanceremarkentry'
  return this.http.post(url, data);
}

}
