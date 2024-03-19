import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-create-role-master',
  templateUrl: './create-role-master.component.html',
  styleUrls: ['./create-role-master.component.scss']
})
export class CreateRoleMasterComponent {
  constructor(private formbuilder: FormBuilder,
    private masterservice: CountryMasterService, private shared_service:SharedService,
    private router: ActivatedRoute,private cs:CommonServiceService,//for id
    private routes: Router,
    private toastrService: ToastrService) { 
      this.UserId=this.cs.login_User_Code()//for id
    }
    UserId:any
  rolemasterForm!: FormGroup;
  submitted!: true
  rolemasterId: any = ""
  viewPagecom=""
  ngOnInit(): void {
    this.rolemasterForm = this.formbuilder.group({
      roleName: ['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9]{5,}(?: [a-zA-Z0-9]+)*$')]],
      description: ['', Validators.required],
      isActive: [true],
      allowNameEdit: [true]
    })
    this.router.params.subscribe((res) => {
      let stateMasterId = res.data || res.viewData
      if(res.data) this.viewPagecom="edit"
      if(res.viewData) this.viewPagecom="view"
      if (stateMasterId) {
        this.masterservice.getRoleMasterById(stateMasterId).subscribe((res: any) => {
          this.rolemasterId = res.data
          this.rolemasterForm.patchValue(res.data)
          
         
        })
      }
    })
  }
  get f() {
    return this.rolemasterForm.controls;
  }
  submit() {
    this.submitted = true;
    if (this.rolemasterForm.invalid) {
      return

    }
    var stateJson = new RoleMaster
    stateJson = this.rolemasterForm.value
    if (this.rolemasterId.roleId == undefined) { stateJson.createdBy = +this.UserId }
    else { stateJson.updatedBy = +this.UserId; stateJson.roleId = this.rolemasterId.roleId }

    console.log(stateJson)
    if (this.rolemasterId == "") {
      this.masterservice.createRoleMaster(stateJson).subscribe((result) => {

        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/role-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.rolemasterForm.get(err.error.Errors[prop]?.PropertyName);
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
      this.masterservice.editRoleMaster(stateJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/role-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.rolemasterForm.get(err.error.Errors[prop]?.PropertyName);
              //wrong key comes 
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: err.error.Errors[prop]?.ErrorMessage
                });
              }
            });

          }
          this.toastrService.error(err.error.Message, `Error status:${err.status}`);        }
      })
    }
  }


  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }
}
