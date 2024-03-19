import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { addressMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-address-master',
  templateUrl: './address-master.component.html',
  styleUrls: ['./address-master.component.scss']
})
export class AddressMasterComponent implements OnInit {
  UserId: any
  cngrCngeMasteraList: any
  allAddressMasterList: any
  constructor(private cs: CommonServiceService, private routes: Router, private toastrService: ToastrService,
    private sserve:SharedService,
    private masterservice: CountryMasterService) {
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
    this.getAllAddressMaster()
  }
  activeInactive(id: any) {
    var json = new addressMaster
    json.addressId = id
    json.updatedBy = this.UserId //for Id  
    this.masterservice.disableAndEnableAddressMaster(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getAllAddressMaster()
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          this.toastrService.error(err.error.Message, 'Error !');
        }

      }
    })
  }
  getAllCngrCngeMaster() {
    this.masterservice.getAllBranchLevelList().subscribe((res: any) => {
      this.cngrCngeMasteraList = res.data
      this.dtTrigger.next(null)
    })
  }

  getAllAddressMaster() {
    this.masterservice.getAllAddressMaster().subscribe((res: any) => {
      this.allAddressMasterList = res.data
      this.dtTrigger.next(null)
    })
  }
  downloadExcel() { 
    this.sserve.downLoadXlsFileLocalsAccJson(this.allAddressMasterList,'addressMaster.xLsx').subscribe((res:any)=>{

    })
  }
  redirectionEdit(id: any) {
    this.routes.navigate(['master/address-master/update-address-master/', id])
  }
}