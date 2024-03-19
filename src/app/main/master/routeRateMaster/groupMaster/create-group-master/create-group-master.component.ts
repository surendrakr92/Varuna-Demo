import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { groupMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-create-group-master',
  templateUrl: './create-group-master.component.html',
  styleUrls: ['./create-group-master.component.scss']
})
export class CreateGroupMasterComponent implements OnInit {
  FromMaster!:FormGroup
  submitted=false
  groupMasterList:any
  patchedData:any=''
 UserId:any
  constructor(private fb:FormBuilder, private routes:Router,    private counteryService:CountryMasterService, private toastrService:ToastrService,
    private activeroute:ActivatedRoute,
    private cs:CommonServiceService,//for id
    ){
      this.UserId=this.cs.login_UserId()//for id
    }
  ngOnInit(): void {
this.formControl()
    this.ApiBinding()

this.activeroute.params.subscribe((res)=>{
  let groupMasterId= res.data
  debugger
  if(groupMasterId){
    this.counteryService.getGroupMasterbyid(groupMasterId).subscribe((res:any)=>{
      if(res.succeeded)
      this.patchedData=res.data
     this.FromMaster.patchValue(this.patchedData)
    //  this.FromMaster.controls['groupName'].disable()
    })
  }
})

  }
  get f(){
    return this.FromMaster.controls
  }
formControl(){
  this.FromMaster= this.fb.group({
    groupName:["",Validators.required],
    groupDesc:["", Validators.required],
    isBaseGroup: [true],
    baseGroupId: [0],
    loadedAvgPerKML:[0],
    emptyAvgPerKML:[0],
   excessCash: [0],
    cashValueTypeId:[0],
    excessToll: [0],
    tollValueTypeId:[0],
    isActive:[true],
   })
}


  submit(){
    debugger
this.submitted= true
if(this.FromMaster.invalid){
  return
}
var groupJson = new groupMaster
   groupJson= this.FromMaster.value
   if(this.patchedData.groupId==undefined){groupJson.createdBy =  +this.UserId}
   else{groupJson.updatedBy =  +this.UserId ;groupJson.groupId=this.patchedData.groupId}
   console.log(groupJson)
   if(this.patchedData==""){
    this.counteryService.CreateGroupMaster(groupJson).subscribe((result) => {

      this.toastrService.success('succesfully Created !', 'Success-200 !');
      this.routes.navigate(['master/group-master']);
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger

          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.FromMaster.get(err.error.Errors[prop]?.PropertyName);
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
    this.counteryService.updateGroupMaster(groupJson).subscribe((result) => {

      this.toastrService.success('succesfully Updated !', 'Success-200 !');
      this.routes.navigate(['master/group-master']);
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger

          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.FromMaster.get(err.error.Errors[prop]?.PropertyName);
            if (formControl) {
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




ApiBinding(){
this.counteryService.getAllRouteGroupList().subscribe((res:any)=>{
this.groupMasterList= res.data

})
}

Parameter=[
  {id:1, type:'Percentage'},
  {id:2, type:'Amount'},
]
setupDynValidation(dt:any){
  debugger
  const controlsToClearValidators = [
    "baseGroupId",
    "loadedAvgPerKML",
    "emptyAvgPerKML",
    'excessCash',
    'cashValueTypeId',
    'excessToll',
    'tollValueTypeId'
  ]
  if(this.FromMaster.controls['isBaseGroup'].value==true){
    controlsToClearValidators.forEach(controlName => {
      const c1:any = this.FromMaster.get(controlName);
      c1.clearValidators();
      c1.updateValueAndValidity();
      c1.patchValue(0)
    });
  }else{
    controlsToClearValidators.forEach(controlName => {
      const c2:any = this.FromMaster.get(controlName);
      c2.setValidators([Validators.required]);
      c2.updateValueAndValidity();
    });
  }
}
}
