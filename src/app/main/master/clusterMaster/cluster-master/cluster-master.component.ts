import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { clusterMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-cluster-master',
  templateUrl: './cluster-master.component.html',
  styleUrls: ['./cluster-master.component.scss']
})
export class ClusterMasterComponent implements OnInit {
  clusterMasterAllList: any = ""
  json: any;
  checkbox:any
  UserId:any
  constructor(private routes: Router, 
    private masterService: CountryMasterService,   private cs:CommonServiceService,//for id
    private toastrService: ToastrService,
    private modalservice: ModalPopupService) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
    this.UserId=this.cs.login_User_Code()//for id
  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.getClusterMasterList()
    debugger
  }
  getClusterMasterList() {
    this.masterService.getAllClusterMasterList().subscribe((res: any) => {
      this.clusterMasterAllList = res.data;
      console.log(this.clusterMasterAllList);
      this.dtTrigger.next(null)
    })
  }

  redirectionEdit(id: any) {
    this.routes.navigate(['master/cluster-master/update-cluster-master/', id])
  }
  activeInactive(id: any, model: any,data:any) {
   this.json = new clusterMaster
    this.json.clusterId = id
    this.json.updatedBy = this.UserId

      this.modalservice.modalOpenSuccess(model, popupclass.info, true, false, false, popupclass.small)

    
  }
  confirmation(){
 this.masterService.disableAndEnableClusterMaster(this.json).subscribe((res: any) => {
        if (res.succeeded) {
          this.toastrService.success('succesfully changed status', 'Success-200 !');
          $('#MyTable').DataTable().destroy();
          this.modalservice.closeModal()
          this.getClusterMasterList()
        }
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            this.toastrService.error(err.error.Message, 'Error !');
          }

        }
      })
 
  }
  //excel_converter_download
  downloadExcel(tablerefrece:any){
    let fileName='clusterMaster.xLsx'
    let element = document.getElementById(tablerefrece.id);
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element)
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.clusterMasterAllList)
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
  cancelModel(){
      this.modalservice.closeModal()
      let checkbox = <HTMLInputElement>document.getElementById('checkbox1');
      checkbox.checked = !checkbox.checked;
  }
}
