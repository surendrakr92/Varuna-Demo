import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { MainCat } from 'src/app/models/fleet';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

declare var $ :any
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-main-category-master-list',
  templateUrl: './main-category-master-list.component.html',
  styleUrls: ['./main-category-master-list.component.scss']
})


export class MainCategoryMasterListComponent  implements OnInit{
  formMaster!:FormGroup
  UserId:any
  submitted= false
MaincategoryMasterList:any=[]
mainCatDetailById:any=""


  constructor(private eventMaster: EventMasterService, private modalService:ModalPopupService, private formbuilder:FormBuilder,
    private routes:Router, private activeroutes:ActivatedRoute,
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
  let maincatId= res.data
  if(maincatId){
this.eventMaster.getMainCategoryDetailsById(maincatId).subscribe((res:any)=>{
this.mainCatDetailById= res.data
})
  }
})
this.apiList()
  }

formControlMaster(){
  this.formMaster = this.formbuilder.group({
    catName:['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z]{3,}(?: [a-zA-Z]+)*$')]],
    catDescription:['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{2,}(?: [a-zA-Z0-9]+)*$')]],
    isActive:[true],
  })
}

  get f(){
    return this.formMaster.controls
  }
downloadExcel(tablerefrece:any){
  let fileName='main-category-master.xLsx'
  let element = document.getElementById(tablerefrece.id);
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.MaincategoryMasterList);
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
this.submitted= false
  this.modalService.modalOpenSuccess(
    model,
    popupclass.info,
    true,
    false,
    false,
    popupclass.medium
  )
  this.formControlMaster()
  this.mainCatDetailById=''
}
onsave(){
  this.submitted = true;
  if (this.formMaster.invalid) {
    return
  
  }
  var mainCatJson = new MainCat
  mainCatJson = this.formMaster.value
  if(this.mainCatDetailById.catId==undefined)
  {mainCatJson.createdBy = +this.UserId}
  else{mainCatJson.updatedBy = +this.UserId; mainCatJson.catId=this.mainCatDetailById.catId}
  
  console.log(mainCatJson)
  if(this.mainCatDetailById==""){
    this.eventMaster.createMainCategory(mainCatJson).subscribe((result) => {
      this.toastrService.success('succesfully Created !', 'Success-200 !');
      $('#MyTable').DataTable().destroy();
     this.modalService.closeModal();

  
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
   
  }else{
    this.eventMaster.editMainCategory(mainCatJson).subscribe((result) => {
      this.toastrService.success('succesfully Updated !', 'Success-200 !');
      this.modalService.closeModal();
      $('#MyTable').DataTable().destroy();
      this.apiList()
   
    
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


apiList(){
this.eventMaster.getAllMaincategoryMasterList().subscribe((res:any)=>{
this.MaincategoryMasterList= res.data
this.dtTrigger.next(null)

console.log(this.MaincategoryMasterList);
})
}

editmenu(item:any,model: any){

this.modelOpen(model)
  this.formMaster.patchValue(item)
  this.mainCatDetailById=item
  // this.formMaster.controls['catName'].disable();

}
}

