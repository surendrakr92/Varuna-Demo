import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { branchUserMapping } from 'src/app/models/master';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-new-branch-user-mapping',
  templateUrl: './new-branch-user-mapping.component.html',
  styleUrls: ['./new-branch-user-mapping.component.scss']
})
export class NewBranchUserMappingComponent {
  formBranchMaster:any = FormGroup
  submitted!: true;
  branchDetailsById:any=""
  branchMasterList:any=""
  userMasterList:any=""
  constructor(private formguilder:FormBuilder, private toastrService:ToastrService, 
    private routes:Router, private masterservice:CountryMasterService,
    public router:ActivatedRoute){}

  ngOnInit(): void {
    this.getbranchMasterList()
    this.getUserMaster()
    this.formBranchMaster = this.formguilder.group({
      branchId:['',Validators.required],
      userId:['',Validators.required],
      isDefaultBranch:[true]
      // isActive:[true]
    })
    this.router.params.subscribe((res) => {

      let branchMappingId = res.data
      if (branchMappingId) {
        this.masterservice.getBranchUserMappingById(branchMappingId).subscribe((res: any) => {
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
      var branchUserMappingJson = new branchUserMapping
      branchUserMappingJson = this.formBranchMaster.value
      if(this.branchDetailsById.branchMappingId==undefined){branchUserMappingJson.createdBy = +'00005301'}
      else{branchUserMappingJson.updatedBy = +'00005301' ;branchUserMappingJson.branchMappingId=this.branchDetailsById.branchMappingId}
      
      console.log(branchUserMappingJson)
      if(this.branchDetailsById==""){
        this.masterservice.createBranchUserMapping(branchUserMappingJson).subscribe((result) => {
  
          this.toastrService.success('succesfully Created !', 'Success-200 !');
          this.routes.navigate(['master/branch-user-mapping']);
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
        this.masterservice.editBranchUserMappingMapping(branchUserMappingJson).subscribe((result) => {
  
          this.toastrService.success('succesfully Updated !', 'Success-200 !');
          this.routes.navigate(['master/branch-user-mapping']);
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
  getbranchMasterList(){
    this.masterservice.getAllBranchMasterList().subscribe((res:any)=>{
this.branchMasterList=res.data
    })
  }
  getUserMaster(){
    this.masterservice.getAllUserMasterList().subscribe((res:any)=>{
      this.userMasterList= res.data
    })
  }
}
