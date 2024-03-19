import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { popupclass } from 'src/app/models/Class/enum';
import { menuMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

@Component({
  selector: 'app-new-menu-master',
  templateUrl: './new-menu-master.component.html',
  styleUrls: ['./new-menu-master.component.scss']
})
export class NewMenuMasterComponent {


  constructor(private formbuilder: FormBuilder,
    private masterservice: CountryMasterService,
    private modalService: ModalPopupService,
    private routes: Router, private cs: CommonServiceService,//for id
    private toastrService: ToastrService, private router: ActivatedRoute) {
    this.UserId = this.cs.login_User_Code()//for id
  }
  UserId: any
  formMenuMaster!: FormGroup;
  subEntitiesForm!: FormGroup;
  submitted!: true
  submittO!: true
  menuMasterDetailsById: any = ""
  subMenuIndex: any = -1
  patchedAttachedData: any = ''
  modulelists: any = []
  deptttList: any = []
  DroDownactionList: any = []
  actionList: any = []
  menuMasterList: any = []
  subEntities: any = []
  ngOnInit(): void {
    this.formMenuMaster = this.formbuilder.group({
      menuCaption: ['', Validators.required],
      parentId: [''],
      moduleId: ['', Validators.required],
      deptId: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
      webPagePath: ['', Validators.required],
      icon: ['', Validators.required],
      webPageName: ['', Validators.required],
      pageDescription: ['', Validators.required],
      toolTip: ['', Validators.required],
      displayOrder: ['', Validators.required],
      isActive: [true]
    })
    this.SubMenuForm()
    this.router.params.subscribe((res) => {
      let menuMasterId = res.data
      if (menuMasterId) {
        this.masterservice.getMenuMasterDetailsById(menuMasterId).subscribe((res: any) => {
          this.menuMasterDetailsById = res.data
          this.formMenuMaster.patchValue(res.data)
          this.subEntities=res.data.subMenuEntities
        })
      }
    })
    this.getModuleList()
    this.getDepttist()
    this.getMenuList()
  }
  SubMenuForm() {
    this.subEntitiesForm = this.formbuilder.group({
      isActive: [true],
      actionId: ['', Validators.required],
      actionURL: ['', Validators.required],
      tCodeName: [''],
      description: ['', Validators.required],
      sortOrder: ['', Validators.required],
      createdBy: [this.UserId]
    })
  }
  get f() {
    return this.formMenuMaster.controls;
  }
  get ff() {
    return this.subEntitiesForm.controls;
  }
  getModuleList() {
    this.masterservice.getAllModuleMasterList().subscribe((res: any) => {
      this.modulelists = res.data;
    })


  }
  getDepttist() {
    this.masterservice.getAllDepartmentMasterList().subscribe((res: any) => {
      this.deptttList = res.data;
    })
  }
  getMenuList() {
    this.masterservice.getAllMenuMasterList().subscribe((res: any) => {
      this.menuMasterList = res.data.filter((x: { displayOrder: number; })=>x.displayOrder==0)
    })
    this.masterservice.getAllAction().subscribe((res: any) => {
      if (res.succeeded) {
        debugger
        this.actionList = res.data
        this.DroDownactionList = res.data
      }

    })
  }
  countrysubmit() {
    this.submitted = true;
    if (this.formMenuMaster.invalid) {
      return
    }
    if (this.subEntities == 0) {
      this.toastrService.warning('At least One list required of sub menu entities');
      return
    }
    var countryJson = new menuMaster
    countryJson = this.formMenuMaster.value
    if (this.menuMasterDetailsById.webPageId == undefined) {
      countryJson.createdBy = +this.UserId
      countryJson.subMenuEntities = this.subEntities
    }
    else { countryJson.updatedBy = +this.UserId; countryJson.webPageId =
       this.menuMasterDetailsById.webPageId 
      countryJson.subMenuEntities = this.subEntities}

    console.log(countryJson)
    if(this.menuMasterDetailsById==""){
      this.masterservice.createMenuMaster(countryJson).subscribe((result) => {

        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/menu-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formMenuMaster.get(err.error.Errors[prop]?.PropertyName);
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

    }else{
      this.masterservice.editMenuMaster(countryJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/menu-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formMenuMaster.get(err.error.Errors[prop]?.PropertyName);
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
  modelopen(model: any) {
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
    this.SubMenuForm()
    this.subEntitiesForm.updateValueAndValidity()
    this.subMenuIndex = -1
    this.patchedAttachedData=''
    this.listActionCOnversion()
  }
  redirectionEditForOwner(data: any, model: any, index: any) {
    this.patchedAttachedData = data
    this.subMenuIndex = index
    if (this.subMenuIndex > -1) {
      this.modalService.modalOpenSuccess(
        model,
        popupclass.info,
        true,
        false,
        false,
        popupclass.large
      );
       this.listActionCOnversion()
      this.DroDownactionList.push(data)
      this.subEntitiesForm.patchValue(data)
    }
  }
  subMenuD() {
    debugger
    this.submittO = true
    if (this.subEntitiesForm.invalid) {
      return
    }
    // if(this.subEntities.some((x: { actionId: any; })=>x.actionId=this.subEntitiesForm.controls['actionId'].value)
    // || this.subMenuIndex>-1){
    //   this.toastrService.warning('Already Selected Action Select Another');
    //   return
    // }
    if (this.subMenuIndex > -1) {
      // this.subEntitiesForm.value['subMenuEntities'] = this.patchedAttachedData?.ownerDtlId
      // this.subEntitiesForm.value['ownerId'] = this.patchedAttachedData?.ownerId
       this.subEntities[this.subMenuIndex] = this.subEntitiesForm.value
      this.modalService.closeModal()  
      console.log(this.subEntities)
      this.subEntitiesForm.reset()
      this.subEntitiesForm.updateValueAndValidity()
      return
    }
    this.subEntities.push({ ...this.subEntitiesForm.value })
    this.modalService.closeModal()
    console.log(this.subEntities)
    this.subEntitiesForm.reset()
    this.SubMenuForm()
    this.subEntitiesForm.updateValueAndValidity()
  }
  dataFind(ev:any){
    let value=this.actionList.find((x:any)=>x.actionId==ev)
    return value?.actionName
  }
  listActionCOnversion(){
  const actionIdsToDelete = new Set(this.subEntities.map((item: { actionId: any; }) => item.actionId)); 
  this.DroDownactionList= this.DroDownactionList.filter((item: { actionId: unknown; }) => !actionIdsToDelete.has(item.actionId)); // Filter out items with matching actionIds
  console.log(this.DroDownactionList)
  }
}
