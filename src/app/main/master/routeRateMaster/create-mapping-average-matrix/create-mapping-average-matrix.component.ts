import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-create-mapping-average-matrix',
  templateUrl: './create-mapping-average-matrix.component.html',
  styleUrls: ['./create-mapping-average-matrix.component.scss']
})
export class CreateMappingAverageMatrixComponent implements OnInit {
groupList:any
formMaster!:FormGroup
submitted=false
test=[]
  constructor(private MasterService:CountryMasterService,private formbuilder:FormBuilder,){}
  ngOnInit(): void {
    this.APIbinding()
    this.formControl()
  }


formControl(){
this.formMaster= this.formbuilder.group({
  startKM: new FormControl(null, Validators.required),
  endKM :new  FormControl(null, Validators.required),
  startWeight: new FormControl(null, Validators.required),
  endWeight: new FormControl(null,Validators.required),
  validityFrom: new FormControl(null,Validators.required),
  validityTo: new FormControl(null,Validators.required),
  loadedAvgKM: new FormControl(null,Validators.required),


  skills: new FormArray([])
})
}


get f(){
  return this.formMaster.controls;
}

addSkills() {
  const control = new FormControl(null, Validators.required);
  (<FormArray>this.formMaster.get('skills')).push(control);
}


removeSkill(i:number) {
  // this.skills.removeAt(i);
}


  APIbinding(){
this.MasterService.getAllRouteGroupList().subscribe((res:any)=>{
this.groupList= res.data
})
  }

  addRowForTables(){
    
  }
}
