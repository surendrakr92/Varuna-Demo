import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { laneMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-new-land-master',
  templateUrl: './new-land-master.component.html',
  styleUrls: ['./new-land-master.component.scss']
})
export class NewLandMasterComponent implements OnInit {

  formLaneMaster:any= FormGroup
  submitted= false
  CityMsaterList:any
  vehicleMasterList:any
  loadTypeMasterList:any
  rateTypeMasterList:any
  laneMsterDetailById:any=""
  UserId:any
  constructor(private formbuilder:FormBuilder,private toastrService:ToastrService,
     private masterservice:CountryMasterService, private routes:Router,
     private activeroute:ActivatedRoute, private route:Router, private cs:CommonServiceService){
      this.UserId=this.cs.login_User_Code()//for id
     }
  ngOnInit(): void {
    this.formLaneMaster= this.formbuilder.group({
      fromCityId:['',Validators.required],
      toCityId:['',Validators.required],
      loadabilityId:['',Validators.required],
      ftlTypeId:['',Validators.required],
      rateTypeId:['',Validators.required],
      isActive:[true]
    })
this.getCityMasterList()
this.getGeneralMasterList()
this.activeroute.params.subscribe((res)=>{
  let laneMasterId= res.data
  if(laneMasterId){
    this.masterservice.getLaneMasterDetailsById(laneMasterId).subscribe((res:any)=>{
      this.laneMsterDetailById= res.data
      this.formLaneMaster.patchValue(res.data)
    })
  }
})
  }
  get f(){
    return this.formLaneMaster.controls
  }
  submit(){
this.submitted=true
if(this.formLaneMaster.invalid){
  return
}
var laneJson = new laneMaster
laneJson = this.formLaneMaster.value
if(this.laneMsterDetailById.laneId==undefined){laneJson.createdBy = +this.UserId}
else{laneJson.updatedBy = +this.UserId;laneJson.laneId=this.laneMsterDetailById.laneId}
console.log(laneJson)
if(this.laneMsterDetailById==""){
  this.masterservice.createLaneMaster(laneJson).subscribe((result) => {

    this.toastrService.success('succesfully Created !', 'Success-200 !');
    this.routes.navigate(['master/lane-master-list']);
  }, err => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 422) {
        debugger

        Object.keys(err.error.Errors).forEach((prop: any) => {
          const formControl = this.formLaneMaster.get(err.error.Errors[prop]?.PropertyName);
          //wrong key comes 
          if (formControl) {
            // activate the error message
            formControl.setErrors({
              serverError: err.error.Errors[prop]?.ErrorMessage
            });
          }
        });

      }
      this.toastrService.error(err.error.Message, `Error statu:${err.status}`);
    }
  })
 
}else{
  this.masterservice.editLaneMaster(laneJson).subscribe((result) => {

    this.toastrService.success('succesfully Updated !', 'Success-200 !');
    this.routes.navigate(['master/lane-master-list']);
  }, err => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 422) {
        debugger

        Object.keys(err.error.Errors).forEach((prop: any) => {
          const formControl = this.formLaneMaster.get(err.error.Errors[prop]?.PropertyName);
          //wrong key comes 
          if (formControl) {
            // activate the error message
            formControl.setErrors({
              serverError: err.error.Errors[prop]?.ErrorMessage
            });
          }
        });

      }
      this.toastrService.error(err.error.Message, `Error statu:${err.status}`);
    }
  })
}

}


  getCityMasterList(){
this.masterservice.getAllCityMasterList().subscribe((res:any)=>{
this.CityMsaterList= res.data
})
  }
getGeneralMasterList(){
  this.masterservice.getGeneralMasterByCodeTyoeId(63).subscribe((res:any)=>{
this.vehicleMasterList= res.data
  })
  this.masterservice.getGeneralMasterByCodeTyoeId(62).subscribe((res:any)=>{
    this.loadTypeMasterList= res.data
  })
  this.masterservice.getGeneralMasterByCodeTyoeId(64).subscribe((res:any)=>{
    this.rateTypeMasterList= res.data
  })
}


}
