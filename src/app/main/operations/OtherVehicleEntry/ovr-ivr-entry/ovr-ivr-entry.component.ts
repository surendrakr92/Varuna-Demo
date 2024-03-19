import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
import { OperationsService } from 'src/app/services/master-service/operations.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

@Component({
  selector: 'app-ovr-ivr-entry',
  templateUrl: './ovr-ivr-entry.component.html',
  styleUrls: ['./ovr-ivr-entry.component.scss']
})
export class OvrIvrEntryComponent implements OnInit {
dataList:any
  vehicleList:any=[]
  submitted=false
  formMaster!:FormGroup
  TypeList:any
  zoneList:any
  customerTypeList:any
  customerList:any
  branchUser:any=''
  reportList:any
constructor(private operationSeervice:OperationsService,private masterService:CountryMasterService, private cs:CommonServiceService,
   private modalService:ModalPopupService, private fb:FormBuilder, private cusserv: CustomerMasterServiceService,
  private routes:Router){
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }

  
  }
  dtTrigger:Subject<any>=new Subject<any>()
dtOptions: DataTables.Settings = {};
ngOnInit(): void {
  
this.APIBinding()
this.formFilter()

}

formFilter(){
  this.formMaster= this.fb.group({
    typeId:[""],
    zoneId:[""],
    customerGroupId:[""],
    customerId:[""],
    fromDate:[""],
    toDate:[""],
    branchId:[''],
  })
}
get f(){
  return this.formMaster.controls
}

APIBinding(){


  this.masterService.getGeneralMasterByCodeTyoeId(168).subscribe((res: any) => {
    this.TypeList = res.data

  })


  this.masterService.getGeneralMasterByCodeTyoeId(169).subscribe((res: any) => {
    this.customerTypeList = res.data
  })

  this.masterService.getAllZoneList().subscribe((res: any) => {
    this.zoneList = res.data
   
  })

  this.operationSeervice.getAllotherVehicleist().subscribe((res:any)=>{
    this.vehicleList= res.data
this.dtTrigger.next(null)


  })
  this.cusserv.getAllCustomerMaster().subscribe((res: any) => {
    this.customerList = res.data
    console.log(this.customerList)
  
  })
  this.masterService.getAllBranchMasterList().subscribe((res:any)=>{
    this.branchUser= res.data
   
  })

}





redirectionEdit(data:any){
  this.routes.navigate(['/Operations/ovr-ivr-entry/update-ovr-ivr-entry', data.vehicleEntryDetailsId])
}

modelOpen(model: any) {
  debugger
  this.modalService.modalOpenSuccess(
    model,
    popupclass.info,
    true,
    false,
    false,
    popupclass.large
  )
}

OnFilter(){
  this.submitted=true
  if(this.formMaster.invalid){
    return
  }
  this.operationSeervice.FilterOvrEntry(this.formMaster.value).subscribe((res:any)=>{
this.reportList= res.data
console.log(this.reportList)
  })

}
}
