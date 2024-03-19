import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { get } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { zoneMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
declare var $: any
@Component({
  selector: 'app-new-zone',
  templateUrl: './new-zone.component.html',
  styleUrls: ['./new-zone.component.scss']
})
export class NewZoneComponent implements OnInit {
  formZoneMaster!: FormGroup;
  submitted!: true
  zoneDetailsById: any=""
  UserId:any
  constructor(private formbuilder: FormBuilder,
    private toastrService: ToastrService,
    private routes: Router, private cs:CommonServiceService,//for id
    private router:ActivatedRoute,
    private masterservice: CountryMasterService) {
      this.UserId=this.cs.login_User_Code()//for id
  }

  ngOnInit(): void {
    this.formZoneMaster = this.formbuilder.group({
       shortCode: ['', [Validators.required,Validators.pattern("^[a-zA-Z0-9]{2,}")]],
      zoneName: ['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9]{3,}(?: [a-zA-Z0-9]+)*$')]],
      isActive: [true]

    })
    this.router.params.subscribe((res) => {
     
      let stateMasterId = res.data
      if (stateMasterId) {
        this.masterservice.getZoneDetailsById(stateMasterId).subscribe((res: any) => {
          this.zoneDetailsById = res.data
          this.formZoneMaster.patchValue(res.data)
        })
      }
    })
  }

  get f() {
    return this.formZoneMaster.controls;
  }
  OnSubmit() {
    debugger
    this.submitted = true;
    if (this.formZoneMaster.invalid) {
      return

    }
    var zoneJson = new zoneMaster
    zoneJson = this.formZoneMaster.value
    if (this.zoneDetailsById.zoneId == undefined) { zoneJson.createdBy = +this.UserId }
    else { zoneJson.updatedBy = +this.UserId ; zoneJson.zoneId = this.zoneDetailsById.zoneId }

    console.log(zoneJson)
    if (this.zoneDetailsById == "") {
      this.masterservice.createZonemaster(zoneJson).subscribe((result) => {

        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['/master/zone-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formZoneMaster.get(err.error.Errors[prop]?.PropertyName);
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
      this.masterservice.editZoneMaster(zoneJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['/master/zone-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formZoneMaster.get(err.error.Errors[prop]?.PropertyName);
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
}
