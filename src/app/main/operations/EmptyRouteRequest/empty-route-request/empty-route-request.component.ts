import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { emptyRoute } from 'src/app/models/operation';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { OperationsService } from 'src/app/services/master-service/operations.service';

@Component({
  selector: 'app-empty-route-request',
  templateUrl: './empty-route-request.component.html',
  styleUrls: ['./empty-route-request.component.scss']
})
export class EmptyRouteRequestComponent implements OnInit {
  formMaster!:FormGroup
  submitted=false
  cityList:any
  MovementTypeList:any
  vehicleList:any
  emptyRouteDetailById:any
  userId:any
  userName:any
  eventMaster: any;
  minDatePast: any = new Date().toISOString().slice(0, 10)
  // tommarrow:any=new Date(new Date().getTime()+24 *60 *60 *1000).toISOString().slice(0,10)
  modalService: any;
constructor(private fb:FormBuilder,private cs:CommonServiceService,
   private masterService:CountryMasterService,private toastrService:ToastrService, 
    private activeRoute:ActivatedRoute, private operationService:OperationsService,){
  this.dtOptions = {
    // pagingType: 'full_numbers',
    lengthMenu: [5, 10, 20, 50, 100],
    // processing:true,
  }
  this.userId=this.cs.login_UserId()//for id
  this.userName=this.cs.login_UserName()//for id
}
dtTrigger:Subject<any>=new Subject<any>()
dtOptions: DataTables.Settings = {};
ngOnInit(): void {

this.formVlidation()
this.login()
this.APIBinding()
}

get f(){
  return this.formMaster.controls
}

formVlidation(){
  this.formMaster= this.fb.group({
    fromCityId:["",Validators.required],
    toCityId:["",Validators.required],
    movTypeId:["",Validators.required],
    vehicleId:["",Validators.required],
    vehicleNo:[""],
    validFrom:["",Validators.required],
    validTo:["",Validators.required],
    requestedDate:[""],
    requestedBy:[""],
  })
}


login(){
  this.formMaster.controls['requestedBy'].setValue(this.userName);
  this.formMaster.controls['requestedDate'].setValue(this.minDatePast);

}

SubmitFrom(){
  this.submitted= true
  if(this.formMaster.invalid){
    return

  }var emptyRouteJson = new emptyRoute
  emptyRouteJson = this.formMaster.value
  emptyRouteJson['createdBy']=this.userId
  console.log(emptyRouteJson)
  this.operationService.createEmptyRouteRequest(emptyRouteJson).subscribe((res:any)=>{
    this.toastrService.success('succesfully Created !', 'Success-200 !');
    this.APIBinding()
    this.formMaster.reset()

    
  },err=>{
    if (err instanceof HttpErrorResponse) {
      if (err.status === 422) {
        debugger

        Object.keys(err.error.Errors).forEach((prop: any) => {
          const formControl = this.formMaster.get(err.error.Errors[prop]?.PropertyName);
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




APIBinding(){
this.masterService.getAllCityMasterList().subscribe((res:any)=>{
this.cityList= res.data
console.log(this.cityList)
})
this.masterService.getGeneralMasterByCodeTyoeId(159).subscribe((res:any)=>{
this.MovementTypeList= res.data

})
this.masterService.getAllVehicleMaster().subscribe((res:any)=>{
this.vehicleList= res.data

})
}

}
