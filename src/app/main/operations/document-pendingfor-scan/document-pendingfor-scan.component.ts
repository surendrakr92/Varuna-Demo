import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-document-pendingfor-scan',
  templateUrl: './document-pendingfor-scan.component.html',
  styleUrls: ['./document-pendingfor-scan.component.scss']
})
export class DocumentPendingforScanComponent implements OnInit {

  formMaster!:FormGroup
  submitted=false
  branchList:any
  payBasicList:any
  constructor(private fb:FormBuilder,private masterServie:CountryMasterService,){}
ngOnInit(): void {
  this.formMaster= this.fb.group({
    docType:["", Validators.required],
    docketNo:["", Validators.required],
    documentNo:[""],
    scanStatus:[""],
    uploadCopy:["", Validators.required],


    docTypeId:[''],
  
    fromDate:[''],
    toDate:[''],
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
console.log(this.payBasicList)
  })
  this.masterServie.getAllBranchMasterList().subscribe((res:any)=>{
    this.branchList= res.data

  })
}


}
