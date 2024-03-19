import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EwayBill } from 'src/app/models/operation';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';
import { OperationsService } from 'src/app/services/master-service/operations.service';

@Component({
  selector: 'app-extendewaybillexpiry',
  templateUrl: './extendewaybillexpiry.component.html',
  styleUrls: ['./extendewaybillexpiry.component.scss']
})
export class ExtendewaybillexpiryComponent implements OnInit {
  submitt=false
  submitted=false
  formMaster!:FormGroup
  formMaster2!:FormGroup
  ewaybillList:any=[""]
  ewaybill:any
  minDatePast: any = new Date().toISOString().slice(0, 10)
  EwaybillexpiryList:any=''
  constructor(private fb:FormBuilder, private operationService:OperationsService,private toastrService:ToastrService,
    private formbuilder:FormBuilder,
    private indeService:IndentServiceService,){}
  ngOnInit(): void {
    this.docketFilter()
    this.APiBinding()
    this.CreatMaster()
    this.formMaster2.controls['extExpDate'].setValue(this.minDatePast);



  }
  docketFilter(){
    this.formMaster=this.fb.group({
      docketId:[""],
      docketNo:[""],
      docket:[null, Validators.required]
    })


  }



get fs(){
  return this.formMaster.controls
}


OnSubmit(){

  this.submitt=true
  if(this.formMaster.invalid){
        return
  }
   this.operationService.getAllewaybillexpiry(this.formMaster.value).subscribe((res:any)=>{
    this.ewaybillList= res.data
    console.log(this.ewaybillList)
    this.formMaster2.controls['docketId'].setValue(this.ewaybillList.docketId)
    this.formMaster2.controls['docketNo'].setValue(this.ewaybillList.docketNo)
    this.formMaster2.controls['custId'].setValue(this.ewaybillList.custId)
    this.formMaster2.controls['ewaybillNo'].setValue(this.ewaybillList.ewaybillNo)
    this.formMaster2.controls['extExpDate'].setValue(this.ewaybillList.extExpDate)
    this.formMaster2.controls['remarks'].setValue(this.ewaybillList.remarks)
  },err=>{
    this.toastrService.error(err.error.Message, `Error statu:${err.status}`);
  })



}



get f(){
  return this.formMaster2.controls
}
FromSubmit(){
  this.submitted=true
  if(this.formMaster2.invalid){
    return 
  }
  var EwayJson = new EwayBill
  EwayJson = this.formMaster2.value
  console.log(EwayJson);
  this.operationService.createexpiry(EwayJson).subscribe((res:any)=>{
    this.toastrService.success('succesfully Created !', 'Success-200 !');
    this.formMaster2.reset()
    this.formMaster.reset()
  },err=>{
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



CreatMaster(){
  this.formMaster2=this.formbuilder.group({
    docketId: [""],
    docketNo: [""],
    ewaybillNo: [""],
    extExpDate: ["" ],
    remarks: ["",Validators.required],

  })

}


APiBinding(){
this.indeService.getalldocketlist().subscribe((res:any)=>{
  this.ewaybill= res.data
console.log(this.ewaybill)
})
}

docketFil(data:any){
  this.formMaster.controls['docketId'].setValue(data.docketId);
  this.formMaster.controls['docketNo'].setValue(data.docketNo);
}

ShowList(){
  this.operationService.billexpiryHistory(this.formMaster.value).subscribe((res:any)=>{
if(res.succeeded){
  this.EwaybillexpiryList= res.data
console.log(this.EwaybillexpiryList)
}
  },err=>{
    this.toastrService.error(err.error.Message, `Error statu:${err.status}`);
  })
}
}
