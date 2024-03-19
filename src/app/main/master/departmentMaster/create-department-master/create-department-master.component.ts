import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { departmentMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-create-department-master',
  templateUrl: './create-department-master.component.html',
  styleUrls: ['./create-department-master.component.scss']
})
export class CreateDepartmentMasterComponent implements OnInit {
  constructor(private formbuilder: FormBuilder,
    private masterservice: CountryMasterService,
    private router: ActivatedRoute,
    private shared_service:SharedService,
    private routes: Router,private cs:CommonServiceService,//for id
    private toastrService: ToastrService) {
      this.UserId=this.cs.login_User_Code()//for id
     }
     UserId:any
  formdepartmentMaster!: FormGroup;
  submitted!: true
  departmentmasterById: any = ""
  viewPagecom=""
  ngOnInit(): void {
    this.formdepartmentMaster = this.formbuilder.group({
      departmentName: ['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9]{5,}(?: [a-zA-Z0-9]+)*$')]],
      isActive: [true],
      darwinDeptId:['test']
      
    })
    this.router.params.subscribe((res) => {
      let stateMasterId = res.data || res.viewData
      if(res.data) this.viewPagecom="edit"
      if(res.viewData) this.viewPagecom="view"
      if (stateMasterId) {
        this.masterservice.getDepartmentMasterById(stateMasterId).subscribe((res: any) => {
          this.departmentmasterById = res.data
          this.formdepartmentMaster.patchValue(res.data)
          
         
        })
      }
    })
  }
  get f() {
    return this.formdepartmentMaster.controls;
  }
  submit() {
    this.submitted = true;
    if (this.formdepartmentMaster.invalid) {
      return

    }
    var stateJson = new departmentMaster
    stateJson = this.formdepartmentMaster.value
    if (this.departmentmasterById.deptId == undefined) { stateJson.createdBy = +this.UserId }
    else { stateJson.updatedBy = +this.UserId; stateJson.deptId = this.departmentmasterById.deptId }

    console.log(stateJson)
    if (this.departmentmasterById == "") {
      this.masterservice.createDepartmentMaster(stateJson).subscribe((result) => {

        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/department-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formdepartmentMaster.get(err.error.Errors[prop]?.PropertyName);
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
      this.masterservice.editDepartmentMaster(stateJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/department-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formdepartmentMaster.get(err.error.Errors[prop]?.PropertyName);
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
  print(){
    let element_id="viewData_information"
    this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
    })
  }
}
