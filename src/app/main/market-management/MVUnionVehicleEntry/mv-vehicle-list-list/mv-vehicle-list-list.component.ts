import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { MvVehicleList } from 'src/app/models/Class/marketM';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';
declare var $: any
@Component({
  selector: 'app-mv-vehicle-list-list',
  templateUrl: './mv-vehicle-list-list.component.html',
  styleUrls: ['./mv-vehicle-list-list.component.scss']
})
export class MvVehicleListListComponent implements OnInit {
  MvVehicleList: any = [];
  UserId: any
  branchList: any
  submitted = false
  formMaster!: FormGroup
  mvVehicleDetailById: any = ""
  mvvehicleId:any
  mvVehicleDetailsById:any
  constructor(private masterservice: EventMasterService, private activeroute: ActivatedRoute,
    private countryservice: CountryMasterService, private formbuilder: FormBuilder, private activeRoutes:ActivatedRoute,
    private routes: Router,
    private toastrService: ToastrService, private cs: CommonServiceService,//for id
  ) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 30, 50, 100],
      // processing:true,
    }
    this.UserId = this.cs.login_User_Code()//for id
  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.getAllMvVehicleList()
    this.getBranchMaster()
    this.formMaster = this.formbuilder.group({
      locationId: ['', Validators.required],
      vehicleNo: ['', [Validators.required,Validators.pattern(/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/)]],
      isActive: [true]
    })

this.activeRoutes.params.subscribe((res:any)=>{
this.mvvehicleId =res.id
})
if(this.mvvehicleId){
  this.masterservice.getMvVehiclelistDetailsById(this.mvvehicleId).subscribe((res:any)=>{
this.mvVehicleDetailsById= res.data

  })
}
  }


//
activeInactive(id: any) {
  var json =new MvVehicleList
  json['unionVehId']=id
  json.updatedBy=this.UserId //for Id  
  this.masterservice.disableAndEnableMvVehiclelist(json).subscribe((res: any) => {
    if (res.succeeded) {
      this.toastrService.success('succesfully changed status', 'Success-200 !');
      $('#MyTable').DataTable().destroy();
      this.getAllMvVehicleList()
      
    }
  }, err => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 422) {  
        this.toastrService.error(err.error.Message, 'Error !');
      }

    }
  })
}



  get f() {
    return this.formMaster.controls
  }
  onSubmit() {
    this.submitted = true
    if (this.formMaster.invalid) {
      return
    }
    var mvvehicleJson = new MvVehicleList
    mvvehicleJson = this.formMaster.value
    if (this.mvVehicleDetailById.unionVehId == undefined) { mvvehicleJson.createdBy = +this.UserId }
    else { mvvehicleJson.updatedBy = +this.UserId; mvvehicleJson.unionVehId = this.mvVehicleDetailById.unionVehId }
    console.log(mvvehicleJson)
    if (this.mvVehicleDetailById == "") {
      this.masterservice.createMvVehiclelist(mvvehicleJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getAllMvVehicleList()
        this.formMaster.reset()
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formMaster.get(err.error.Errors[prop]?.PropertyName);
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
      this.masterservice.editMvVehiclelist(mvvehicleJson).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getAllMvVehicleList()
        this.formMaster.reset()
        this.mvVehicleDetailById = ''
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            debugger
            Object.keys(err.error.Errors).forEach((prop: any) => {
              const formControl = this.formMaster.get(err.error.Errors[prop]?.PropertyName);
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
  getAllMvVehicleList() {
    this.masterservice.getAllMvVehiclelist().subscribe((res: any) => {
      this.MvVehicleList = res.data
      this.dtTrigger.next(null)
    })
  }
  getBranchMaster() {
    this.countryservice.getAllBranchMasterList().subscribe((res: any) => {
      this.branchList = res.data
    })
  }
  redirectionEdit(id: any) {
    this.masterservice.getMvVehiclelistDetailsById(id).subscribe((res: any) => {
      if (res) {
        this.mvVehicleDetailById = res.data
        this.formMaster.patchValue(this.mvVehicleDetailById)
      }
    })
  }



}

