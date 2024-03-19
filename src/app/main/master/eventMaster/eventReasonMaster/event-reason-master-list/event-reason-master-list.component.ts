import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';
declare var $: any
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-event-reason-master-list',
  templateUrl: './event-reason-master-list.component.html',
  styleUrls: ['./event-reason-master-list.component.scss']

})
export class EventReasonMasterListComponent implements OnInit {
  reasonmasterList: any
  formMaster: any = FormGroup
  eventTypeList: any = []
  submitted = false
  UserId: any
  reasonPatchedID: any = ''
  constructor(private eventService: EventMasterService, private ms: CountryMasterService,
    private modalService: ModalPopupService, private formbuilder: FormBuilder,
    private toastrService: ToastrService,
    private cs: CommonServiceService, //for id
  ) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
    this.UserId = this.cs.login_User_Code()//for id
  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.getAllEventReasonMaster()
    this.formMaster = this.formbuilder.group({
      descriptions: ['', Validators.required],
      subEventId: ['', Validators.required],
      isActive: [true]
    })
    this.getGeneralmasterDropDown()
  }
  get f() {
    return this.formMaster.controls
  }
  getAllEventReasonMaster() {
    this.eventService.getAllEventReasonMasterList().subscribe((res: any) => {
      this.reasonmasterList = res.data
      this.dtTrigger.next(null)
    })
  }
  //excel_converter_download
  downloadExcel(tablerefrece: any) {
    let fileName = 'eventReasonMaster.xLsx'
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
  modelopen(model: any,a:any) {
    debugger
    if(a=='create') this.reasonPatchedID=''
    else this.eventService.geteventRDetailsById(a).subscribe((res:any)=>{this.reasonPatchedID=res.data[0] ; this.formMaster.patchValue(this.reasonPatchedID)})
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.medium
    );
  }
  getGeneralmasterDropDown() {
    debugger
    this.eventService.getAllMainEventMaster().subscribe((res: any) => {
      this.eventTypeList = res.data
    })
  }
  submit() {
    this.submitted = true
    if (this.formMaster.invalid) {
      return
    }
    var reasonJson: any
    reasonJson = this.formMaster.value
    if (this.reasonPatchedID.reasonId == undefined) { reasonJson.createdBy = +this.UserId }
    else { reasonJson.updatedBy = +this.UserId; reasonJson.reasonId = this.reasonPatchedID.reasonId }
    console.log(reasonJson)
    if (this.reasonPatchedID == "") {
      this.eventService.createEvenReasonmaster(reasonJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        // this.routes.navigate(['master/main-and-sub-event-master']);
        $('#MyTable').DataTable().destroy();
        this.getAllEventReasonMaster()
        this.modalService.closeModal()
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
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
    } else {
      this.eventService.editReasonMaster(reasonJson).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        // this.routes.navigate(['master/main-and-sub-event-master']);
        $('#MyTable').DataTable().destroy();
        this.getAllEventReasonMaster()
        this.modalService.closeModal()
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
  }
  activeInactive(id: any) {
    debugger
    var json: any = {}
    json.reasonId = id
    json.updatedBy = this.UserId
    this.eventService.disableAndEnableEventReasonMaster(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getAllEventReasonMaster()
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          this.toastrService.error(err.error.Message, 'Error !');
        }

      }
    })
  }
}
