import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { popupclass } from 'src/app/models/Class/enum';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

@Component({
  selector: 'app-courier-details-update',
  templateUrl: './courier-details-update.component.html',
  styleUrls: ['./courier-details-update.component.scss']
})
export class CourierDetailsUpdateComponent implements OnInit {



  formMaster!:FormGroup
  submitted=false
  formMaster2!:FormGroup
  submitted2=false

  payBasicList:any
  constructor(private fb:FormBuilder,private masterServie:CountryMasterService,private modalService:ModalPopupService,){}
ngOnInit(): void {
  this.formMaster= this.fb.group({
    fmno:["", Validators.required]
  })
  this.APIBind()
}
get f(){
  return this.formMaster.controls
}
get fs(){
  return this.formMaster2.controls
}


onSubmit(){
  this.submitted= true
  if(this.formMaster.invalid){
    return

  }
}

documentList= [
  {id:1, type:'Bill'},
  {id:2, type:'POD'},
]
selectDateList= [
  {id:1, type:'Select Date range.'},
  {id:2, type:'Last Week'},
  {id:3, type:'Today'},
  {id:4, type:'Till Date'},

]

APIBind(){
  this.masterServie.getGeneralMasterByCodeTyoeId(33).subscribe((res:any)=>{
this.payBasicList= res.data
console.log(this.payBasicList)
  })
}
modelOpen(model: any) {
  debugger
  this.modalService.modalOpenSuccess(
    model,
    popupclass.info,
    true,
    false,
    false,
    popupclass.medium
  )
}


searchFilter(){
this.submitted= true
if(this.formMaster.invalid){
  return
}

}
SubmitFrom(){}
}
