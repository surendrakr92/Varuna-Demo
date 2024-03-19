import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

import * as XLSX from "xlsx";
@Component({
  selector: 'app-load-ability-mapping',
  templateUrl: './load-ability-mapping.component.html',
  styleUrls: ['./load-ability-mapping.component.scss']
})
export class LoadAbilityMappingComponent implements OnInit {
  // vehicleLoadTypeList: any = [];
  loadabilityMappingList:any=[];
  loadabilityIdList:any
  customerList:any
  UserId: any;
  FormMaster!: FormGroup;
  submitted = false;
  vehicleTypeIdList: any = [];
 
  loadTypeId: any = "";
  constructor(
    private cs: CommonServiceService,
    private modalService: ModalPopupService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private evService: EventMasterService,
    private ms: CountryMasterService,
    private masterService:CustomerMasterServiceService,

  ) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    };
    this.UserId = this.cs.login_User_Code(); //for id
  }
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
  this.formValidation()
    this.getLoadAbilityMapping();
    this.getDropDown();
    this.getCustomerMaster()
  }
  get f() {
    return this.FormMaster.controls;
  }
  getLoadAbilityMapping() {
    this.evService.getAllLoadAbilitymappingList().subscribe((res: any) => {
      if (res) this.loadabilityMappingList = res.data;
      this.dtTrigger.next(null);
    });
  }
  formValidation(){
    this.FormMaster = this.fb.group({
      loadTypeId: ["", Validators.required],
         custId:["", Validators.required],
         vehicleType: ["", Validators.required],
         isActive: [true], 
         
        });
  }
  downloadExcel() {
    let fileName = "loadabilityMappingList.xLsx";
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.loadabilityMappingList
    );
    Object.keys(ws).forEach((key) => {
      if (ws[key].v === "Action") {
        delete ws[key];
      }
    });
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    /* save to file */
    XLSX.writeFile(wb, fileName);
  }
  modelOpen(model: any, popCond: any) {
    debugger;
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
    if (popCond == "createW") {
      this.FormMaster.reset();
      this.formValidation()
      this.loadTypeId = "";
    } else
      this.evService
        .getLoadAbilitymappingById(popCond)
        .subscribe((res: any) => {
          if (res) {
            this.loadTypeId = res.data[0];
            this.FormMaster.patchValue(this.loadTypeId);
          }
        });
  }
  submitClaimTDetails() {
    debugger;
    this.submitted = true;
    if (this.FormMaster.invalid) return;
    var loadAbilityJson: any;
    loadAbilityJson = this.FormMaster.value;
    if (this.loadTypeId.recordId == undefined) {
      loadAbilityJson.createdBy = +this.UserId;
    } else {
      loadAbilityJson.updatedBy = +this.UserId;
      loadAbilityJson.recordId = this.loadTypeId.recordId;
    }
    console.log(loadAbilityJson);
    if (this.loadTypeId == "") {
      this.evService.createAllLoadAbilitymapping(loadAbilityJson).subscribe(
        (result) => {
          this.toastrService.success("succesfully Created !", "Success-200 !");
          this.modalService.closeModal();
          $("#MyTable").DataTable().destroy();
          this.getLoadAbilityMapping();
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 422) {
              debugger;
              Object.keys(err.error.Errors).forEach((prop: any) => {
                const formControl = this.FormMaster.get(
                  err.error.Errors[prop]?.PropertyName
                );
                //wrong key comes
                if (formControl) {
                  // activate the error message
                  formControl.setErrors({
                    serverError: err.error.Errors[prop]?.ErrorMessage,
                  });
                }
              });
            }
            this.toastrService.error(
              err.error.Message,
              `Error statu:${err.status}`
            );
          }
        }
      );
    } else {
      this.evService.editLoadAbilitymapping(loadAbilityJson).subscribe(
        (result) => {
          this.toastrService.success("succesfully Updated !", "Success-200 !");
          this.modalService.closeModal();
          $("#MyTable").DataTable().destroy();
          this.getLoadAbilityMapping();
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 422) {
              debugger;
              Object.keys(err.error.Errors).forEach((prop: any) => {
                const formControl = this.FormMaster.get(
                  err.error.Errors[prop]?.PropertyName
                );
                //wrong key comes
                if (formControl) {
                  // activate the error message
                  formControl.setErrors({
                    serverError: err.error.Errors[prop]?.ErrorMessage,
                  });
                }
              });
            }
            this.toastrService.error(
              err.error.Message,
              `Error statu:${err.status}`
            );
          }
        }
      );
    }
  }
  getDropDown() {
    // this.ms
    //   .getGeneralMasterByCodeTyoeId(91)
    //   .subscribe((res: any) => (this.vehicleTypeIdList = res.data));
    // this.ms
    //   .getGeneralMasterByCodeTyoeId(92)
    //   .subscribe((res: any) => (this.loadabilityIdList = res.data));
   this.evService.getLoabilityMaByVhType().subscribe((res:any)=>{
     this.loadabilityIdList=res.data
   })
  }
getCustomerMaster(){
  this.masterService.getAllCustomerMaster().subscribe((res:any)=>{
this.customerList= res.data
console.log(this.customerList)
  })
}

  activeInactive(id: any) {
    debugger
    var json: any={};
    json['recordId'] = id
    json['updatedBy'] = this.UserId //for Id  
    this.evService.disableAndEnableLoadAbilitymapping(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getLoadAbilityMapping()
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
