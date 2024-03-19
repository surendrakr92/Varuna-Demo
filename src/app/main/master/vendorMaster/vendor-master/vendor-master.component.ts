import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';


@Component({
  selector: 'app-vendor-master',
  templateUrl: './vendor-master.component.html',
  styleUrls: ['./vendor-master.component.scss']
})
export class VendorMasterComponent implements OnInit {
  UserId:any
vendorMasterList:any
  constructor(private masterservice:CountryMasterService, private routes:Router, private cs:CommonServiceService,//for id
    ){
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu:[5,10,20,50,100],
      // processing:true,
    } 
  
  }
  dtTrigger:Subject<any>=new Subject<any>()
  dtOptions: DataTables.Settings = {};
ngOnInit(): void {
this.masterservice.getAllVendorMaster().subscribe((res:any)=>{
this.vendorMasterList=res.data
this.dtTrigger.next(null)
})
 
}

downloadExcel(){}
redirectionEdit(id: any) {
  this.routes.navigate(['/master/vendor-master/update-vendor-master/', id])
}
activeInactive(){}
}
