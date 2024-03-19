import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { event } from 'jquery';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';

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
showList= false
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

  constructor(private fb:FormBuilder, private masterService2:CustomerMasterServiceService,
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
  this.showboxList= false
  if(this.formMaster.invalid){
    return
    }else{
      this.showboxList= true
    }
    console.log(this.showboxList)
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
  })
  this.MasterService.getAllVendorMaster().subscribe((res:any)=>{
this.vendorList= res.data
console.log(this.vendorList)
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
  this.formMaster2.controls['vehicleNo'].setValue(event.vehicleNo);


// if(event){

// }else{
//   this.showboxList=false
// }

}
dropdownBind(event:any){
 this.formMaster2.controls['panNo'].setValue(event.panNo);
}
}
