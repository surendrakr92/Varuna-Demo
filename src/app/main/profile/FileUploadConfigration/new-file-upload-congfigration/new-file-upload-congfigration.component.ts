import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fileUploadCong } from 'src/app/models/Class/profile';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { ProfilesSharedService } from 'src/app/services/profile-service/profiles-shared.service';

@Component({
  selector: 'app-new-file-upload-congfigration',
  templateUrl: './new-file-upload-congfigration.component.html',
  styleUrls: ['./new-file-upload-congfigration.component.scss']
})
export class NewFileUploadCongfigrationComponent implements OnInit {
fileuploadconId:any
webPageNameList:any
fileuploadconDetailById:any=""
viewPagecom = ""
UserId:any
  formConfuigurationMaster:any= FormGroup 
  submitted = false
  constructor(private masterservice:CountryMasterService, private toastrService:ToastrService,
    private profile:ProfilesSharedService,
     private formbuilder:FormBuilder,private activeroute:ActivatedRoute, private cs:CommonServiceService,//for id
     private routes:Router){
      this.UserId=this.cs.login_User_Code()//for id
     }

ngOnInit(): void {
  this.formConfuigurationMaster = this.formbuilder.group({
    webPageId:['',Validators.required],
    documnetTypeName:['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9]{5,}(?: [a-zA-Z0-9]+)*$')]],
    primaryRoutePath:['',Validators.required],
    absolutePath:['',Validators.required],
    primaryVirtualPath:['',Validators.required],
    archiveVirtualPath:['',Validators.required],
    primaryAgeYear:['',Validators.required],
    finalAgeYear:['',Validators.required],
    archiveAgeYear:['',Validators.required],
    documnetTypeId:[2,Validators.required],
    isLifetimeAvailable:[false],
    isTemporaryFolder:[false],
    allowFileExtensions:['',Validators.required],
    isActive:[true]
  })
  this.getWebPageName()
this.activeroute.params.subscribe((res)=>{
let fileUploadId= res.data || res.viewData
if (res.data) this.viewPagecom = "edit"
if (res.viewData) this.viewPagecom = "view"
if(fileUploadId){
  this.profile.getFileUploadCongById(fileUploadId).subscribe((res:any)=>{
this.fileuploadconDetailById= res.data
    this.formConfuigurationMaster.patchValue(res.data)
  })
}
})


}
get f(){
  return this.formConfuigurationMaster.controls
}

OnSubmit(){
  this.submitted= true
  if(this.formConfuigurationMaster.invalid){
    return
  }
 

var fileUploadCongJson = new fileUploadCong
fileUploadCongJson = this.formConfuigurationMaster.value
if (this.fileuploadconDetailById.fileSatupId == undefined) { fileUploadCongJson.createdBy = +this.UserId }
else { fileUploadCongJson.updatedBy = +this.UserId ; fileUploadCongJson.fileSatupId = this.fileuploadconDetailById.fileSatupId }
console.log(fileUploadCongJson)
if (this.fileuploadconDetailById == "") {
  this.profile.createFileUploadCong(fileUploadCongJson).subscribe((result) => {

    this.toastrService.success('succesfully Created !', 'Success-200 !');
    this.routes.navigate(['/profile/file-uploading-configration']);
  }, err => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 422) {
        debugger

        Object.keys(err.error.Errors).forEach((prop: any) => {
          const formControl = this.formConfuigurationMaster.get(err.error.Errors[prop]?.PropertyName);
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
  this.profile.updateFileUpload(fileUploadCongJson).subscribe((result) => {

    this.toastrService.success('succesfully Updated !', 'Success-200 !');
    this.routes.navigate(['/profile/file-uploading-configration']);
  }, err => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 422) {
        debugger

        Object.keys(err.error.Errors).forEach((prop: any) => {
          const formControl = this.formConfuigurationMaster.get(err.error.Errors[prop]?.PropertyName);
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

getWebPageName(){
  this.masterservice.getAllMenuMasterList().subscribe((res:any)=>{
this.webPageNameList=res.data
  })
}
}
