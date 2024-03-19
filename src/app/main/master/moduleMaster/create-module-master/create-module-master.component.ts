import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountryMaster, ModuleMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-create-module-master',
  templateUrl: './create-module-master.component.html',
  styleUrls: ['./create-module-master.component.scss']
})
export class CreateModuleMasterComponent implements OnInit {
  constructor(private fb: FormBuilder,
    private router: ActivatedRoute, private shared_service:SharedService,
    private toastrService: ToastrService, private cs: CommonServiceService,//for id
    private routes: Router,
    private masterservice: CountryMasterService) {
    this.UserId = this.cs.login_User_Code()//for id
  }
  UserId: any
  moduleMaster!: FormGroup;
  submitted!: true
  moduleById: any = ""
  viewPagecom = ""
  ngOnInit(): void {
    this.moduleMaster = this.fb.group({
      moduleName: ['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9]{5,}(?: [a-zA-Z0-9]+)*$')]],
      moduleImage: ['', Validators.required],
      remarks: ['', [Validators.required]],
      tCodePrefix: ['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9]{1,}(?: [a-zA-Z0-9]+)*$')]],
      routePath: ['', [Validators.required]],
      isActive: [true]
    })
    this.router.params.subscribe((res) => {
      let stateMasterId = res.data || res.viewData
      if (res.data) this.viewPagecom = "edit"
      if (res.viewData) this.viewPagecom = "view"
      if (stateMasterId) {
        this.masterservice.getModuleMasterById(stateMasterId).subscribe((res: any) => {
          this.moduleById = res.data
          this.moduleMaster.patchValue(res.data)


        })
      }
    })
  }
  get f() {
    return this.moduleMaster.controls;
  }
  OnSubmit() {
    this.submitted = true;
    if (this.moduleMaster.invalid) {
      return

    }
    var stateJson = new ModuleMaster
    stateJson = this.moduleMaster.value
    if (this.moduleById.moduleId == undefined) { stateJson.createdBy = +this.UserId }
    else { stateJson.updatedBy = +this.UserId; stateJson.moduleId = this.moduleById.moduleId }

    console.log(stateJson)
    if (this.moduleById == "") {
      this.masterservice.createModuleMaster(stateJson).subscribe((result) => {

        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/module-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.moduleMaster.get(err.error.Errors[prop]?.PropertyName);
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

    } else {
      this.masterservice.editModuleMaster(stateJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/module-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.moduleMaster.get(err.error.Errors[prop]?.PropertyName);
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

  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }

}
