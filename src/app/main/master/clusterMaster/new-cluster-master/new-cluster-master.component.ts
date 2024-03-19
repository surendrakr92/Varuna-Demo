import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, MaxValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { clusterMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-new-cluster-master',
  templateUrl: './new-cluster-master.component.html',
  styleUrls: ['./new-cluster-master.component.scss']
})
export class NewClusterMasterComponent implements OnInit {
 
  formClusterMaster!: FormGroup;
  submitted =false;
  clusterDetailsById:any=""
  UserId:any

  constructor(private formbuilder:FormBuilder, 
    private masterservice:CountryMasterService, 
    private toastrService:ToastrService,private cs:CommonServiceService,//for id
    private routes:Router, private router:ActivatedRoute){
      this.UserId=this.cs.login_User_Code()//for id
    }
  ngOnInit(): void {

    this.formClusterMaster = this.formbuilder.group({
     clusterName:['',[Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9]{2,}(?: [a-zA-Z0-9]+)*$')]],
      isActive:[true],
    })
    this.router.params.subscribe((res) => {

      let clusterMasterId = res.data
      if (clusterMasterId) {
        this.masterservice.getClusterMasterDetailsById(clusterMasterId).subscribe((res: any) => {
          this.clusterDetailsById = res.data
          this.formClusterMaster.patchValue(res.data)
        })
      }
    })
  }
  get f(){
    return this.formClusterMaster.controls
  }
  OnSubmit() {
    this.submitted = true;
    if (this.formClusterMaster.invalid) {
      return
  
    }
    var clusterJson = new clusterMaster
    clusterJson = this.formClusterMaster.value
    this.clusterDetailsById.clusterId == undefined?clusterJson.createdBy = +this.UserId:clusterJson.updatedBy = +this.UserId; clusterJson.clusterId = this.clusterDetailsById.clusterId
    console.log(clusterJson)
    if(this.clusterDetailsById==""){
      this.masterservice.createClusterMaster(clusterJson).subscribe((result) => {
  
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/cluster-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
  
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formClusterMaster.get(err.error.Errors[prop]?.PropertyName);
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
      this.masterservice.editClusterMaster(clusterJson).subscribe((result) => {
  
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/cluster-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
  
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formClusterMaster.get(err.error.Errors[prop]?.PropertyName);
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
