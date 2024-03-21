import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-create-route-rate-master',
  templateUrl: './create-route-rate-master.component.html',
  styleUrls: ['./create-route-rate-master.component.scss']
})
export class CreateRouteRateMasterComponent implements OnInit {
  submitted = false
  cityList: any
  routeMasterList: any
  pathcedDetails: any = ''
  routeGroupList: any
  toRouteListData: any
  constructor(private masterService: CountryMasterService,
    private cs: CommonServiceService,
    private toastrService: ToastrService,
    private router: Router,
    private routes: ActivatedRoute) { }
  routeMasterDetails: any = {
    "rateEntities": [
      {
        "groupId": 0,
        "fromCityId": 0,
        "toCityId": 0,
        "viaCityId": 0,
        "distance": 0,
        "additionalLoadedAveragePerKm": 0,
        "additionalEmptyAveragePerKm": 0,
        "dieselLtr": 0,
        "cash": 0,
        "cashOnTrailer": 0,
        "tollAmount": 0,
        "startDate": null,
        "endDate": null,
        "isActive": true,
        "createdBy": this.cs.login_UserId()
      }
    ]
  }
  ngOnInit(): void {
    this.dropDownMaster()
    this.routes.queryParams.subscribe((res: any) => {
      if (res.setupJ === 'updateJson') {
        this.masterService.getRouteratebyid(+(res.rateId)).subscribe((res: any) => {
          if (res.succeeded) {
            this.pathcedDetails = res.data
            this.routeMasterDetails.rateEntities = this.pathcedDetails
            return
          }
        })
      }

    })
    this.routes.params.subscribe((res) => {
      this.routeMasterDetails.rateEntities[0]['groupId'] = +res.id
    })

  }
  dropDownMaster() {
    this.masterService.getAllCityMasterList().subscribe((res: any) => {
      this.cityList = res.data
    })

    this.masterService.getAllRouteGroupList().subscribe((res: any) => {
      this.routeGroupList = res.data
    })
  }
  getRouteMaster(textSearchFrom: any, textSearchCity: any, cond: any) {
    let data = {
      routeId: 0,
      pageNumber: 0, // Use this.p for page number
      pageSize: 0,
      fromcity: textSearchFrom,
      tocity: textSearchCity
    };
    this.masterService.getAllRouteMasterByCity(data).subscribe((res: any) => {
      if (cond == 'fromCityId') this.routeMasterList = res.data;
      else this.toRouteListData = res.data;

    });
  }
  formcityData: any = undefined
  toCityData: any = undefined
  setUpJsonStruct(value: any, index: any, cond: string) {
    debugger
    if (cond == 'fromCityId') {
      this.formcityData = value?.fromCity
      this.routeMasterDetails.rateEntities[index][cond] = value.fromCityId
      this.routeMasterDetails.rateEntities[index]['distance'] = value?.routeKm
    }
    else if (cond == 'toCityId') {
      this.toCityData = value?.tocity
      this.routeMasterDetails.rateEntities[index][cond] = value?.toCityId
      this.routeMasterDetails.rateEntities[index]['distance'] = value?.routeKm
    } else {
      this.routeMasterDetails.rateEntities[index][cond] = value
    }
  }
  setUpJsonStructK(value: any, index: any, cond: string) {
    if (cond == 'fromCityId') {
      this.formcityData = value?.target?.value
      if (this.formcityData?.length > 3) this.getRouteMaster(this.formcityData, this.toCityData ?? '', cond)
    } else if (cond == 'toCityId') {
      this.toCityData = value?.target?.value
      if (this.toCityData?.length > 3) this.getRouteMaster(this.formcityData ?? '', this.toCityData, cond)
    }
  }
  addRowForTables(data: any) {
    debugger
    if (data == '' || data == 0) return
    if (data < 60) {
      const newLength = data;
      this.routeMasterDetails.rateEntities = Array.from({ length: newLength }, () => ({
        "groupId": 0,
        "fromCityId": 0,
        "toCityId": 0,
        "viaCityId": 0,
        "distance": 0,
        "additionalLoadedAveragePerKm": 0,
        "additionalEmptyAveragePerKm": 0,
        "dieselLtr": 0,
        "cash": 0,
        "cashOnTrailer": 0,
        "tollAmount": 0,
        "startDate": null,
        "endDate": null,
        "isActive": true,
        "createdBy": this.cs.login_UserId()
      }));
      console.log(this.routeMasterDetails.rateEntities);
    }
  }
  deleteArray(index: any) {
    debugger
    if (this.routeMasterDetails.rateEntities.length == 1) {
      this.toastrService.warning('At least one list should be needed', 'Error 302')
    } else {
      this.routeMasterDetails.rateEntities.splice(index, 1)
    }
  }
  finalSubmission() {

    if (this.pathcedDetails == '') {
      this.masterService.Createrouterate(this.routeMasterDetails).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.router.navigate(['master/route-rate-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
          }
          this.toastrService.error(`${err.error.Message}`, `Staus Code-${err.status}`);
        }
      })
    } else {
      this.routeMasterDetails.rateEntities[0]['updatedBy'] = this.cs.login_UserId()
      this.masterService.updateRouterate(this.routeMasterDetails).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.router.navigate(['master/route-rate-master']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
          }
          this.toastrService.error(`${err.error.Message}`, `Staus Code-${err.status}`);
        }
      })
    }

  }
}
