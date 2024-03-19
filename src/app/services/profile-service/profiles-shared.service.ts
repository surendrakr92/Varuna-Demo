import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fileUploadCong } from 'src/app/models/Class/profile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilesSharedService {

  constructor(private http: HttpClient) { }
  // -----------------fileupload master---------------
  getAllFileUploadCong() {
    let url = environment.baseWebApiUrl + 'varuna/v1/fileupload/getallfileupload'
    return this.http.post(url, {});
  }
  createFileUploadCong(data: fileUploadCong) {
    let url = environment.baseWebApiUrl + 'varuna/v1/fileupload'
    return this.http.post(url, data);
  }
  getFileUploadCongById(fileSatupId: fileUploadCong) {
    let url = environment.baseWebApiUrl + 'varuna/v1/fileupload/getfilebyid'
    return this.http.post(url, { "fileSatupId": fileSatupId });
  }
  updateFileUpload(data: fileUploadCong) {
    let url = environment.baseWebApiUrl + 'varuna/v1/fileupload/updatefile'
    return this.http.put(url, data);
  }
  disableAndEnablefiless(data: fileUploadCong) {
    let url = environment.baseWebApiUrl + 'varuna/v1/fileupload/deletefile'
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    });
  }
}
