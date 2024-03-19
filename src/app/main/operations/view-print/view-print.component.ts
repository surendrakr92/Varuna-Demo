import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { popupclass } from 'src/app/models/Class/enum';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { OperationsService } from 'src/app/services/master-service/operations.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-print',
  templateUrl: './view-print.component.html',
  styleUrls: ['./view-print.component.scss']
})
export class ViewPrintComponent implements OnInit {

  formMaster!:FormGroup
  submitted=false
branchList:any
  payBasicList:any
  cityList:any
  ViewList:any=''
  ShowDaterange = false;
  ViewId:any
  printerData: any;
  constructor(private fb:FormBuilder, private modalService:ModalPopupService,
    private shserv:SharedService,
    private masterServie:CountryMasterService,private oprationService:OperationsService,){}
ngOnInit(): void {
  this.formMaster= this.fb.group({
    rolocationId:["", Validators.required],
    locationId:["", Validators.required],
    rangeDate:["", Validators.required],
    fromDate:["", Validators.required],
    toDate:["", Validators.required],
    dfmno:["", [Validators.required, Validators.minLength(12)]],
    presentDate: new FormControl(new Date().toISOString().substring(0, 10)),
  })
  this.APIBind()
}
get f(){
  return this.formMaster.controls
}
onSubmit(){
  this.submitted= true
  if(this.formMaster.invalid){
    return

  }
  this.oprationService.getAllViewDocument(this.formMaster.value).subscribe((res:any)=>{
this.ViewList= res.data

  })

}

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

  })
  this.masterServie.getAllBranchMasterList().subscribe((res:any)=>{
    this.branchList= res.data

  })
  this.masterServie.getAllCityMasterList().subscribe((res:any)=>{
this.cityList= res.data
  })
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


modelOpen(model: any, data:{}) {
  debugger
  this.modalService.modalOpenSuccess(
    model,
    popupclass.info,
    true,
    false,
    false,
    popupclass.large
  )
  this.printerData=data}

printPdf(){
  let id='view_information'
this.shserv.print_file_to_pdf(id).subscribe((res)=>{})
}

}
