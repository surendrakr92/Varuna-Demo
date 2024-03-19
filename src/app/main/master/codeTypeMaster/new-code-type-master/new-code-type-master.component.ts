import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { codeTypeMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-new-code-type-master',
  templateUrl: './new-code-type-master.component.html',
  styleUrls: ['./new-code-type-master.component.scss']
})
export class NewCodeTypeMasterComponent implements OnInit {
  formCodeType!: FormGroup;
  submitted = false;
  codeTypeID: any = ""
  UserId:any

  constructor(private formbuilder: FormBuilder, 
    private masterservice: CountryMasterService,
    private toastrService: ToastrService,private cs:CommonServiceService,//for id 
    private routes: Router, private router: ActivatedRoute) {
      this.UserId=this.cs.login_User_Code()//for id
     }
  ngOnInit(): void {
    this.formCodeType = this.formbuilder.group({
      headerDesc: ['', [Validators.required]],
      headerAccess: ['U', Validators.required],
      idDesc: ['', Validators.required],
      nameDesc: ['', Validators.required],
      toSupport: ['', Validators.required],
      isActive: [true]

      
    })
    this.router.params.subscribe((res) => {

      let clusterMasterId = res.data
      if (clusterMasterId) {
        this.masterservice.getcodeTypeById(clusterMasterId).subscribe((res: any) => {
          this.codeTypeID = res.data
          this.formCodeType.patchValue(res.data)
        })
      }
    })
  }
  get f() {
    return this.formCodeType.controls
  }
  OnSubmit() {
    this.submitted = true;
    if (this.formCodeType.invalid) {
      return

    }
    var codetypeJSon = new codeTypeMaster
    codetypeJSon = this.formCodeType.value
    codetypeJSon.headerDesc=(this.formCodeType.controls.headerDesc.value).toUpperCase()
codetypeJSon.toSupport = (this.formCodeType.controls.toSupport.value).toUpperCase()
    this.codeTypeID.codeTypeId == undefined ? codetypeJSon.createdBy = +this.UserId : codetypeJSon.updatedBy = +this.UserId; codetypeJSon.codeTypeId = this.codeTypeID.codeTypeId
    console.log(codetypeJSon)
    if (this.codeTypeID == "") {
      this.masterservice.createCodeType(codetypeJSon).subscribe((result) => {

        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/general-master-configuration']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formCodeType.get(err.error.Errors[prop]?.PropertyName);
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

    } else {
      this.masterservice.editcodeTypeMaster(codetypeJSon).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/general-master-configuration']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formCodeType.get(err.error.Errors[prop]?.PropertyName);
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
  
}