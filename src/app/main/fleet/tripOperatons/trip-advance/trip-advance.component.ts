import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-trip-advance',
  templateUrl: './trip-advance.component.html',
  styleUrls: ['./trip-advance.component.scss']
})
export class TripAdvanceComponent implements OnInit {
  submitted=false
  formMaster!:FormGroup
  tripAdvanceList:any
  driverCodeList:any
  constructor(private fb:FormBuilder,private masterService:CountryMasterService,){}
  ngOnInit(): void {
this.formMaster= this.fb.group({
  tripId:[""],
  docketId:[""],
  driverId:[""],
})
this.ApiBinding()
  }

get f(){
  return this.formMaster.controls
}
OnSubmit(){
  this.submitted=true
  if(this.formMaster.invalid){
    return
  }
}


ApiBinding(){
this.masterService.getGeneralMasterByCodeTyoeId(160).subscribe((res:any)=>{
this.tripAdvanceList= res.data

})
this.masterService.getAllDriverMaster().subscribe((res:any)=>{
this.driverCodeList= res.data
console.log(this.driverCodeList)
})
}


}
