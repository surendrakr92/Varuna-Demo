import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountryMaster, generalMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-update-gen-master-list',
  templateUrl: './update-gen-master-list.component.html',
  styleUrls: ['./update-gen-master-list.component.scss']
})
export class UpdateGenMasterListComponent implements OnInit{
  headerLabel: any;
  generalId: any;
  viewPagecom=""
  generalMasterDetailsById:any
  formGeneralMaster!: FormGroup;
  submitted=false
  codeId: any;
  codeTypeId: any;
  UserId:any
  constructor(private routes:ActivatedRoute,private masterservice:CountryMasterService,
    private formbuilder:FormBuilder,
    private router:Router,private cs:CommonServiceService,//for id
    private toastrService:ToastrService){
      this.UserId=this.cs.login_User_Code()//for id
    }
ngOnInit(): void {
  this.formGeneralMaster = this.formbuilder.group({
    codeDesc:['',Validators.required],
    codeAccess:['',Validators.required],
    isActive:[true],
  })
  this.routes.queryParams.subscribe(
    params => {
      this.generalId =  params['generalId'];
      this.headerLabel=params['headerLabel']
      this.viewPagecom=params['validate']
    }
  )  
  this.masterservice.getGeneralMasterById(this.generalId).subscribe((res: any) => {
    this.generalMasterDetailsById = res.data
    this.formGeneralMaster.patchValue(res.data)
    this.codeId=res?.data.codeId
    this.codeTypeId=res?.data.codeTypeId
  })
}
get f() {
  return this.formGeneralMaster.controls;
}
submit() {
  this.submitted = true;
  if (this.formGeneralMaster.invalid) {
    return
  }
  var genmasterJson = new generalMaster
  genmasterJson = this.formGeneralMaster.value
  genmasterJson.generalId =this.generalId
  genmasterJson.codeId =this.codeId
  genmasterJson.codeTypeId=this.codeTypeId
  genmasterJson.codeAccess ="U"
  genmasterJson.isActive = true
  genmasterJson.updatedBy = +this.UserId
console.log(genmasterJson)
  
 
    this.masterservice.editGeneralMaster(genmasterJson).subscribe((result) => {

      this.toastrService.success('succesfully Updated !', 'Success-200 !');
      this.router.navigate(['/master/general-master-list/'],{ queryParams: { codetypeId: this?.codeTypeId,headerDesc:this.headerLabel}})
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger

          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formGeneralMaster.get(err.error.Errors[prop]?.PropertyName);
            //wrong key comes 
            if (formControl) {
              // activate the error message
              formControl.setErrors({
                serverError: err.error.Errors[prop]?.ErrorMessage
              });
            }
          });

        }

        this.toastrService.error(err.error.Message, 'Error !');
      }
    })
  
}
}
