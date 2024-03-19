import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

@Component({
  selector: 'app-docket-unfinalized',
  templateUrl: './docket-unfinalized.component.html',
  styleUrls: ['./docket-unfinalized.component.scss']
})
export class DocketUnfinalizedComponent implements OnInit {
  submitted = false
  formMaster!: FormGroup
  constructor(private formbuilder: FormBuilder, private modalService: ModalPopupService,
    private indentServ: IndentServiceService,
    private toastrService: ToastrService,
    private cs: CommonServiceService) { }
  ngOnInit(): void {
    this.formV()
  }
  get f() {
    return this.formMaster.controls
  }
  formV() {
    this.formMaster = this.formbuilder.group({
      docketNo: ["", Validators.required],
      remarks: ["", Validators.required]
    })
  }
  onSubmit(model: any) {
    this.submitted = true
    if (this.formMaster.invalid) {
      return
    } else {
      this.indentServ.docketUnfinalize(this.formMaster.value).subscribe((res: any) => {
        if (res.succeeded) {
          this.modalService.modalOpenSuccess(
            model,
            popupclass.info,
            true,
            false,
            false,
            popupclass.small
          )
          this.formV()
          this.submitted=false
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
          this.toastrService.error(err.error.Message, `Error status:${err.status}`);
        }
      })

    }

  }

}
