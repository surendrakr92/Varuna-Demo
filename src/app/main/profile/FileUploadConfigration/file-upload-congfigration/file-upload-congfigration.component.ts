import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { fileUploadCong } from 'src/app/models/Class/profile';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { ProfilesSharedService } from 'src/app/services/profile-service/profiles-shared.service';
declare var $: any
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-file-upload-congfigration',
  templateUrl: './file-upload-congfigration.component.html',
  styleUrls: ['./file-upload-congfigration.component.scss']
})
export class FileUploadCongfigrationComponent {
  UserId: any
  FileUploadCongList: any
  constructor(private cs: CommonServiceService,
    private masterservice: ProfilesSharedService,
    private toastrService:ToastrService,
    private routes: Router) {

    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
    this.UserId = this.cs.login_User_Code()//for id
  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.getAllFileUploadCong()
  }
  getAllFileUploadCong() {
    this.masterservice.getAllFileUploadCong().subscribe((res: any) => {
      this.FileUploadCongList = res.data
      this.dtTrigger.next(null)
    })
  }
  downloadExcel(tablerefrece: any) { 
    let fileName = 'fileUpload.xLsx'
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
  redirectionEdit(id: any) {
    this.routes.navigate(['profile/update-file-uploading-configration/', id])

  }
  activeInactive(id: any) {
    var json =new fileUploadCong
    json.fileSatupId=id
    json.updatedBy=this.UserId   
    this.masterservice.disableAndEnablefiless(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getAllFileUploadCong()
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