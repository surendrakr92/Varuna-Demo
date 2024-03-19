import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { divisionMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-new-division-master',
  templateUrl: './new-division-master.component.html',
  styleUrls: ['./new-division-master.component.scss']
})
export class NewDivisionMasterComponent implements OnInit {

constructor(private formbuilder:FormBuilder,
  private masterservice:CountryMasterService,
  private router:ActivatedRoute,private cs:CommonServiceService,//for id
  private routes:Router,
  public toastrService:ToastrService){
    this.UserId=this.cs.login_User_Code()//for id
  }
  UserId:any
formDivisionMaster!: FormGroup;
submitted!: true
divisionDetailsById:any=""
ngOnInit(): void {
  this.formDivisionMaster = this.formbuilder.group({
    divisionCode:['',[Validators.required, Validators.pattern("^[a-zA-Z]{2,}")]],
    divisionName:['',[Validators.required,Validators.pattern('^(?! )[a-zA-Z]{3,}(?: [a-zA-Z]+)*$')]],
    isActive:[true],
  })
  this.router.params.subscribe((res) => {
    debugger
    let stateMasterId = res.data
    if (stateMasterId) {
      this.masterservice.getDivisionDetailsById(stateMasterId).subscribe((res: any) => {
        this.divisionDetailsById = res.data
        this.formDivisionMaster.patchValue(res.data)
      })
    }
  })
}

get f() {
  return this.formDivisionMaster.controls;
}
submit() {
  this.submitted = true;
  if (this.formDivisionMaster.invalid) {
    return
  }
  var stateJson = new divisionMaster
  stateJson = this.formDivisionMaster.value
  if (this.divisionDetailsById.divisionId == undefined) { stateJson.createdBy = +this.UserId }
  else { stateJson.updatedBy = +this.UserId; stateJson.divisionId = this.divisionDetailsById.divisionId }

  console.log(stateJson)
  if(this.divisionDetailsById==""){
    this.masterservice.createDivisionmaster(stateJson).subscribe((result) => {

      this.toastrService.success('succesfully Created !', 'Success-200 !');
      this.routes.navigate(['master/division-master']);
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger

          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formDivisionMaster.get(err.error.Errors[prop]?.PropertyName);
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
    this.masterservice.editDivisionMaster(stateJson).subscribe((result) => {

      this.toastrService.success('succesfully Updated !', 'Success-200 !');
      this.routes.navigate(['master/division-master']);
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger

          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formDivisionMaster.get(err.error.Errors[prop]?.PropertyName);
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
}
