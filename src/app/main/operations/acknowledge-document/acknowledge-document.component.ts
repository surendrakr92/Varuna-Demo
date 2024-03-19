import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { OperationsService } from 'src/app/services/master-service/operations.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-acknowledge-document',
  templateUrl: './acknowledge-document.component.html',
  styleUrls: ['./acknowledge-document.component.scss']
})
export class AcknowledgeDocumentComponent implements OnInit {


  formMaster!:FormGroup
  submitted=false

  payBasicList:any
branchtype:any
branchList:any
AcknowlegedocumentsList:any=[]
ShowDaterange = false;

  constructor(private fb:FormBuilder,private shserv:SharedService, private modalService:ModalPopupService,
    private masterServie:CountryMasterService, private oprationService:OperationsService,
    private cs:CommonServiceService,){
  this.branchtype= cs.login_UserCurrBranchId()
  }
ngOnInit(): void {
  this.formMaster= this.fb.group({
    forwardedType:["", Validators.required],
    dfmNoList:["", Validators.required],
    docTypeId:["", Validators.required],
    rangeDate:["", Validators.required],
      fromDate:["", Validators.required],
    toDate:["", Validators.required],
    branchId:[""],
    presentDate: new FormControl(new Date().toISOString().substring(0, 10)),
  })
  this.APIBind()
  this.formMaster.controls['branchId'].setValue(this.branchtype)
  console.log(this.branchtype)
}
get f(){
  return this.formMaster.controls
}
onSubmit(){
  this.submitted= true
  if(this.formMaster.invalid){
    return

  }
  this.oprationService.getAllAcknowlegedocuments(this.formMaster.value).subscribe((res:any)=>{
this.AcknowlegedocumentsList= res.data

  })





}
forwarTo= [
  {id:1, type:'Customer'},
  {id:2, type:'Location'},
]
documentList= [
  {id:1, type:'Bill'},
  {id:2, type:'POD'},
]
selectDateList= [
  {id:1, type:'Select Date range.'},
  {id:2, type:'Last Week'},
  {id:3, type:'Today'},
  {id:4, type:'Till Date'},

]



APIBind(){
  this.masterServie.getGeneralMasterByCodeTyoeId(33).subscribe((res:any)=>{
this.payBasicList= res.data
console.log(this.payBasicList)
  })
  this.masterServie.getAllBranchMasterList().subscribe((res:any)=>{
this.branchList= res.data
console.log(this.branchList)
  })
  
}

modelOpen(model: any) {
  debugger
  this.modalService.modalOpenSuccess(
    model,
    popupclass.info,
    true,
    false,
    false,
    popupclass.large
  )
}

printPdf(){
  let id='view_information'
this.shserv.print_file_to_pdf(id).subscribe((res)=>{})
}

selectionDate(event: any) {

  this.formMaster.controls["fromDate"].setValue("");
  this.formMaster.controls["toDate"].setValue("");
  if (event == 3) {
    this.ShowDaterange = true;
    this.formMaster.controls["fromDate"].setValue(
      this.formMaster.controls.presentDate.value
    );
    this.formMaster.controls["toDate"].setValue(
      this.formMaster.controls.presentDate.value
    );
  } else if (event == 2) {
    this.ShowDaterange = true;
    this.formMaster.controls["toDate"].setValue(
      this.formMaster.controls.presentDate.value
    );
    this.formMaster.controls["fromDate"].setValue(
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .substring(0, 10)
    );
  } else if (event == 4) {
    this.ShowDaterange = true;
    this.formMaster.controls["fromDate"].setValue("1990-12-12");
    this.formMaster.controls["toDate"].setValue(
      this.formMaster.controls.presentDate.value
    );
  } else {
    this.ShowDaterange = true;
    this.formMaster.controls["fromDate"].setValue("");
    this.formMaster.controls["toDate"].setValue("");
    this.formMaster.controls["fromDate"].enable();
    this.formMaster.controls["toDate"].enable();
  }
}
}