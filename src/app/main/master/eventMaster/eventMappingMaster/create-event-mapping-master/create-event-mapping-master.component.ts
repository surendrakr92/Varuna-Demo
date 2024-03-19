import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event-mapping-master',
  templateUrl: './create-event-mapping-master.component.html',
  styleUrls: ['./create-event-mapping-master.component.scss']
})
export class CreateEventMappingMasterComponent implements OnInit {
 
  formMaster:any= FormGroup
  submitted=false

  constructor(private formbuilder:FormBuilder){}
  ngOnInit(): void {
    this.formMaster= this.formbuilder.group({
      eventDesc: ['',Validators.required],
      next_Events:['',Validators.required],
      isActive:[true]
    })
  }
get f (){
  return this.formMaster.controls
}

  submit(){
    this.submitted= true
    if(this.formMaster.invalid){
      return
    }
  }
}
