import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finYear } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-new-financial-year',
  templateUrl: './new-financial-year.component.html',
  styleUrls: ['./new-financial-year.component.scss']
})
export class NewFinancialYearComponent implements OnInit {
  formFinYear!: FormGroup
  submitted = false
  finYearDetailsById: any = ""
  UserId:any

  constructor(private formbuilder: FormBuilder, private routes: Router,
    private router:ActivatedRoute,
    private masterservice: CountryMasterService, private cs:CommonServiceService,//for id
    private toastrService: ToastrService) { 
      this.UserId=this.cs.login_User_Code()//for id
    }
  ngOnInit(): void {
    this.formFinYear = this.formbuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      fileName: ['', Validators.required],
      isActive: [true],

    })
    this.router.params.subscribe((res) => {
      let finYearId = res.data
      if (finYearId) {
        this.masterservice.getFinacialYearById(finYearId).subscribe((res: any) => {
          this.finYearDetailsById = res.data
          this.formFinYear.patchValue(res.data)
          this.formFinYear.controls['startDate'].patchValue((res.data.startDate).slice(0,10))
          this.formFinYear.controls['endDate'].patchValue((res.data.endDate).slice(0,10))
        })
      }
    })
  }
  get f() {
    return this.formFinYear?.controls
  }
  submit() {
    this.submitted = true
    if (this.formFinYear.invalid) {
      return
    }
    var finYearJson = new finYear
    finYearJson = this.formFinYear.value
    if (this.finYearDetailsById.finId == undefined) { finYearJson.createdBy = +this.UserId }
    else { finYearJson.updatedBy = +this.UserId; finYearJson.finId = this.finYearDetailsById.finId }

    console.log(finYearJson)
    if (this.finYearDetailsById == "") {
      this.masterservice.createFinYear(finYearJson).subscribe((result) => {

        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/financial-year']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formFinYear.get(err.error.Errors[prop]?.PropertyName);
              //wrong key comes 
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: err.error.Errors[prop]?.ErrorMessage
                });
              }
            });

          }
          this.toastrService.error(err.error.Message, 'Error !');
        }
      })

    } else {
      this.masterservice.editFinYear(finYearJson).subscribe((result) => {

        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/financial-year']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formFinYear.get(err.error.Errors[prop]?.PropertyName);
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
