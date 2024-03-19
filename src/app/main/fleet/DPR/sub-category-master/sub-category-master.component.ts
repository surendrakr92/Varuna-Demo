import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

declare var $ :any
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-sub-category-master',
  templateUrl: './sub-category-master.component.html',
  styleUrls: ['./sub-category-master.component.scss']
})
export class SubCategoryMasterComponent implements OnInit {

  formMaster!:FormGroup
  UserId:any
  submitted= false
  subCatList:any
MaincategoryMasterList:any
subCatDetailById:any=''

  constructor(private eventMaster: EventMasterService, private modalService:ModalPopupService, private formbuilder:FormBuilder,
    private routes:Router,private activeroutes:ActivatedRoute,
    private toastrService:ToastrService,private cs:CommonServiceService,//for id
    ) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
    this.UserId=this.cs.login_UserId()//for id
  }
  dtTrigger:Subject<any>=new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
this.formControlMaster()
this.activeroutes.params.subscribe((res)=>{
let subCatId= res.data
if(subCatId){
  this.eventMaster.getSubCategoryDetailsById(subCatId).subscribe((res:any)=>{
this.subCatDetailById= res.data
  })
}
})


this.ApiBind()
  }
  formControlMaster(){
    this.formMaster = this.formbuilder.group({
      catId:["", Validators.required],
         subCatName:['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z]{2,}(?: [a-zA-Z]+)*$')]],
         subCatDescription:['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{2,}(?: [a-zA-Z0-9]+)*$')]],
         isActive:[true],
      
       })
  }
  get f(){
    return this.formMaster.controls
  }

downloadExcel(tablerefrece:any){
  let fileName='sub-category-master.xLsx'
  let element = document.getElementById(tablerefrece.id);
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.subCatList);
  Object.keys(ws).forEach(key => {
if (ws[key].v === "Action") {
  delete ws[key];
 }
});
/* generate workbook and add the worksheet */
 const wb: XLSX.WorkBook = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
   /* save to file */
XLSX.writeFile(wb, fileName);
}


modelOpen(model: any) {
this.submitted=false
  this.modalService.modalOpenSuccess(
    model,
    popupclass.info,
    true,
    false,
    false,
    popupclass.large
  )
  this.formControlMaster()
  this.subCatDetailById=''
  
}


onsave(){
  this.submitted = true;
  if (this.formMaster.invalid) {
    return
  
  }
  var subCatJson :any
  subCatJson = this.formMaster.value
  if(this.subCatDetailById.subCatId==undefined)
  {subCatJson.createdBy = +this.UserId}
  else{subCatJson.updatedBy = +this.UserId; subCatJson.subCatId=this.subCatDetailById.subCatId}
  console.log(subCatJson)
  if(this.subCatDetailById==""){
    this.eventMaster.createSubCategory(subCatJson).subscribe((result) => {
      this.toastrService.success('succesfully Created !', 'Success-200 !');
     this.modalService.closeModal();
     $('#MyTable').DataTable().destroy();
     this.ApiBind()
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formMaster.get(err.error.Errors[prop]?.PropertyName);
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
    this.eventMaster.editSubCategory(subCatJson).subscribe((result) => {
      this.toastrService.success('succesfully Updated !', 'Success-200 !');
      this.modalService.closeModal();
      $('#MyTable').DataTable().destroy();
      this.ApiBind()
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger

          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formMaster.get(err.error.Errors[prop]?.PropertyName);
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



ApiBind(){
this.eventMaster.getAllSubcategoryMasterList().subscribe((res:any)=>{
  this.subCatList= res.data
  this.dtTrigger.next(null)
})
this.eventMaster.getAllMaincategoryMasterList().subscribe((res:any)=>{
this.MaincategoryMasterList= res.data
console.log(this.MaincategoryMasterList)
})
}
onEdit(data:any,model:any){
this.modelOpen(model)
this.formMaster.patchValue(data)
this.subCatDetailById=data

// this.formMaster.controls['catId'].disable();

}
}
