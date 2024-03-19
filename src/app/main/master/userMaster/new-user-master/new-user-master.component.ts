import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-new-user-master',
  templateUrl: './new-user-master.component.html',
  styleUrls: ['./new-user-master.component.scss']
})
export class NewUserMasterComponent {
  constructor(private formbuilder: FormBuilder,
    private masterservice: CountryMasterService,
    private routes: Router, private cs: CommonServiceService,//for id
    private toastrService: ToastrService,
    private router: ActivatedRoute) {
    this.UserId = this.cs.login_User_Code()//for id
  }
  UserId: any
  formUserMaster!: FormGroup;
  submitted!: true
  userMasterDetailsById: any = ""
  branchMasterList:any
  userType: any = []
  bankList:any=[]
  userStatuslist=[
    {
      id:"1",
      name:"Active"
    },
    {
      id:"2",
      name:"In Active"
    },
    {
      id:"3",
      name:"Locked"
    }
  ]
  ngOnInit(): void {
    this.formUserMaster = this.formbuilder.group({
      userCode: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{8,}")]],
      password: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
      userType: ['', Validators.required],
      userStatus: ['', Validators.required],
      name: ['', [Validators.required, Validators.pattern(/^(?!\s).*/)]],
      gender: ['', Validators.required],
      mobileno: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      dob: ['', Validators.required],
      doj: ['', Validators.required],
      resiAddress: ['', Validators.required],
      emistId: [''],
      emailId: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$")]],
      phoneNo: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      defaultWorkingBranchId: ['', [Validators.required]],
      bankId: ['', [Validators.required]],
      bankAccountNo: ['', [ Validators.pattern("^((\\+91-?)|0)?[0-9]{12}$")]],
      ifscCode: ['', [ Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')]],
      isActive: [true]
    })
    this.formUserMaster.controls['userStatus'].setValue(1)
    this.gentDropDown()
    this.router.params.subscribe((res) => {
      let userId = res.data
      if (userId) {
        this.masterservice.getUserMasterDetailsById(userId).subscribe((res: any) => {
          this.userMasterDetailsById = res.data
          this.formUserMaster.patchValue(res.data)
        })
      }
    })
  }
  get f() {
    return this.formUserMaster.controls;
  }
  gentDropDown() {
    this.masterservice.getGeneralMasterByCodeTyoeId(139).subscribe((res) => {
      this.userType = Object.assign(res).data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(28).subscribe((res) => {
      this.bankList = Object.assign(res).data
    })
    this.masterservice.getAllBranchMasterList().subscribe((res: any) => {
      this.branchMasterList = res.data;
    });
  }
  onsubmit() {
    debugger
    this.submitted = true;
    if (this.formUserMaster.invalid) {
      return
    }
    var userMasterJson = new userMaster
    userMasterJson = this.formUserMaster.value
    if (this.userMasterDetailsById.userId == undefined) { userMasterJson.createdBy = +this.UserId }
    else { userMasterJson.updatedBy = +this.UserId; userMasterJson.userId = this.userMasterDetailsById.userId }
    console.log(userMasterJson)
    if (this.userMasterDetailsById == "") {
      this.masterservice.createUserMaster(userMasterJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/user-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formUserMaster.get(err.error.Errors[prop]?.PropertyName);
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
      this.masterservice.editUserMaster(userMasterJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/user-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formUserMaster.get(err.error.Errors[prop]?.PropertyName);
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

}