import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { branchLevel, branchMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-new-branch',
  templateUrl: './new-branchLevel.component.html',
  styleUrls: ['./new-branchLevel.component.scss']
})
export class NewBranchComponent implements OnInit {
  formBranchMaster:any = FormGroup
  submitted!: true;
  branchDetailsById:any=""
  UserId:any
  constructor(private formguilder:FormBuilder, private toastrService:ToastrService, 
    private routes:Router, 
    private masterservice:CountryMasterService,
    private cs:CommonServiceService,//for id
    public router:ActivatedRoute){

      this.UserId=this.cs.login_User_Code()//for id
    }

  ngOnInit(): void {
    this.formBranchMaster = this.formguilder.group({
      branchLevelName:['',[Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9]{3,}(?: [a-zA-Z0-9]+)*$')]],
      isActive:[true]

    })
    this.router.params.subscribe((res) => {

      let stateMasterId = res.data
      if (stateMasterId) {
        this.masterservice.getBranchLevelDetailsById(stateMasterId).subscribe((res: any) => {
          this.branchDetailsById = res.data
          this.formBranchMaster.patchValue(res.data)
        })
      }
    })
    }
    get f(){
      return this.formBranchMaster.controls
    }


    OnSubmit(){
      this.submitted = true;
      if (this.formBranchMaster.invalid) {
        return
      }
      var stateJson = new branchLevel
      stateJson = this.formBranchMaster.value
      if(this.branchDetailsById.branchLevelId==undefined)
      {stateJson.createdBy = +this.UserId}
      else{stateJson.updatedBy = +this.UserId ;stateJson.branchLevelId=this.branchDetailsById.branchLevelId}
      
      console.log(stateJson)
      if(this.branchDetailsById==""){
        this.masterservice.createBrancheLevel(stateJson).subscribe((result) => {
  
          this.toastrService.success('succesfully Created !', 'Success-200 !');
          this.routes.navigate(['master/branch-level']);
        }, err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 422) {
              debugger
    
              Object.keys(err.error.Errors).forEach((prop: any) => {
                const formControl = this.formBranchMaster.get(err.error.Errors[prop]?.PropertyName);
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
        this.masterservice.editBranchLevel(stateJson).subscribe((result) => {
  
          this.toastrService.success('succesfully Updated !', 'Success-200 !');
          this.routes.navigate(['master/branch-level']);
        }, err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 422) {
              debugger
    
              Object.keys(err.error.Errors).forEach((prop: any) => {
                const formControl = this.formBranchMaster.get(err.error.Errors[prop]?.PropertyName);
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


