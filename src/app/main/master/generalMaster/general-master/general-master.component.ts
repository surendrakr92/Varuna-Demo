import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { branchLevel, generalMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';
import * as XLSX from 'xlsx'
declare var $ :any
@Component({
  selector: 'app-general-master',
  templateUrl: './general-master.component.html',
  styleUrls: ['./general-master.component.scss']
})
export class GeneralMasterComponent {
  genMasterlabel: any
  codeDesc: any
  submitted = false
  generalmasterList: any
  codeAccess: any
  formCodeType: any = FormGroup;
  generalMasterDetailsById: any
  GeneralId:any
  generaleditById:any
  codeTypeList:any=[]
  codetypeId: any = ""
  idDesc: any = ""
  namedesc = ""
  codeId: any;
 
  constructor(private MasterServices: CountryMasterService
    , private formbuilder: FormBuilder, private routes: Router,
    private toastrService: ToastrService, private modalService: NgbModal,
    private activeroutes:ActivatedRoute,  private cs:CommonServiceService,//for id
    private modalservice: ModalPopupService) {
      this.dtOptions = {
        // pagingType: 'full_numbers',
        lengthMenu: [5, 10, 20, 50, 100],
        // processing:true,
      }
      this.UserId=this.cs.login_User_Code()//for id
    }
    UserId:any
  dtTrigger:Subject<any>=new Subject<any>()
  dtOptions: DataTables.Settings = {};
 
  ngOnInit(): void {

    this.formCodeType = this.formbuilder.group({
      codeDesc: ['', Validators.required]
    })
 
    this.getGeneralMaster()
    this.getAllCodeType()
  }
  get f() {
    return this.formCodeType.controls
  }

  submitForGen() {
    debugger
    this.submitted = true;
    if (this.formCodeType.invalid) {
      return
    }
    var genmasterJson = new generalMaster
    genmasterJson = this.formCodeType.value
    genmasterJson.codeTypeId =this.codetypeId
    genmasterJson.codeId =this.codeId
    this.codetypeId=this.codetypeId
    genmasterJson.codeAccess ="U"
    genmasterJson.isActive = true
    genmasterJson.createdBy = +'00005301'

    console.log(genmasterJson)
    this.MasterServices.createGeneralMaster(genmasterJson).subscribe((result) => {

      this.toastrService.success('succesfully Created !', 'Success-200 !');
      this.formCodeType.reset()
      this.codeId=this.codeId+1
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formCodeType.get(err.error.Errors[prop]?.PropertyName);
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
// this.getAllCodeType()

  }
  getGeneralMaster() {
    this.MasterServices.getAllGeneralMaster().subscribe((res: any) => {
      this.generalmasterList = res.data;
    })
  }
  activeInactive(id: any) {
    var json = new generalMaster
    json.generalId = id
    json.updatedBy = this.UserId
    this.MasterServices.disableAndEnableGeneralMaster(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getGeneralMaster()
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          this.toastrService.error(err.error.Message, 'Error !');
        }

      }
    })
  }
  //excel_converter_download
  downloadExcel(tablerefrece:any){
    let fileName='generalMaster.xLsx'
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
  redirection(data?:any) {
    debugger
    if(data==undefined){
      this.routes.navigate(['/master/general-master-list/'],{ queryParams: { codetypeId: this?.codetypeId,headerDesc:this?.genMasterlabel}})
      this.modalservice.closeModal()
    }else{
      this.modalservice.closeModal()
    this.genMasterlabel = data.headerDesc
    this.codetypeId = data.codeTypeId
    this.codeId = data.maxGeneralMasterId
    this.idDesc = data.idDesc
    this.namedesc = data.nameDesc
    this.routes.navigate(['/master/general-master-list/'],{ queryParams: { codetypeId: this?.codetypeId,headerDesc:this?.genMasterlabel}})
    }
  }

  getAllCodeType() {
    this.MasterServices.getAllCodeType().subscribe((res: any) => {
      this.codeTypeList = res.data
      this.dtTrigger.next(null)
    })
  }
  modelopen(model: any, data: any) {
debugger

    this.genMasterlabel = data.headerDesc
    this.codetypeId = data.codeTypeId
    this.codeId = data.maxGeneralMasterId
    this.idDesc = data.idDesc
    this.namedesc = data.nameDesc
    this.modalservice.modalOpenSuccess(model, popupclass.info, true, false, false, popupclass.small)
  }
  model_dismiss(){
    this.modalService.dismissAll()
    $('#MyTable').DataTable().destroy();
    this.getAllCodeType()
  }
}
