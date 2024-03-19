import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

@Component({
  selector: 'app-allow-elr-customer-address-master',
  templateUrl: './allow-elr-customer-address-master.component.html',
  styleUrls: ['./allow-elr-customer-address-master.component.scss']
})
export class AllowELRCustomerAddressMasterComponent implements OnInit {

  formMaster!:FormGroup
  formMaster2!:FormGroup
  submitted=false
  submitt=false
  tableShow = false
  customerList:any
  UserId:any
  constructor(private cs: CommonServiceService, private modalService:ModalPopupService, 
    private masterService:CustomerMasterServiceService, 
    private formbuilder:FormBuilder,private fb:FormBuilder,){

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
  this.formMaster= this.formbuilder.group({
    customerId:['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9]{3,}(?: [a-zA-Z0-9]+)*$')]],
  })
  this.DropDownList()
  this.allCustomer()
}

get f(){
  return this.formMaster.controls
}

searchFilter(){
  this.submitted=true
  if(this.formMaster.invalid){
    return
  }else{
    $('#MyTable').DataTable().destroy();
this.tableShow= true

  }
}
allCustomer(){
  this.formMaster2= this.fb.group({
    addressId:[''],
  })
}
get fs(){
  return this.formMaster2.controls
}


OnUpdate(){

}


DropDownList(){
this.masterService.getAllCustomerMaster().subscribe((res:any)=>{
this.customerList= res.data
console.log(this.customerList);
})
}

DigitigedList=[

  {id:1,type:'Yes'},
  {id:2,type:'No'}
]

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

}
