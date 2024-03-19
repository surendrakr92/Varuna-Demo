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
  selector: 'app-remarks-master',
  templateUrl: './remarks-master.component.html',
  styleUrls: ['./remarks-master.component.scss']
})
export class RemarksMasterComponent implements OnInit{


  formMaster!:FormGroup
  UserId:any
  submitted= false
  remarkList:any
MaincategoryMasterList:any
  remarksDetailById:any=''
  subcatList:any=[]
  updatedsubcatlist:any=[]

  constructor(private eventMaster: EventMasterService, private modalService:ModalPopupService, private formbuilder:FormBuilder,
    private routes:Router, private activroute:ActivatedRoute,
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
    this.fromValidatio()
this.activroute.params.subscribe((res:any)=>{
  let remarksId= res.data
  if(remarksId){
    this.eventMaster.getRemarkDetailsById(remarksId).subscribe((res:any)=>{
this.remarksDetailById= res.data
    })
  }
})

this.ApiBind()
  }
  get f(){
    return this.formMaster.controls
  }
  fromValidatio(){
    this.formMaster = this.formbuilder.group({
     
      catId:["", Validators.required],
      subCatId:["", Validators.required],
      remarks:['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{2,}(?: [a-zA-Z0-9]+)*$')]],
      description:['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{2,}(?: [a-zA-Z0-9]+)*$')]],
      isActive:[true],
   
  
  
    })
  }
  onsave(){
    this.submitted = true;
    if (this.formMaster.invalid) {
      return
    
    }
    var remarksJson :any
    remarksJson = this.formMaster.value
    if(this.remarksDetailById.remarksID==undefined)
    {remarksJson.createdBy = +this.UserId}
    else{remarksJson.updatedBy = +this.UserId; remarksJson.remarksID=this.remarksDetailById.remarksID}
    console.log(remarksJson)
    if(this.remarksDetailById==""){
      this.eventMaster.createRemarkCategory(remarksJson).subscribe((result) => {
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
      this.eventMaster.editRemark(remarksJson).subscribe((result) => {
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

downloadExcel(tablerefrece:any){
  let fileName='RemarksMaster.xLsx'
  let element = document.getElementById(tablerefrece.id);
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.remarkList);
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
  this.fromValidatio()
  this.remarksDetailById=''
}




ApiBind(){
this.eventMaster.getAllRemarkMasterList().subscribe((res:any)=>{
  this.remarkList= res.data

  this.dtTrigger.next(null)
})
this.eventMaster.getAllMaincategoryMasterList().subscribe((res:any)=>{
this.MaincategoryMasterList= res.data

})
this.eventMaster.getAllSubcategoryMasterList().subscribe((res:any)=>{
  this.subcatList= res.data
  console.log(this.subcatList)

})
}


onEdit(data:any,model:any){
  this.formMaster.reset()
  this.modelOpen(model)
  this.formMaster.patchValue(data)
  this.remarksDetailById=data
  this.handledropdn(data.catId)
  }
  handledropdn(ev:any){
   this.updatedsubcatlist= this.subcatList.filter((x: { catId: any; })=>x.catId==ev)
   if(this.remarksDetailById){
this.formMaster.controls['subCatId'].setValue(this.remarksDetailById.subCatId)
   }
  }
}
