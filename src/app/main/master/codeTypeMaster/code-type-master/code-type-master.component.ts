import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { codeTypeMaster, generalMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';
declare var $: any
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-code-type-master',
  templateUrl: './code-type-master.component.html',
  styleUrls: ['./code-type-master.component.scss']
})
export class CodeTypeMasterComponent {
  codeTypeList: any = [];
  genMasterlabel = ""
  formCodeType!: FormGroup;
  submitted = false;
  codetypeId: any = ""
  idDesc: any = ""
  namedesc = ""

  constructor(private mastersrvices: CountryMasterService,
    private formbuilder: FormBuilder, private routes: Router,
    private toastrService: ToastrService,
    private cs:CommonServiceService,//for id
    private modalservice: ModalPopupService) {

    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
    this.UserId=this.cs.login_User_Code()//for id
  }
  UserId:any
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.getAllCodeType()


    this.formCodeType = this.formbuilder.group({
      codeDesc: ['', Validators.required]
    })

  }

  getAllCodeType() {
    this.mastersrvices.getAllCodeType().subscribe((res: any) => {
      this.codeTypeList = res.data
      this.dtTrigger.next(null)
    })
  }


  redirectionEdit(id: any) {
    this.routes.navigate(['master/general-master-configuration/update-general-master-configuration', id])
  }
  activeInactive(id: any) {
    var json = new codeTypeMaster
    json.codeTypeId = id
    json.updatedBy = this.UserId
    this.mastersrvices.disableAndEnableCodeTypeMaster(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getAllCodeType()

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
  downloadExcel(tablerefrece: any) {
    let fileName = 'codeTypeMaster.xLsx'
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

  get f() {
    return this.formCodeType.controls
  }

}

