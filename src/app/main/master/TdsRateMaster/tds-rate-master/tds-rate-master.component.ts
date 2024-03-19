import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { Subject } from 'rxjs';
import { rateMaster, tdsServiceMaster, tdsrateMaster } from 'src/app/models/master';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-tds-rate-master',
  templateUrl: './tds-rate-master.component.html',
  styleUrls: ['./tds-rate-master.component.scss']
})
export class TdsRateMasterComponent implements OnInit {
  formTdsRateMaster: any = FormGroup
  formTdsServicesMaster: any = FormGroup
  formTdsRate: any = FormGroup
  submitted = false
  submitted2 = false
  submitted3 = false
  tdsRateMasterList: any
  TdsRateMasterList: any
  TdsServiceMasterList: any
  tdsRatemasterById: any = ""
  tdsServicemasterById: any = ""
  tdsRateById: any = ""
  tdsSectionId: any = ""
  rateList: any
  mngScnD: any
  serviceList: any
  tdsSectionList: any
  activeTabAcc = 'tdsSection';
  mngFrstD: any
  minDatePast: any = new Date().toISOString().slice(0, 10)
  @ViewChild('MyTable1', { static: false }) table1: DataTableDirective | any;
  @ViewChild('MyTable2', { static: false }) table2: DataTableDirective | any;
  @ViewChild('MyTable3', { static: false }) table3: DataTableDirective | any;
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  public isDataLoaded = false;
  public isDataLoadedd = false;
  public isDataLoadeddd = false;
  constructor(private formbuilder: FormBuilder,
    private activeroute: ActivatedRoute, private cs: CommonServiceService,//for id
    private masterservice: CountryMasterService, private routes: Router, private toastrService: ToastrService) {
    this.initializeDataTables()
    this.UserId = this.cs.login_User_Code()//for id
  }
  UserId: any
  ngOnInit(): void {
    this.getAllGeneralMasterDropDown()
    // this.getAllTdsSectionMaster()
    this.getTdsServiceMsaterform()
    // this.getAllTdsServiceMaster()
    this.getTdsRateForm()
    this.tds1stform()
    this.activeroute.params.subscribe((res: any) => {
      let tdsRateMasterId = res.data
      if (tdsRateMasterId) {
        this.masterservice.getTdsRateMasterById(tdsRateMasterId).subscribe((res: any) => {
          this.tdsRatemasterById = res.data
          this.tdsServicemasterById = res.data
          this.tdsRateById = res.data
          this.formTdsRateMaster.patchValue()
        })
      }
    })
  }
  tds1stform() {
    this.formTdsRateMaster = this.formbuilder.group({
      tdsSectionTypeId: ['', Validators.required],
      activeDate: ['', Validators.required],
      inActiveDate: [''],
      isActive: [true],
    })
  }
  getTdsServiceMsaterform() {
    this.formTdsServicesMaster = this.formbuilder.group({
      tdsSectionTypeId: ['', Validators.required],
      expenseNature: ['', Validators.required],
      serviceTypeDescription: ['', Validators.required],
      inactiveDate: ['', Validators.required],
      activeDate: ['', Validators.required],
      isActive: [true],

    })
  }
  getTdsRateForm() {
    this.formTdsRate = this.formbuilder.group({
      corporateRate: ['', Validators.required],
      nonCorporateRate: ['', Validators.required],
      serviceType: ['', Validators.required],
      thresHoldInvoice: ['', Validators.required],
      thresHoldAnual: ['', Validators.required],
      tdsSectionId: ['', Validators.required],
      isActive: [true]
    })
  }

  get f() {
    return this.formTdsRateMaster.controls
  }
  get fs() {
    return this.formTdsServicesMaster.controls
  }
  get fsr() {
    return this.formTdsRate.controls
  }
  onSubmit() {
    this.submitted = true
    if (this.formTdsRateMaster.invalid) {
      return
    }
    var tdsRateJson = new tdsrateMaster
    tdsRateJson = this.formTdsRateMaster.value
    if (this.tdsRatemasterById.tdsSectionId == undefined) { tdsRateJson.createdBy = +this.UserId }
    else { tdsRateJson.updatedBy = +this.UserId; tdsRateJson.tdsSectionId = this.tdsRatemasterById.tdsSectionId }
    console.log(tdsRateJson)
    if (this.tdsRatemasterById == "") {
      this.masterservice.createTdsRateMaster(tdsRateJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        $('#MyTable1').DataTable().destroy();
        this.getAllTdsSectionMaster()
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formTdsRateMaster.get(err.error.Errors[prop]?.PropertyName);
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

    } else {
      debugger
      this.masterservice.updateTdsRateMaster(tdsRateJson).subscribe((result) => {
        this.toastrService.success('succesfully Updated. !', 'Success-200 !');
        $('#MyTable1').DataTable().destroy();
        this.getAllTdsSectionMaster()
        // alert(0)
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formTdsRateMaster.get(err.error.Errors[prop]?.PropertyName);
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
      this.tds1stform()
      this.submitted = false
    }

  }
  onServiceSubmit() {
    this.submitted2 = true
    if (this.formTdsServicesMaster.invalid) {
      return
    }
    var tdsRateJson = new tdsServiceMaster
    tdsRateJson = this.formTdsServicesMaster.value
    if (this.tdsServicemasterById.serviceTypeId == undefined) { tdsRateJson.createdBy = +this.UserId }

    else { tdsRateJson.updatedBy = +this.UserId; tdsRateJson.serviceTypeId = this.tdsServicemasterById.serviceTypeId }

    console.log(tdsRateJson)
    if (this.tdsServicemasterById == "") {
      this.masterservice.createTdsRateServiceMaster(tdsRateJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.formTdsServicesMaster.reset()
        this.getAllTdsServiceMaster()
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formTdsServicesMaster.get(err.error.Errors[prop]?.PropertyName);
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
    } else {
      this.masterservice.updateTdsRateServiceMaster(tdsRateJson).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.formTdsServicesMaster.reset()
        $('#MyTable').DataTable().destroy();
        this.getAllTdsServiceMaster()
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger

            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formTdsServicesMaster.get(err.error.Errors[prop]?.PropertyName);
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
    }
    this.getTdsServiceMsaterform()
    this.submitted2 = false
  }

  onRateSubmit() {
    this.submitted3 = true
    if (this.formTdsRate.invalid) {
      return
    }
    var tdsRateJson = new rateMaster
    tdsRateJson = this.formTdsRate.value
    if (this.tdsRateById.tdsRateId == undefined) { tdsRateJson.createdBy = +this.UserId }
    else { tdsRateJson.updatedBy = +this.UserId; tdsRateJson.tdsRateId = this.tdsRateById.tdsRateId }
    console.log(tdsRateJson)
    if (this.tdsRateById == "") {
      this.masterservice.createTdsRate(tdsRateJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.formTdsRate.reset()
        $('#MyTable').DataTable().destroy();
        this.getAllrate()
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formTdsRate.get(err.error.Errors[prop]?.PropertyName);
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
    } else {
      this.masterservice.updateTdsRate(tdsRateJson).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.formTdsRate.reset()
        $('#MyTable').DataTable().destroy();
        this.getAllrate()
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formTdsRate.get(err.error.Errors[prop]?.PropertyName);
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
    }
    this.getTdsRateForm()
    this.submitted3 = false
  }
  getAllTdsSectionMaster() {
    this.masterservice.getAllTdsRateMaster().subscribe((res: any) => {
      this.TdsRateMasterList = res.data
      if (this.isDataLoaded && this.table1) {
        this.table1?.dtInstance?.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.initializeDataTables();
          this.dtTrigger.next(null);
        });
      } else {
        this.isDataLoaded = true;
      }
    })
  }
  getAllTdsServiceMaster() {
    this.masterservice.getAllTdsRateServiceMaster().subscribe((res: any) => {
      this.TdsServiceMasterList = res.data
      if (this.isDataLoadedd && this.table2) {
        this.table2?.dtInstance?.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.initializeDataTables();
          this.dtTrigger.next(null);
        });
      } else {
        this.isDataLoadedd = true;
      }
    })
  }
  getAllrate() {
    this.masterservice.getAllRate().subscribe((res: any) => {
      this.rateList = res.data
      if (this.isDataLoadeddd && this.table3) {
        this.table3?.dtInstance?.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.initializeDataTables();
          this.dtTrigger.next(null);
        });
      } else {
        this.isDataLoadeddd = true;
      }
    })
  }
  redirectionEdit(id: any) {
    this.routes.navigate(['master/tds-rate-master', id])
  }
  activeInactive(id: any) {
    var Json = new tdsrateMaster
    Json.tdsSectionId = id
    Json.updatedBy = this.UserId
    this.masterservice.disableAndEnableTdsRateMaster(Json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable1').DataTable().destroy();
        this.getAllTdsSectionMaster()
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          this.toastrService.error(err.error.Message, 'Error !');
        }

      }
    })
  }
  activeInactiveIN(id: any) {
    var Json = new tdsServiceMaster
    Json.serviceTypeId = id
    Json.updatedBy = this.UserId
    this.masterservice.disableAndEnableTdsRateServiceMaster(Json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable2').DataTable().destroy();
        this.getAllTdsServiceMaster()
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          this.toastrService.error(err.error.Message, 'Error !');
        }

      }
    })
  }
  activeInactiverate(id: any) {
    var Json = new rateMaster
    Json.tdsRateId = id
    Json.updatedBy = this.UserId
    this.masterservice.disableAndEnableTdsRate(Json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable3').DataTable().destroy();
        this.getAllrate()
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          this.toastrService.error(err.error.Message, 'Error !');
        }

      }
    })
  }
  getAllGeneralMasterDropDown() {
    this.masterservice.getGeneralMasterByCodeTyoeId(54).subscribe((res: any) => {
      this.tdsRateMasterList = res.data
    })
    this.masterservice.getAllTdsRateServiceMaster().subscribe((res: any) => {
      this.serviceList = res.data
    })
    this.masterservice.getAllTdsRateMaster().subscribe((res: any) => {
      this.tdsSectionList = res.data
    })
  }
  toggle(tab: any) {
    this.activeTabAcc = tab
    if (this.activeTabAcc === 'tdsSection') {
      this.getAllTdsSectionMaster()
      console.log(this.activeTabAcc)
    } else if (this.activeTabAcc === 'serviceToggle') {
      this.getAllTdsServiceMaster()
      console.log(this.activeTabAcc)
    } else {
      this.getAllrate()
    }

  }

  editfile(data: any) {
    this.tdsRatemasterById = data
    this.formTdsRateMaster.patchValue(data)
    this.formTdsRateMaster.controls['activeDate'].patchValue((data.activeDate).slice(0, 10))
    this.formTdsRateMaster.controls['inActiveDate'].patchValue((data.inActiveDate).slice(0, 10))
  }
  editServicefile(data: any) {
    debugger
    this.tdsServicemasterById = data
    this.formTdsServicesMaster.patchValue(data)
    this.formTdsServicesMaster.controls['activeDate'].patchValue((data.activeDate).slice(0, 10))
    this.formTdsServicesMaster.controls['inactiveDate'].patchValue((data.inactiveDate).slice(0, 10))
  }
  editRatefile(data: any) {
    this.tdsRateById = data
    console.log(data)
    this.formTdsRate.patchValue(data)
    this.formTdsRate.controls['serviceType'].patchValue(+(data.serviceType))
  }

  initializeDataTables() {
    this.dtOptions = {
      lengthMenu: [5, 10, 20, 50, 100],
      // ... (other DataTables options)
    };
  }
  mngDt(cond: any) {
    debugger
    if (cond == 'first') {
      this.mngFrstD = this.formTdsRateMaster.controls['activeDate'].value
      console.log(this.mngFrstD)
    } else {
      this.mngScnD = this.formTdsServicesMaster.controls['activeDate'].value
      console.log(this.mngFrstD)
    }
  }
}
