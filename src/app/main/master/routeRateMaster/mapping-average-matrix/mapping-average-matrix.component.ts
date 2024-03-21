import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-mapping-average-matrix',
  templateUrl: './mapping-average-matrix.component.html',
  styleUrls: ['./mapping-average-matrix.component.scss']
})
export class MappingAverageMatrixComponent implements OnInit {
  formMaster!:FormGroup
  submitt= false
  groupList:any=""
  matrixList:any=''
  averageRangeList:any=[]
  averageWeightList:any=[]
  constructor(private fb:FormBuilder, private masterService:CountryMasterService,){}
  ngOnInit(): void {
    this.formControl()
    this.ApiBinding()
  }
  
  formControl(){
this.formMaster= this.fb.group({
  groupId:['',Validators.required],
})
  }

get fs(){
  return this.formMaster.controls
}

ApiBinding(){
this.masterService.getAllRouteGroupList().subscribe((res:any)=>{
this.groupList= res.data
})

}


OnSearch(){
  this.submitt= true
  if(this.formMaster.invalid){
    return
  }
  this.masterService.getMatrixAdditionbyGroupId(this.formMaster.value).subscribe((res:any)=>{
  this.matrixList= res.data

  this.averageRangeList= res.data?.averageRange
  this.averageWeightList= res.data?.averageWeight
 
  })
}

}
