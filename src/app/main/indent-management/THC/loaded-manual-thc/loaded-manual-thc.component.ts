import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from 'src/app/models/api-response';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';

@Component({
  selector: 'app-loaded-manual-thc',
  templateUrl: './loaded-manual-thc.component.html',
  styleUrls: ['./loaded-manual-thc.component.scss']
})
export class LoadedManualThcComponent implements OnInit {


  formMaster!:FormGroup
  submitt= false
  submitted=false
  transhitModeList:any
  cityList:any= ""
  vehicletypeList:any
  ftlTypeList:any
  vendorMasterList:any
  vehicleList:any
  constructor(private eventMaster:EventMasterService,private masterService:CountryMasterService, private fb:FormBuilder, private formbuilder:FormBuilder,){}
  ngOnInit(): void {
    this.getfulldetail()
  this.dropDownList()
 
  
  }


  VehicleDrowp= [
    {id:1, type:'Loaded'},
    {id:2, type:'Empty'},
  ]
overLoading= [
  {id:1, type:'Yes'},
  {id:2, type:'No'},
]
  

getfulldetail(){
this.formMaster= this.formbuilder.group({
  isEmptyVehicle:[true],
  manualTHCNo:["", Validators.required],
  thcDate:["", Validators.required],
  routeCategoryId:["", Validators.required],
  vehicleTypeId:["", Validators.required],
  routeCode:["", Validators.required],
  //Loaded:[""],
  scheDeptDate:[""],
  scheDeptTime:[""],
  actDeptDate:[""],
  actDeptTime:[""],
  fromCityId:[""],
  toCityId:[""],
  viacity:[""],
  vendorName:["", Validators.required],
  codeDesc:["", Validators.required],
  vehicleNo:["", Validators.required],
  // Vehicle:[""],
  ftlTypeId:["", Validators.required],
  vehRegdt:["", Validators.required],
  tripSheetNo:[""],
  engineNo:[""],
  chasisNo:[""],
  rcBookNo:[""],
  vehPermitDate:[""],
  vehicleInsuranceDate:[""],
  fitnessCertDate:[""],
  panNo:[""],
  NameLorryOwner:[""],
  address:[""],
  phoneNo:[""],
  flightNo:[""],
  airPort:[""],
  airlineName:[""],
  flightInfo:[""],
  flightSchedule:[""],
  dateTime:[""],
  awbNo:[""],
  trainName:[""],
  trainNo:[""],
  rrNo:[""],
  driverOne:[''],
  driverTwo:[''],
  driverOnePhoneNo:[""],
  driverTwoPhoneNo:[""],
  licenceNoOneDriver:[""],
  licenceNoTwoDriver:[""],
  issueByItoDriverOne:[""],
  issueByItoDriverTwo:[""],
  licenceValidity:[""],
  sealNoIn:[""],
  //actDeptDate:[""],
  lateDeliveryReason:[""],
  loadingSupervisor:[""],
  thcOutRemarks:[""],
  vehicleCap:[""],
  weightLoaded:[""],
  startingKm:[""],
  isOverload:[""],
  Overliad2:[""],
  contractAmount:[""],
  advanceAmount:[""],
  advanceAmountPaidAt:[""],
  loadingDetention:[""],
  loadingCharge:[""],


  tcNo:[""],
  manualTcNo:[""],
  toBhCode:[""],
  totalPackages:[""],
  pkgsNo:[""],
  Actualwt:[""],
  advancePaidId:[""],

  
})
      }

    get f(){
    return this.formMaster.controls
    }  
    
    OnSubmit(){
      this.submitted= true
      if(this.formMaster.invalid)
      return
    }
    
dropDownList(){
  this.masterService.getGeneralMasterByCodeTyoeId(120).subscribe((res:any)=>{
this.transhitModeList= res.data

  })
  this.masterService.getGeneralMasterByCodeTyoeId(63).subscribe((res:any)=>{
    this.vehicletypeList= res.data
    
      })
      this.masterService.getGeneralMasterByCodeTyoeId(81).subscribe((res:any)=>{
        this.ftlTypeList= res.data
        
          })
  this.masterService.getAllCityMasterList().subscribe((res:any)=>{
    this.cityList= res.data 
  })
  this.masterService.getAllVendorMaster().subscribe((res:any)=>{
    this.vendorMasterList= res.data

  })
  this.masterService.getAllVehicleMaster().subscribe((res:any)=>{
this.vehicleList= res.data
console.log(this.vehicleList)
  })
}
changeSelect(event:any){

}
filter(even:any){
console.log(even)
}
chngeCase(event:any){
this.formMaster.controls['panNo'].setValue(event.panNo);

}

}
