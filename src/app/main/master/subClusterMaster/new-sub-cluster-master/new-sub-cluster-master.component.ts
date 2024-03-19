import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response';
import { subClusterMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-new-sub-cluster-master',
  templateUrl: './new-sub-cluster-master.component.html',
  styleUrls: ['./new-sub-cluster-master.component.scss']
})
export class NewSubClusterMasterComponent implements OnInit {

  constructor(private formbuilder: FormBuilder,
     private masterservice: CountryMasterService,
    private routes:Router, private cs:CommonServiceService,//for id
    private toastrService:ToastrService,
    private router: ActivatedRoute) {
      this.UserId=this.cs.login_User_Code()//for id
     }
     UserId:any
  formSubClusterMaster!: FormGroup;
  submitted!: true
  cityList:any=[]
  subclusterDetailById: any = ""
  stateList: any = []
  countryList:any=[]
  clusterList:any=[]
  ngOnInit(): void {
    this.formSubClusterMaster = this.formbuilder.group({
      clusterId:['',Validators.required],
      subCityId:['',Validators.required],
      subClusterName: ['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9]{2,}(?: [a-zA-Z0-9]+)*$')]],
      isActive: [true]
    })
    this.getStateList()
    this.getClusterList()
    this.getCountryList()
 
    this.router.params.subscribe((res) => {
    
      let subClusterId = res.data
      if (subClusterId) {
        this.masterservice.getSubClusterMasterDetailsById(subClusterId).subscribe((res: any) => {
          this.subclusterDetailById = res.data
          this.getAllSubCity(res.data.subCityName)
          this.formSubClusterMaster.patchValue(res.data)
        })
      }
    })
  }
  get f() {
    return this.formSubClusterMaster.controls;
  }
  OnSubmit() {
    debugger
    this.submitted = true;
    if (this.formSubClusterMaster.invalid) {
      return

    }
    var subClusterMasterJson = new subClusterMaster
    subClusterMasterJson = this.formSubClusterMaster.value
    if (this.subclusterDetailById.subClusterId == undefined) { subClusterMasterJson.createdBy = +this.UserId }
    else { subClusterMasterJson.updatedBy = +this.UserId; subClusterMasterJson.subClusterId = this.subclusterDetailById.subClusterId }

    console.log(subClusterMasterJson)
    if(this.subclusterDetailById==""){
      this.masterservice.createSubClusterMaster(subClusterMasterJson).subscribe((result) => {

        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/sub-cluster-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formSubClusterMaster.get(err.error.Errors[prop]?.PropertyName);
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
      this.masterservice.editSubClusterMaster(subClusterMasterJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/sub-cluster-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formSubClusterMaster.get(err.error.Errors[prop]?.PropertyName);
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
  getStateList() {
    this.masterservice.getAllStateMasterList().subscribe((res: any) => {
      this.stateList = res.data;
    })
  }
  getCountryList(){
    this.masterservice.getAllCountryList().subscribe((res:any)=>{
this.countryList= res.data;
    })
    // this.masterservice.getAllCityMasterList(0).subscribe((res: any) => {
    //   this.cityList = res.data as ApiResponse;

    // })
  }
  getClusterList(){
    this.masterservice.getAllClusterMasterList().subscribe((res:any)=>{
this.clusterList=res.data;
console.log(this.clusterList);
    })
  }
  getAllSubCity(textSearch: any) {
    let data = {
      cityId: 0,
      pageNumber: 0, // Use this.p for page number
      pageSize: 0,
      searchD: textSearch//==0?'5000':textSearch
    };
    this.masterservice.getAllSubCityMasterList(data).subscribe((res:any)=>{
      this.cityList= res.data
    })
  }
  dropDownForbinding(selectedItem: any, eventTes: string) {
    if (eventTes == 'city') {
      if(selectedItem?.target?.value.length>4)this.getAllSubCity(selectedItem?.target?.value)
    } 
  }
}
