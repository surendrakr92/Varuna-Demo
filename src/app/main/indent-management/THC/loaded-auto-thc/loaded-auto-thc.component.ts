import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';

@Component({
  selector: 'app-loaded-auto-thc',
  templateUrl: './loaded-auto-thc.component.html',
  styleUrls: ['./loaded-auto-thc.component.scss']
})
export class LoadedAutoThcComponent implements OnInit{
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
  prqList:any
  loadAutoThcList:any



  minDatePast: any 
    constructor(private fb:FormBuilder, private masterService2:CustomerMasterServiceService, private masterService3:IndentServiceService,
      private formbuilder:FormBuilder, private MasterService:CountryMasterService,){}
    ngOnInit(): void {
      this.getvehicle()
      this.dropDownList()
      this.getfulldetail()
     this.getCurrentDateTime()
   
    
      

    
    }
    getCurrentDateTime(){
      const now = new Date();
      const year = now.getFullYear();
      const month = ('0' + (now.getMonth() + 1)).slice(-2);
      const day = ('0' + now.getDate()).slice(-2);
      const hours = ('0' + now.getHours()).slice(-2);
      const minutes = ('0' + now.getMinutes()).slice(-2);
      const seconds = ('0' + now.getSeconds()).slice(-2);
   
       this.minDatePast= `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
       this.formMaster2.controls['thcdate'].setValue(this.minDatePast)
       this.formMaster2.controls['tcDate'].setValue(this.minDatePast)
       return
    }
  getvehicle(){
    this.formMaster= this.fb.group({
      prqNo:['',Validators.required],
      vehicleNo:[''],
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
      this.masterService3.getmfdatePRQ(this.formMaster.value).subscribe((res:any)=>{
this.loadAutoThcList= res.data
console.log(this.loadAutoThcList)
this.showboxList= true
this.formMaster2.controls['vehicleNo'].setValue(this.loadAutoThcList[0].vehicleno)
this.formMaster2.controls['fromCityId'].setValue(this.loadAutoThcList[0].fromCityId)
this.formMaster2.controls['eventDate'].setValue(this.loadAutoThcList[0].departureDate.slice(0,16))
this.formMaster2.controls['toCityId'].setValue(this.loadAutoThcList[0].toCityId)


      })
      
      
      
      
      // else {
      //   this.showboxList= true
      // }
  }
  
  getfulldetail(){
    this.formMaster2= this.formbuilder.group({
      tcDate:[""],
      thcdate:[""],
      vehicleNo:[""],
      vendorId:[""],
      panNo:[""],
      eventDate:[""],
      routeId:[""],
      fromCityId:[""],
      toCityId:[""],
      sealNoIn:[""],
      tripSheetNo:[""],
     loader:[""],
      remarks:[],

  
  
      
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
         this.masterService3.getAllPRq().subscribe((res:any)=>{
          this.prqList = res.data
          
          })
  
  }
  
  
  
  // buttonList(){
  //   this.showList= !this.showList
  //   this.showIcon=   !this.showIcon
  // }
  
  dropdownBind(event:any){
   this.formMaster2.controls['panNo'].setValue(event.panNo);
  }
  
  // dropVehicleList(event:any){
  // this.formMaster2.controls['vehicleNo'].setValue(event.vehicleNo);
  // }

  }
  