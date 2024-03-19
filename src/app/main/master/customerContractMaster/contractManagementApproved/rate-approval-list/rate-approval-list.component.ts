import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';
@Component({
  selector: 'app-rate-approval-list',
  templateUrl: './rate-approval-list.component.html',
  styleUrls: ['./rate-approval-list.component.scss']
})
export class RateApprovalListComponent implements OnInit {

  submitted = false;
  formMaster: any = FormGroup;
  cityList: any;
  loadTypeList: any;
  rateLoadType: any;
  tatBaseList: any;
  holidayStatus: any;
  loadingTerm: any;
  unloadingTeams: any;
  reasonUpdateList: any;
  primaarySourceList: any;
  laneMasterList: any = [];
  deliveryType: any;
  contractDetailsById: any = '';
  laneIdValues: any[] = [];
  matrixAllowed: any = []
  transitModeList: any = []
  RateTypeList: any = []
  filterjson: any = ''
  filterpatchedJson: any = {}
  sendingJsonForUpload: any=[]
  sendingJson: any = {
    "contractApproveRatelist": [
      {
        "rateid": 130,
        "isApproved": null,
        "isActive": false,
        "reasonofDisapproved": 0,
        "approvedBy": 4073,
        "approvedOn": "2023-11-07T08:11:43.396Z"
      }
    ]
  }
  rateApprovalJson: any = []
  userId: any
  submissionJson: any;
  constructor(private formbuilder: FormBuilder, private modalService: ModalPopupService, private cs: CommonServiceService, private toastrService: ToastrService, private routes: Router, private acroute: ActivatedRoute,
    private maserservice: CountryMasterService,
    private custService: CustomerMasterServiceService) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    };
    this.acroute.params.subscribe((res: any) => {
      this.contractDetailsById = res.id;
    });
    this.userId = this.cs.login_User_Code()
  }
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.filterjson = JSON.parse(sessionStorage.getItem('filterSearchfrRApp') || '{}')
    this.getCityList();
    this.getGeneralMasterDropDwon();
    this.formMaster = this.formbuilder.group({
      fromCity: ['', Validators.required],
      ApprovedStatus: [''],
      activeStatusId: [''],
      isActive: [true]
    });
    this.custService.rateApprovalFilter(this.filterjson).subscribe((result: any) => {
      if (result.data.length > 0) {
        this.rateApprovalJson = result.data
        console.log(this.rateApprovalJson)
      }
    })
  }
  get f() {
    return this.formMaster.controls;
  }
  getCityList() {
    this.maserservice.getAllCityMasterList().subscribe((res: any) => {
      this.cityList = res.data;
      let json = this.cityList.filter((x: any) => x.cityId == this.filterjson.fromCityId)
      this.filterpatchedJson['fromCityId'] = json[0]?.cityName
      // console.log(this.filterpatchedJson)
      debugger
      let jsons = this.cityList.filter((x: any) => x.cityId == this.filterjson.toCityId)
      this.filterpatchedJson['toCityId'] = jsons[0]?.cityName
      // console.log(this.filterpatchedJson)
    });
    this.maserservice.getAllLaneMaster().subscribe((res: any) => {
      this.laneMasterList = res.data;
      this.filterpatchedJson['location'] = res.data.filter((x: { laneId: number; }) => x.laneId == 1)[0]
      // console.log(this.filterpatchedJson)
      this.dtTrigger.next(null);
    });
  }

  ActiveStaus = [
    { id: 1, type: 'Active' },
    { id: 2, type: 'Inactive' },
  ]
  ApprovedStaus = [
    { id: 1, type: 'Approve' },
    { id: 2, type: 'Dis-Approve' },
  ]
  getGeneralMasterDropDwon() {
    this.maserservice.getGeneralMasterByCodeTyoeId(111).subscribe((res: any) => {
      this.tatBaseList = res.data;
    });
    this.maserservice.getGeneralMasterByCodeTyoeId(112).subscribe((res: any) => {
      this.holidayStatus = res.data;
    });
    this.maserservice.getGeneralMasterByCodeTyoeId(70).subscribe((res: any) => {
      this.unloadingTeams = res.data;
    });
    this.maserservice.getGeneralMasterByCodeTyoeId(110).subscribe((res: any) => {
      this.reasonUpdateList = res.data;
    });
    this.maserservice.getGeneralMasterByCodeTyoeId(115).subscribe((res: any) => {
      this.primaarySourceList = res.data;
    });
    this.maserservice.getGeneralMasterByCodeTyoeId(116).subscribe((res: any) => {
      this.deliveryType = res.data;
    });
    this.maserservice.getGeneralMasterByCodeTyoeId(122).subscribe((res: any) => {
      this.RateTypeList = res.data;
    });
    this.maserservice.getGeneralMasterByCodeTyoeId(123).subscribe((res: any) => {
      this.matrixAllowed = res.data;
      let json = this.matrixAllowed.filter((x: any) => x.generalId == this.filterjson.matrixTypeId)
      this.filterpatchedJson['matrixTypeId'] = json[0]?.codeDesc
      // console.log(this.filterpatchedJson)
    });
    this.maserservice.getGeneralMasterByCodeTyoeId(120).subscribe((res: any) => {
      this.transitModeList = res.data;
      let json = this.transitModeList.filter((x: any) => x.generalId == this.filterjson.transTypeId)
      this.filterpatchedJson['transTypeId'] = json[0]?.codeDesc
      this.filterpatchedJson['contractStartDate'] = this.filterjson?.contractStartDate
      this.filterpatchedJson['contractEndDate'] = this.filterjson?.contractEndDate

    });
    this.maserservice.getGeneralMasterByCodeTyoeId(63).subscribe((res: any) => {
      let ftlTypeList = res.data
      let json = ftlTypeList.filter((x: any) => x.generalId == this.filterjson.ftlTypeId)
      this.filterpatchedJson['ftlTypeId'] = json[0]?.codeDesc
      // console.log(this.filterpatchedJson)
    })



  }
  saveExit() {
    console.log(this.rateApprovalJson)
    // this.sendingJsonForUpload?.forEach((element:any) => {
    //   element['approvedBy']=this.userId
    // });
    let json={
      "contractApproveRatelist":this.paresiJson(this.sendingJsonForUpload)
    }
    this.custService.rateApproval(json).subscribe((result) => {
      this.toastrService.success('succesfully saved !', 'Success-200 !');
      this.routes.navigate(['master/rate-approval']);
      sessionStorage.setItem('contractIdBackUpForRateApproval', this.filterjson?.custIdData)
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger;
          Object.keys(err.error.Errors).forEach((prop: any) => {
          });
        }
        this.toastrService.error(err.error.Message, `Error status:${err.status}`);
      }
    });
  }
  saveDataForBackUp() {
    sessionStorage.setItem('contractIdBackUpForRateApproval', this.filterjson?.custIdData)
  }
  approvedStatus(data: any, index: any) {
    debugger
    this.rateApprovalJson[index]['isApproved'] = data
  }
  actionStatus(data: any, index: any) {
    debugger
    if (data == 2) {
      this.rateApprovalJson[index]['reasonofDisapproved'] = true
    } else {
      this.rateApprovalJson[index]['reasonofDisapproved'] = false
    }
  }
  remakrss(data: any, index: any) {
    this.rateApprovalJson[index]['reasonofDisapproved'] = data
  }
  checkAllrelvent(data: any) {
    debugger
    if (data === true) {
      this.sendingJsonForUpload = [...this.rateApprovalJson];
    } else {
      this.sendingJsonForUpload = [];
    }
    this.rateApprovalJson.forEach((element: any) => {
      element['checked'] = data
    });
    console.log(this.sendingJsonForUpload);
  }
  singleCheckRel(data: any, index: any,item:any) {
    if (data == true) {
      this.sendingJsonForUpload.push(item)
    } else {
      this.sendingJsonForUpload.splice(index, 1)
    }
    console.log(this.sendingJsonForUpload)

  }
  paresiJson(inputJson:any){
    return inputJson.map((item: { [x: string]: string; }, index: any) => {
      return {
        "rateid": item['rateid'],
        "isApproved": item['rateid']?true:false,
        "reasonofDisapproved": item['reasonofDisapproved']?item['reasonofDisapproved']:'',
        "approvedBy": this.userId,
        "approvedOn": "2023-11-08T08:51:49.896Z"
  
      }
    });
  }
}