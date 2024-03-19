import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { cityMaster } from "src/app/models/master";
import { CommonServiceService } from "src/app/services/commonService/common-service.service";
import { CountryMasterService } from "src/app/services/master-service/country-master.service";
@Component({
  selector: "app-new-city-master",
  templateUrl: "./new-city-master.component.html",
  styleUrls: ["./new-city-master.component.scss"],
})
export class NewCityMasterComponent implements OnInit {
  constructor(
    private formbuilder: FormBuilder,
    private masterservice: CountryMasterService,
    private routes: Router,
    private toastrService: ToastrService,
    private cs: CommonServiceService, //for id
    private router: ActivatedRoute
  ) {
    this.UserId = this.cs.login_User_Code(); //for id
  }
  UserId: any;
  formCityMaster!: FormGroup;
  submitted!: true;
  cityDetailsById: any = "";
  stateList: any = [];
  branchList: any = [];
  countryList: any = [];
  ngOnInit(): void {
    this.formCityMaster = this.formbuilder.group({
      countryId: ["", Validators.required],
      stateId: ["", Validators.required],
      branchId: ["", Validators.required],
      cityName: [
        "",
        [
          Validators.required,
          Validators.pattern("^(?! )[a-zA-Z]{3,}(?: [a-zA-Z0-9]+)*$"),
        ],
      ],
      isActive: [true],
    });
    this.getCountryList();
    this.router.params.subscribe((res) => {
      let stateMasterId = res.data;
      if (stateMasterId) {
        this.masterservice
          .getCityListDetailsById(stateMasterId)
          .subscribe((res: any) => {
            this.cityDetailsById = res.data;
            this.getStateList(res.data.countryId);
            this.formCityMaster.patchValue(res.data);
          });
      }
    });
  }
  get f() {
    return this.formCityMaster.controls;
  }
  OnSubmit() {
    this.submitted = true;
    if (this.formCityMaster.invalid) {
      return;
    }
    var stateJson = new cityMaster();
    stateJson = this.formCityMaster.value;
    if (this.cityDetailsById.stateId == undefined) {
      stateJson.createdBy = +this.UserId;
    } else {
      stateJson.updatedBy = +this.UserId;
      stateJson.cityId = this.cityDetailsById.cityId;
    }

    console.log(stateJson);
    if (this.cityDetailsById == "") {
      this.masterservice.createCity(stateJson).subscribe(
        (result) => {
          this.toastrService.success("succesfully Created !", "Success-200 !");
          this.routes.navigate(["master/city-master"]);
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 422) {
              Object.keys(err.error.Errors).forEach((prop: any) => {
                const formControl = this.formCityMaster.get(
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
      this.masterservice.editCityMaster(stateJson).subscribe(
        (result) => {
          this.toastrService.success("succesfully Updated !", "Success-200 !");
          this.routes.navigate(["master/city-master"]);
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 422) {
              debugger;

              Object.keys(err.error.Errors).forEach((prop: any) => {
                const formControl = this.formCityMaster.get(
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
  getStateList(data?: any) {
    this.masterservice.getAllStateMasterList(data).subscribe((res: any) => {
      this.stateList = res.data;
    });
  }
  getCountryList() {
    this.masterservice.getAllCountryList().subscribe((res: any) => {
      this.countryList = res.data;
    });
    this.masterservice.getAllBranchMasterList().subscribe((res: any) => {
      this.branchList = res.data;
    });
  }
  dropdownBindState(data: any) {
    this.formCityMaster.controls["stateId"].setValue("");
    this.getStateList(data);
  }
}
