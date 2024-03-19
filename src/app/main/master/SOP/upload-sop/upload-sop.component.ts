import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UploadSOP } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';

@Component({
  selector: 'app-upload-sop',
  templateUrl: './upload-sop.component.html',
  styleUrls: ['./upload-sop.component.scss']
})
export class UploadSopComponent implements OnInit {
  submitted = false
  formmaster!: FormGroup
  UserId: any
  uploadDestailById: any = ""
  uploadSOP: any = undefined
companyList:any=''
  constructor(private fb: FormBuilder, private cs: CommonServiceService, private routes: Router,
    private toastrService: ToastrService,
    private activeroute: ActivatedRoute, private masterService: CountryMasterService,) {
    this.UserId = this.cs.login_UserId()//for id
  }
  ngOnInit(): void {
    this.formmaster = this.fb.group({
      sopFileName: ["",Validators.required],
      customer:['',Validators.required],
      moduleName: ["",Validators.required],
      sopTitle: ["",Validators.required],
      fileName: ["", Validators.required],
      sopDescription: ["",Validators.required],
      isActive:[true],
    })
    this.activeroute.params.subscribe((res: any) => {
      let uploadId = res.id
      if (uploadId) {
        this.masterService.getUploadSopbyid(uploadId).subscribe((res: any) => {
          this.uploadDestailById = res.data
       this.formmaster.patchValue(this.uploadDestailById)
       this.uploadSOP=this.uploadDestailById?.sopFileName
        })
      }

    })
this.APIbinding()
  }

  get f() {
    return this.formmaster.controls
  }
  OnSubmit() {
    debugger
    this.submitted = true
    if (this.formmaster.invalid) {
      return
    }
    var UploadJson = new UploadSOP
    UploadJson = this.formmaster.value
    if (this.uploadDestailById.sopFileId == undefined) {
      UploadJson.createdBy = +this.UserId
    } else {
      UploadJson.updatedBy = +this.UserId; UploadJson.sopFileId = this.uploadDestailById.sopFileId
      console.log(UploadJson)
    }
    if (this.uploadDestailById == "") {
      this.masterService.CreateUploadSop(UploadJson).subscribe((result) => {
        this.toastrService.success('succesfully Saved !', 'Success-200 !');
        this.routes.navigate(['master/manage-sop']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formmaster.get(err.error.Errors[prop]?.PropertyName);
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
      this.masterService.editUploadSop(UploadJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/manage-sop']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formmaster.get(err.error.Errors[prop]?.PropertyName);
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
  onFileChancancelChqque(event: any, a: number) {
    if (a == 3) {
      const files: FileList | null = event.target.files;
      if (files && files.length > 0) {
        this.formmaster.controls['sopFileName'].setValue(files.item(0)?.name || '');
        this.formmaster.controls['fileName'].setValue(files.item(0)?.name || '');
        this.uploadSOP = files.item(0)?.name || '';
      } else {
        this.formmaster.controls['sopFileName'].setValue('');
        this.formmaster.controls['fileName'].setValue('');
        this.uploadSOP = '';
      }
    }
  }


  fileResetPan() {
    if (this.uploadSOP != '') {
      this.uploadSOP = undefined
      this.formmaster.controls['fileName'].reset()
    }
  }

  APIbinding(){
this.masterService.getAllCompanyMasterList().subscribe((res:any)=>{
this.companyList= res.data
console.log(this.companyList)
})
  }
}
