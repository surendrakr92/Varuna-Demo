import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuAccessMaster } from 'src/app/models/master';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-create-menu-access-master',
  templateUrl: './create-menu-access-master.component.html',
  styleUrls: ['./create-menu-access-master.component.scss']
})
export class CreateMenuAccessMasterComponent {
  constructor(private formbuilder: FormBuilder,
    private masterservice: CountryMasterService,
    private router: ActivatedRoute,
    private routes: Router,
    private toastrService: ToastrService) { }
  menuAccform!: FormGroup;
  submitted!: true
  menuAccId: any = ""
  rolemasterList:any=[]
  viewPagecom=""
  web_pageList:any=[]
  ngOnInit(): void {
    this.menuAccform = this.formbuilder.group({
      webPageId: ['', Validators.required],
      roleId: ['', Validators.required],
      haveAdd: [true],
      haveRead: [true],
      haveUpdate: [true],
      haveDelete: [true],
      haveAddTCode: [true],
      haveReadTCode: [true],
      haveUpdateTCode: [true],
      haveDeleteTCode: [true],
      isActive: [true],
    })
    this.router.params.subscribe((res) => {
      let stateMasterId = res.data || res.viewData
      if(res.data) this.viewPagecom="edit"
      if(res.viewData) this.viewPagecom="view"
      if (stateMasterId) {
        this.masterservice.getMenuAccMasterById(stateMasterId).subscribe((res: any) => {
          this.menuAccId = res.data
          this.menuAccform.patchValue(res.data)
          
         
        })
      }
    })
    this.getMenuList()
    this.getroleMaster()
  }
  get f() {
    return this.menuAccform.controls;
  }
  getMenuList() {
    this.masterservice.getAllMenuMasterList().subscribe((res: any) => {
      this.web_pageList = res.data
    })
  }
  getroleMaster() {
    this.masterservice.getAllRoleMasterList().subscribe((res: any) => {
      this.rolemasterList = res.data
    })
  }
  submit() {
    this.submitted = true;
    if (this.menuAccform.invalid) {
      return

    }
    var stateJson = new MenuAccessMaster
    stateJson = this.menuAccform.value
    if (this.menuAccId.accessId == undefined) { stateJson.createdBy = +'00005301' }
    else { stateJson.updatedBy = +'00005301'; stateJson.accessId = this.menuAccId.accessId }

    console.log(stateJson)
    if (this.menuAccId == "") {
      this.masterservice.createMenuAccMaster(stateJson).subscribe((result) => {

        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/menu-access-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.menuAccform.get(err.error.Errors[prop]?.PropertyName);
              //wrong key comes 
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: err.error.Errors[prop]?.ErrorMessage
                });
              }
            });

          }
          this.toastrService.error('some thing went wrong', 'Error !');
        }
      })

    } else {
      this.masterservice.editMenuAccMaster(stateJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/menu-access-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.menuAccform.get(err.error.Errors[prop]?.PropertyName);
              //wrong key comes 
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: err.error.Errors[prop]?.ErrorMessage
                });
              }
            });

          }
          this.toastrService.error('some thing went wrong', 'Error !');
        }
      })
    }
  }
}