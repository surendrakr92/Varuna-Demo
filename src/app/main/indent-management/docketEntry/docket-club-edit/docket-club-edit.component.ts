import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

@Component({
  selector: 'app-docket-club-edit',
  templateUrl: './docket-club-edit.component.html',
  styleUrls: ['./docket-club-edit.component.scss']
})
export class DocketClubEditComponent implements OnInit {
  userId: any
  formMaster!: FormGroup
  submitted= false
  clubEditList: any = []
  constructor(private cs: CommonServiceService, private modalService: ModalPopupService,
    private formbuilder: FormBuilder, private fb: FormBuilder,
    private tostrServ:ToastrService,
    private indentServ: IndentServiceService) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    };
    this.userId = this.cs.login_User_Code()
  }
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.formMaster = this.formbuilder.group({
      docketNo: ['', Validators.required],
    })
  }
  get f() {
    return this.formMaster.controls
  }
  searchFilter() {
    this.submitted = true
    if (this.formMaster.invalid) {
      return
    }
    this.indentServ.getDataForclublredit(this.formMaster.controls['docketNo'].value).subscribe((res: any) => {
      if (res.succeeded) this.clubEditList = res.data
    })
  }
  onSubmit(model: any) {
    let json={clubLRList:this.clubEditList}
    this.indentServ.clublrEdit(json).subscribe((res:any)=>{
    if(res.succeeded){
      this.modalService.modalOpenSuccess(
        model,
        popupclass.info,
        true,
        false,
        false,
        popupclass.small
      )
    }
    },err=>{
      this.tostrServ.error(err.error.Message)
    })
  
  }
  freightChareg(freight: any, i: any) {
    this.clubEditList[i]['freight'] = +(freight)
  }
  popClose(){
    this.clubEditList=[]
    this.submitted=false
    this.formMaster.controls.docketNo.setValue('')
   this.modalService.closeModal()
  }
}
