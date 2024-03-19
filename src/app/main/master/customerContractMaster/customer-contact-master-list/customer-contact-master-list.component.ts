import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { popupclass } from 'src/app/models/Class/enum';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';


@Component({
  selector: 'app-customer-contact-master-list',
  templateUrl: './customer-contact-master-list.component.html',
  styleUrls: ['./customer-contact-master-list.component.scss']
})
export class CustomerContactMasterListComponent implements OnInit {
  submitted=false
  formMaster:any=FormGroup
  masterList:any
  constructor(private modalService:ModalPopupService, private masterservice:CustomerMasterServiceService,
     private formbuilder:FormBuilder, private routes:Router ){}
  ngOnInit(): void {
    this.getCustomerMaster()
    this.formMaster= this.formbuilder.group({
      customerCode:['',Validators.required],
      cutomerCode:['',Validators.required],
    })
  }
get f(){ 
  return this.formMaster.controls
}


  modelopen(model: any) {
  
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
  }

  goToBsicInfo(){
    this.routes.navigate(['/master/customer-contract-master/create-customer-contract-master'])
  }
getCustomerMaster(){
  this.masterservice.getAllCustomerMaster().subscribe((res:any)=>{
    this.masterList= res.data
  })
}

}
