import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';

@Component({
  selector: 'app-re-scan-document',
  templateUrl: './re-scan-document.component.html',
  styleUrls: ['./re-scan-document.component.scss']
})
export class ReScanDocumentComponent implements OnInit {
  formMaster!:FormGroup
  submitted=false
  selectuploadCopy: any = undefined
  userId: any;
  
  constructor(private fb:FormBuilder,private cs:CommonServiceService){
    this.userId=this.cs.login_UserId()
  }
ngOnInit(): void {
  this.formMaster= this.fb.group({
    docType:["", Validators.required],
    docketNo:["", Validators.required],
    documentNo:[""],
    scanStatus:[""],
    documentName:["", Validators.required],
   documentDate:[""],
   docFwd:[""],
   scannBy:[""],
   scannAt:[""],
   scannDate:[""],
   reScannBy:[""],
   reScannAt:[""],
   reScannDate:[""],
   remarks:[""],
  })
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
  {id:1, type:'Billing'},
  {id:2, type:'POD'},
]
onFileChancancelChqque(event: any, a: number) {
  if (a == 3) {
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      this.formMaster.controls['documentName'].setValue(files.item(0)?.name || '');
      this.selectuploadCopy = files.item(0)?.name || '';
    } else {
      this.formMaster.controls['documentName'].setValue('');
      this.selectuploadCopy = '';
    }
  }
}


fileResetPan() {
  if (this.selectuploadCopy != '') {
    this.selectuploadCopy = undefined
    this.formMaster.controls['documentName'].reset()
  }
}
}
