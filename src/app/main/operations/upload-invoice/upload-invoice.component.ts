import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-upload-invoice',
  templateUrl: './upload-invoice.component.html',
  styleUrls: ['./upload-invoice.component.scss']
})
export class UploadInvoiceComponent implements OnInit {

  formMaster!:FormGroup
  submitted=false
  selectuploadCopy: any = undefined
  userId: any;
  constructor(private fb:FormBuilder,){

  }
ngOnInit(): void {
  this.formMaster= this.fb.group({
    DockNo:["", Validators.required],
    documentName:[""]
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