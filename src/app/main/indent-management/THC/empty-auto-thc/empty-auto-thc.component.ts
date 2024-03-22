import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { event } from 'jquery';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';

@Component({
  selector: 'app-empty-auto-thc',
  templateUrl: './empty-auto-thc.component.html',
  styleUrls: ['./empty-auto-thc.component.scss']
})
export class EmptyAutoTHCComponent implements OnInit{
  evnent:any
formMaster!:FormGroup
formMaster2!:FormGroup
submitt= false
vehicleList:any
submitted= false
showIcon=true
vendorList:any
cityList:any
vendorevnt:any
showboxList= false
routeMasterList:any
totalItems: number = 5; // Initialize total items
searchD: any = ''
itemsPerPage: number = 5;
p: number = 1;
emptyAutoList:any

  constructor(private fb:FormBuilder, private masterService2:CustomerMasterServiceService, private indentService:IndentServiceService,
    private formbuilder:FormBuilder, private MasterService:CountryMasterService,){}
  ngOnInit(): void {
    this.getvehicle()
    this.dropDownList()
    this.getfulldetail()
  }
getvehicle(){
  this.formMaster= this.fb.group({
    vehicleNo:['',Validators.required],
  })

}

get fs(){
return this.formMaster.controls
}
OnSearch(){
  this.submitt= true
  if(this.formMaster.invalid){
    return
    }
    this.indentService.getopentripbyvehicleno(this.formMaster.value).subscribe((res:any)=>{
this.emptyAutoList= res.data
console.log(this.emptyAutoList)
this.formMaster2.controls['vehicleNo'].setValue(this.emptyAutoList[0].vehicleNo);
    })
  
}

getfulldetail(){
  this.formMaster2= this.formbuilder.group({
    thcDate:[""],
    vehicleNo:[""],
    vendorTypeName:[""],
    vendorName:[""],
    eventDate:[""],
    routeId:[""],
    fromCityId:[""],
    toCityId:[""],
    tripSheetNo:[""],


    placementDt:[''],
    vehicleno2:[''],
    vendorId:[''],
    panNo:[''],
   
 
    
  })

}

get f(){
  return this.formMaster2.controls
}

Submit(){
  this.submitted= true
  if(this.formMaster2.invalid){
    return 
   
  }
}


dropDownList(){
  this.MasterService.getAllVehicleMaster().subscribe((res:any)=>{
this.vehicleList= res.data
console.log(this.vehicleList)
  })
  this.MasterService.getAllVendorMaster().subscribe((res:any)=>{
this.vendorList= res.data

  })
  this.MasterService.getAllCityMasterList().subscribe((res:any)=>{
    this.cityList= res.data
   
  })
  let data = {
    cityId: 0,
    pageNumber: this.p,
    pageSize: this.itemsPerPage,
    fromcity: this.searchD,
    tocity: this.searchD
  };

  this.MasterService.getAllRouteMaster(data).subscribe((res:any)=>{
    this.routeMasterList= res.data
    this.totalItems = 1000; 

  })

}
formMng(event:any){
  
  // this.formMaster2.controls['vehicleNo'].setValue(event.vehicleNo);
  // console.log(event)

// if(event){

// }else{
//   this.showboxList=false
// }

}
dropdownBind(event:any){
 this.formMaster2.controls['panNo'].setValue(event.panNo);
}
}
