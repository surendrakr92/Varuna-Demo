import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { customerGroup } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
@Component({
  selector: 'app-new-customer-group',
  templateUrl: './new-customer-group.component.html',
  styleUrls: ['./new-customer-group.component.scss']
})
export class NewCustomerGroupComponent implements OnInit {
  constructor(private formbuilder: FormBuilder, private masterservice: CountryMasterService,
    private routes: Router,
    private toastrService: ToastrService,private cs:CommonServiceService,//for id
    private router: ActivatedRoute) { 
      this.UserId=this.cs.login_User_Code()//for id
    }
    UserId:any
    btnclick:any
  formGroupMaster!: FormGroup;
  submitted!: true
  customerGroupDetailsById:any=""
  customerList:any=[]
  ngOnInit(): void {
    this.formGroupMaster = this.formbuilder.group({
      groupName: ['', [Validators.required, Validators.pattern("^(?! )[a-zA-Z]{3,}(?: [a-zA-Z0-9]+)*$")]],
      isMainGroup:[false],
      mainGroupId:['',Validators.required],
      isActive: [true]
    })
this.getCustomerGroupMasterList()
this.router.params.subscribe((res) => {
  let customergrpID = res.data
        if (customergrpID) {
    this.masterservice.getCustomerMasterById(customergrpID).subscribe((res: any) => {
      this.customerGroupDetailsById = res.data
      // this.getStateList(res.data.countryId)
      this.formGroupMaster.patchValue(res.data)
    })
  }
})
}

  get f() {
    return this.formGroupMaster.controls;
  }
  getCustomerGroupMasterList(){
    this.masterservice.getAllCustomerMaster().subscribe((res:any)=>{
      this.customerList=res.data
    })
    }
  OnSubmit() {
    debugger
    this.submitted = true;
    if(this.formGroupMaster.controls.isMainGroup.value==false) this.formGroupMaster.controls.mainGroupId.setValue(0)
    if (this.formGroupMaster.invalid) {
     return
    }
    var customerGroupJson = new customerGroup
    customerGroupJson = this.formGroupMaster.value
    if (this.customerGroupDetailsById.custGroupId == undefined) { customerGroupJson.createdBy = +this.UserId }
    else { customerGroupJson.updatedBy = +this.UserId; customerGroupJson.custGroupId = this.customerGroupDetailsById.custGroupId;
      customerGroupJson.groupCode = this.customerGroupDetailsById.groupCode }
    console.log(customerGroupJson)
    if (this.customerGroupDetailsById == "") {
      this.masterservice.createCustomerGroupMaster(customerGroupJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/customer-group']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
                    Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formGroupMaster.get(err.error.Errors[prop]?.PropertyName);
              //wrong key comes 
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: err.error.Errors[prop]?.ErrorMessage
                });
              }
            });

          }
          this.toastrService.error(err.error.Message, `Error status:${err.status}`);
        }
      })
    } else {
      this.masterservice.editCustomerGroupMaster(customerGroupJson).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/customer-group']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formGroupMaster.get(err.error.Errors[prop]?.PropertyName);
              //wrong key comes 
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: err.error.Errors[prop]?.ErrorMessage
                });
              }
            });
          }
          this.toastrService.error(err.error.Message, `Error status:${err.status}`);

        }
      })
    }
  }

  onClick(){
  this.btnclick= 'hideclass';
  }

}
