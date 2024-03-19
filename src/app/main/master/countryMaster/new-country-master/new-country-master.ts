import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountryMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-create-new',
  templateUrl: './new-country-master.html',
  styleUrls: ['./new-country-master.scss']
})
export class CreateNewComponent implements OnInit {
  constructor(private formbuilder: FormBuilder, private masterservice: CountryMasterService,
    private routes: Router, private toastrService: ToastrService, private router: ActivatedRoute
    ,private cs:CommonServiceService) {
      this.UserId=this.cs.login_User_Code()//for id
     }
  formCountryMaster!: FormGroup;
  submitted!: true
  countryDetailsById: any=""
  UserId:any
  ngOnInit(): void {
    this.formCountryMaster = this.formbuilder.group({
      shortCode: ['', [Validators.required, Validators.pattern("^[a-zA-Z]{2,}")]],
      countryName: ['', [Validators.required, Validators.pattern('^(?! )[a-zA-Z]{3,}(?: [a-zA-Z]+)*$')]],
      isActive: [true]
    })
    this.router.params.subscribe((res) => {
      let countryMasterId = res.data
      if (countryMasterId) {
        this.masterservice.getAllCountryListDetailsById(countryMasterId).subscribe((res: any) => {
          this.countryDetailsById = res.data
          this.formCountryMaster.patchValue(res.data)
        })
      }
    })
  }
  get f() {
    return this.formCountryMaster.controls;
  }
  countrysubmit() {
    this.submitted = true;
    if (this.formCountryMaster.invalid) {
      return
    }
    var countryJson = new CountryMaster
    countryJson = this.formCountryMaster.value
    if(this.countryDetailsById.countryId==undefined){countryJson.createdBy = +this.UserId}
    else{countryJson.updatedBy = +this.UserId ;countryJson.countryId=this.countryDetailsById.countryId} 
    console.log(countryJson)
    if(this.countryDetailsById==""){
      this.masterservice.createCountry(countryJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/country-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formCountryMaster.get(err.error.Errors[prop]?.PropertyName);
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
    }else{
      this.masterservice.editCountryMaster(countryJson).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/country-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formCountryMaster.get(err.error.Errors[prop]?.PropertyName);
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
