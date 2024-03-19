import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { MvVehicle } from 'src/app/models/operation';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { OperationsService } from 'src/app/services/master-service/operations.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';
declare var $ :any
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-black-list-mvmaster',
  templateUrl: './black-list-mvmaster.component.html',
  styleUrls: ['./black-list-mvmaster.component.scss']
})
export class BlackListMVMasterComponent implements OnInit{
  submitt=false
  submitted=false
  formMaster!:FormGroup
  formMasterNew!:FormGroup
  mvVehicleList:any
  BlacklistBy:any
  createList:any=""
  userId:any
  ActiveBy:any
  SHowHide=false
SRNo:any
blackDetailById:any=''
  constructor(private fb:FormBuilder,private modalService:ModalPopupService,
    private routes:Router,private activeroute:ActivatedRoute,
    private formbuider:FormBuilder, private operationService:OperationsService, private cs: CommonServiceService,
    private toastrService:ToastrService,){
      this.userId=this.cs.login_UserId()//for id
    this.BlacklistBy=this.cs.login_User_Code()
    this.ActiveBy= this.cs.login_UserName()

    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
  }
  dtTrigger:Subject<any>=new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.formMaster= this.fb.group(({
      vehicleNo:["", Validators.required],

    }))

    this.AddList()
    this.APIBinding()

    this.activeroute.params.subscribe((res:any)=>{
      let blackId= res.id
      if(blackId){
        this.operationService.GetByDetailsmvvehicleblack(blackId).subscribe((res:any)=>{
this.blackDetailById= res.data
console.log(this.blackDetailById)
        })
      }
    })

  }

AddList(){
this.formMasterNew= this.formbuider.group({
  vehicleNo:["",Validators.required],
  blackListResion:["",Validators.required],
  isActive:[true],
})
}

get f(){
  return this.formMasterNew.controls
}


OnCreate(){
  this.submitted = true;
  if (this.formMasterNew.invalid) {
    return
    }
  var MvVehiclJson = new MvVehicle
  MvVehiclJson = this.formMasterNew.value
  if(this.blackDetailById.srNo==undefined)
  {MvVehiclJson.createdBy = +this.userId}
  else{MvVehiclJson.updatedBy = +this.userId; MvVehiclJson.srNo=this.blackDetailById.srNo}
  
  console.log(MvVehiclJson)
  if(this.blackDetailById==""){
    this.operationService.createmvvehicleblack(MvVehiclJson).subscribe((result) => {
      this.toastrService.success('succesfully Created !', 'Success-200 !');
      this.modalService.closeModal()
        $('#MyTable').DataTable().destroy();
        this.APIBinding()
        this.submitted=false
  
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger
          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formMasterNew.get(err.error.Errors[prop]?.PropertyName);
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
    this.operationService.updateemvvehicleblack(MvVehiclJson).subscribe((result) => {
      this.toastrService.success('succesfully Updated !', 'Success-200 !');
      this.modalService.closeModal()
        $('#MyTable').DataTable().destroy();
        this.APIBinding()
        this.submitted=false
    
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger

          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formMasterNew.get(err.error.Errors[prop]?.PropertyName);
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
  get fs(){
   return this.formMaster.controls
  }

  OnSearch(){
    this.submitt=true
    if(this.formMaster.invalid){
      return
    }
  
//     this.operationService.getAllmvvehicleblacklist(this.formMaster.value).subscribe((res:any)=>{
//       if(res.succeeded){
//         this.mvVehicleList= res.data
        
//  this.SHowHide=true
//         console.log(this.mvVehicleList)
//       }
    
//     },err=>{
//       this.toastrService.error(err.error.Message, `Error statu:${err.status}`);
//     }
    
//     )
  }

  modelOpen(model: any) {
    debugger
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.medium
    )
    this.AddList()
    this.blackDetailById=''
    this.submitted=false
    
}
downloadExcel(tablerefrece:any){
  let fileName='black-list-mv-master.xLsx'
  let element = document.getElementById(tablerefrece.id);
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
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

APIBinding(){
  this.operationService.getAllmvvehicleblacklist().subscribe((res:any)=>{
    this.mvVehicleList= res.data
    console.log(this.mvVehicleList)
    this.dtTrigger.next(null)
  })
}
activeInactive(id: any) {
  var json =new MvVehicle
  json.srNo=id
 
  this.operationService.disableAndEnablemvvehicleblack(json).subscribe((res: any) => {
    if (res.succeeded) {
      this.toastrService.success('succesfully changed status', 'Success-200 !');
      $('#MyTable').DataTable().destroy();
      this.APIBinding()
    }
  }, err => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 422) {
        this.toastrService.error(err.error.Message, 'Error !');
      }

    }
  })
}

editmenu(item:any, model: any){

  this.modelOpen(model)
  this.formMasterNew.patchValue(item)
    this.blackDetailById=item

  
  }

}
