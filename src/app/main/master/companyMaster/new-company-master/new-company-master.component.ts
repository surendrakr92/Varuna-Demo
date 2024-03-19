import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { companyMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-new-company-master',
  templateUrl: './new-company-master.component.html',
  styleUrls: ['./new-company-master.component.scss']
})
export class NewCompanyMasterComponent implements OnInit {
constructor(private formbuilder:FormBuilder,
   private masterservice:CountryMasterService,private cs:CommonServiceService,//for id
  private toastrService:ToastrService,
  private routes:Router,
  private router:ActivatedRoute){
    this.UserId=this.cs.login_User_Code()//for id
  }
  UserId:any
formCompanyMaster!: FormGroup;
  submitted!: true
  countryList:any=[]
  stateList:any=[]
  cityList:any=[] 
  companyDetailsById:any=""
  dtTrigger:Subject<any>=new Subject<any>()
  dtOptions: DataTables.Settings = {};

ngOnInit(): void {    
  this.formCompanyMaster = this.formbuilder.group({
    countryId: ['', Validators.required],
    stateId: ['', Validators.required],
    cityId: ['', Validators.required],
    shortCode: ['', [Validators.required, Validators.pattern("^[a-zA-Z]{2,}")]],
    companyName: ['', [Validators.required,Validators.pattern('^(?! )[a-zA-Z0-9]{2,}(?: [a-zA-Z0-9]+)*$')]],
    addressLine1: ['', [Validators.required,Validators.pattern(/^(?!\s).*/)]],
    addressLine2: ['',Validators.pattern(/^(?!\s).*/)],
    isActive: [true]
    
  })
this.getCountryList() 
this.getstateList() 
this.getcityList()
this.router.params.subscribe((res) => {
  let stateMasterId = res.data
  if (stateMasterId) {
    debugger
    this.masterservice.getCompanyDetailsById(stateMasterId).subscribe((res: any) => {
      this.companyDetailsById = res.data
      this.getstateList(res.data.countryId)
      this.getcityList(res.data.stateId)
      setTimeout(() => {
        this.formCompanyMaster.patchValue(res.data)
      }, 1000);
    })
  }
})
}
get f() {
  return this.formCompanyMaster.controls;
}
getCountryList() {
  this.masterservice.getAllCountryList().subscribe((res: any) => {
    this.countryList = res.data
  })
}

getstateList(data?:any) {
  this.masterservice.getAllStateMasterList(data).subscribe((res: any) => {
    this.stateList = res.data;
  })


}
getcityList(data?:any){
this.masterservice.getAllCityByStateId(data).subscribe((res:any)=>{
this.cityList=res.data;
})
}
 


OnSubmit() {
  this.submitted = true;
  if (this.formCompanyMaster.invalid) {
    return

  }
  var stateJson = new companyMaster
  stateJson = this.formCompanyMaster.value
  if (this.companyDetailsById.companyId == undefined) { stateJson.createdBy = +this.UserId }
  else { stateJson.updatedBy = +this.UserId; stateJson.companyId = this.companyDetailsById.companyId }

  console.log(stateJson)
  if(this.companyDetailsById==""){
    this.masterservice.createCompanymaster(stateJson).subscribe((result) => {

      this.toastrService.success('succesfully Created !', 'Success-200 !');
      this.routes.navigate(['master/company-master']);
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger

          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formCompanyMaster.get(err.error.Errors[prop]?.PropertyName);
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
    this.masterservice.editCompanyMaster(stateJson).subscribe((result) => {

      this.toastrService.success('succesfully Updated !', 'Success-200 !');
      this.routes.navigate(['master/company-master']);
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger

          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formCompanyMaster.get(err.error.Errors[prop]?.PropertyName);
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
dropdownBindState(data: any,a:any) {
  debugger
  if(a==1){
    this.formCompanyMaster.controls['stateId'].setValue('')
    this.getstateList(data)
    return
  }else{
    this.formCompanyMaster.controls['cityId'].setValue('')
    this.getcityList(data)
  }
  }
}
