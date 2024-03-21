import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-create-mapping-average-matrix',
  templateUrl: './create-mapping-average-matrix.component.html',
  styleUrls: ['./create-mapping-average-matrix.component.scss']
})
export class CreateMappingAverageMatrixComponent implements OnInit {
groupList:any
formMaster!:FormGroup

  constructor(private MasterService:CountryMasterService,private fb:FormBuilder,){}
  ngOnInit(): void {
    this.APIbinding()
    this.formControl()
  }


formControl(){
this.formMaster= this.fb.group({
  groupId:[""],
  startKM:[""],
  endKM:[""],
  startWeight:[""],
  endWeight:[""],
  validityFrom:[""],
  validityTo:[""],
  loadedAvgKM:[""],
})
}



  APIbinding(){
this.MasterService.getAllRouteGroupList().subscribe((res:any)=>{
this.groupList= res.data
})
  }

  addRowForTables(){
    
  }
}
