import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

@Component({
  selector: 'app-manage-digitized-lr',
  templateUrl: './manage-digitized-lr.component.html',
  styleUrls: ['./manage-digitized-lr.component.scss']
})
export class ManageDigitizedLRComponent implements OnInit {
  formMaster!:FormGroup
  submitted=false
  tableShow = false
  constructor(private cs: CommonServiceService, private modalService:ModalPopupService,
    private formbuilder:FormBuilder,private fb:FormBuilder,){}

ngOnInit(): void {
  this.formMaster= this.formbuilder.group({
    docketNo:['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9]{3,}(?: [a-zA-Z0-9]+)*$')]],
  })
}

get f(){
  return this.formMaster.controls
}

searchFilter(){
  this.submitted=true
  if(this.formMaster.invalid){
    return
  }else{
this.tableShow= true
  }
}
}
