import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { popupclass } from 'src/app/models/Class/enum';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

@Component({
  selector: 'app-dfmlocation-edit',
  templateUrl: './dfmlocation-edit.component.html',
  styleUrls: ['./dfmlocation-edit.component.scss']
})
export class DFMLocationEditComponent implements OnInit {
  formMaster!:FormGroup
  submitted=false
  formMaster2!:FormGroup
  submitted2=false
  constructor(private fb:FormBuilder, private formbuilder:FormBuilder,private modalService:ModalPopupService,){}
  ngOnInit(): void {
    this.formMaster= this.fb.group({
      fmno:["", Validators.required]
    })
 this.form2()
  }

form2(){
  this.formMaster2= this.formbuilder.group({
    DockNo:["", Validators.required],
    fmno:[""],
    fmdate:[""],
    Doc_FWD_To:[""],
  })
}

  get f(){
    return this.formMaster.controls
  }

get fs(){
  return this.formMaster2.controls
}


  searchFilter(){

  }

  onSubmit(){
    this.submitted2= true
    if(this.formMaster.invalid){
return
    }
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
  
}
