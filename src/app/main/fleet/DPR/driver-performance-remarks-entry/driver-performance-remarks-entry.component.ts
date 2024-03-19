import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { FleetService } from 'src/app/services/master-service/fleet.service';

@Component({
  selector: 'app-driver-performance-remarks-entry',
  templateUrl: './driver-performance-remarks-entry.component.html',
  styleUrls: ['./driver-performance-remarks-entry.component.scss']
})
export class DriverPerformanceRemarksEntryComponent implements OnInit {
  submitted=false
  formMaster!:FormGroup
  driverList:any
  tripDetails:any
  tripData:any=[]
  tripId:string=''
  tripdetailsByTripId:any=[]
  minDatePast: any = new Date().toISOString().slice(0, 10)
constructor(private fb:FormBuilder,private masterService:CountryMasterService,private fleetService:FleetService,
  private toastrService:ToastrService,
  private route:Router){}
ngOnInit(): void {
  this.formMaster= this.fb.group({
    driverId:["",Validators.required],
    dateRemarks:[""],
  })
  this.APIBinding()
this.DateRemark()
}
get f(){
  return this.formMaster.controls
}

OnSerch(){
  this.submitted=true
  if(this.formMaster.invalid){
    return
  }
this.fleetService.getFilterDriverPerformance(this.formMaster.value).subscribe((res:any)=>{
this.tripData=res.data
console.log(this.tripData)
},err=>{
  this.toastrService.error(err.error.Message, 'Error !');
  this.tripData=[]
})
}

APIBinding(){
this.masterService.getAllDriverMaster().subscribe((res:any)=>{
  this.driverList= res.data
  console.log(this.driverList)
})

}

tripSelect=[
  {id:1, type:'TBD'}
]

DateRemark(){

  this.formMaster.controls['dateRemarks'].setValue(this.minDatePast);
}
ontripSelection(data:any){
  this.tripId=data.tripId
  this.tripDetails=data
  console.log(this.tripDetails)
}
createForm(){
  debugger
  let senderJson:any={
    driverId:this.formMaster.controls['driverId'].value,
    driverName:this.tripDetails.firstDriverName,
    manualVslipNo:this.tripDetails.manualVslipNo,
    vehicleNo:this.tripDetails.vslipNo,
    dateOfRemarks:12,
    doj:12,
    driverType:12,
  }
this.route.navigate(['/fleet/driver-performance-remarks-entry/driver-performance-create'])
sessionStorage.setItem('driverPerformance',JSON.stringify(senderJson))
}
}
