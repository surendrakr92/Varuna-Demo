import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { clusterMapping } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-new-cluster-mapping',
  templateUrl: './new-cluster-mapping.component.html',
  styleUrls: ['./new-cluster-mapping.component.scss']
})
export class NewClusterMappingComponent {
  constructor(private formbuilder: FormBuilder,
     private masterservice: CountryMasterService,
    private routes: Router,private cs:CommonServiceService,//for id
    private toastrService: ToastrService,
    private router: ActivatedRoute) { 
      this.UserId=this.cs.login_User_Code()//for id
    }
    UserId:any
  formClusterMaster!: FormGroup;
  submitted!: true
  clusterMasterDetailsById: any = ""
  clityList:any=""
  clusterList:any=""
  subClusterList:any=""

  ngOnInit(): void {

    this.formClusterMaster = this.formbuilder.group({
      cityId: ['', Validators.required],
      clusterId: ['', Validators.required],
      subClusterId: ['', Validators.required],
      isActive: [true]

    })
    this.getCityList(),
    this.getclusterList(),
    this.getsubCluster()

    this.router.params.subscribe((res) => {

      let stateMasterId = res.data
      if (stateMasterId) {
        this.masterservice.getclusterMappingById(stateMasterId).subscribe((res: any) => {
          this.clusterMasterDetailsById = res.data
          this.formClusterMaster.patchValue(res.data)
        })
      }
    })
  }
  get f() {
    return this.formClusterMaster.controls;
  }
  OnSubmit() {
    this.submitted = true;
    if (this.formClusterMaster.invalid) {
      return

    }
    var clusterMappingJson = new clusterMapping
    clusterMappingJson = this.formClusterMaster.value
    if (this.clusterMasterDetailsById.clusterMappingId == undefined) { clusterMappingJson.createdBy = +this.UserId }
    else { clusterMappingJson.updatedBy = +this.UserId; clusterMappingJson.clusterMappingId = this.clusterMasterDetailsById.clusterMappingId }

    console.log(clusterMappingJson)
    if (this.clusterMasterDetailsById == "") {
      this.masterservice.createclusterMapping(clusterMappingJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/cluster-mapping']);
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
          this.toastrService.error('some thing went wrong', 'Error !');
        }
      })

    } else {
      this.masterservice.editclusterMapping(clusterMappingJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/cluster-mapping']);
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
          this.toastrService.error('some thing went wrong', 'Error !');
        }
      })
    }
  }
getCityList(){
this.masterservice.getAllCityMasterList().subscribe((res:any)=>{
this.clityList=res.data
})
}
getclusterList(){
  this.masterservice.getAllClusterMasterList().subscribe((res:any)=>{
this.clusterList = res.data
  })
}
getsubCluster(){
  this.masterservice.getAllSubClusterMasterList().subscribe((res:any)=>{
this.subClusterList= res.data
  })
}


}
