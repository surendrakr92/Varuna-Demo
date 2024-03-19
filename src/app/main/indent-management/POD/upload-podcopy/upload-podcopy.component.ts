import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { popupclass } from 'src/app/models/Class/enum';
import { PODModule } from 'src/app/models/operation';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';
import { OperationsService } from 'src/app/services/master-service/operations.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

@Component({
  selector: 'app-upload-podcopy',
  templateUrl: './upload-podcopy.component.html',
  styleUrls: ['./upload-podcopy.component.scss']
})
export class UploadPODCopyComponent implements OnInit {
  submitted = false
  formMaster!: FormGroup
  selectedPanCard: any = undefined
  respoceData: any = ''
  userId: any
  constructor(private formbuilder: FormBuilder, private cs: CommonServiceService, private modalService: ModalPopupService,
    private toastrService: ToastrService, private indentservice: IndentServiceService,
  ) {
    this.userId = this.cs.login_UserId()
  }

  ngOnInit(): void {
    this.formMaster = this.formbuilder.group({
      docType: ["", Validators.required],
      docketNo: ["", Validators.required],
      documentNo: ["", [Validators.required, Validators.minLength(12)]],
      scanStatus: [""],
      documentName: ["", Validators.required],
    })

  }
  get f() {
    return this.formMaster.controls
  }

  Onsubmit(model: any) {
    this.submitted = true
    if (this.formMaster.invalid) {
      return
    }
    var ScanJson = new PODModule
    ScanJson = this.formMaster.value
    ScanJson['createdBy'] = this.userId
    console.log(ScanJson)
    this.indentservice.createScanDocument({ documentsData: [ScanJson] }).subscribe((res: any) => {
      if (res.succeeded) {
        this.modalService.modalOpenSuccess(
          model,
          popupclass.info,
          true,
          false,
          false,
          popupclass.small
        )
        this.respoceData = res.data[0]?.documentNo
        this.formMaster.reset('');
        this.selectedPanCard = undefined
        this.submitted = false

      }
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

  documentTIme = [

    { id: 1, type: 'Billing' },
    { id: 2, type: 'POD' },
  ]
  onFileChancancelChqque(event: any, a: number) {
    if (a == 3) {
      const files: FileList | null = event.target.files;
      if (files && files.length > 0) {
        this.formMaster.controls['documentName'].setValue(files.item(0)?.name || '');
        this.selectedPanCard = files.item(0)?.name || '';
      } else {
        this.formMaster.controls['documentName'].setValue('');
        this.selectedPanCard = '';
      }
    }
  }


  fileResetPan() {
    if (this.selectedPanCard != '') {
      this.selectedPanCard = undefined
      this.formMaster.controls['documentName'].reset()
    }
  }
}
