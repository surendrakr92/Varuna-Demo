import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

import * as XLSX from "xlsx";
type AOA = any[][];
@Component({
  selector: 'app-rate-update-list',
  templateUrl: './rate-update-list.component.html',
  styleUrls: ['./rate-update-list.component.scss']
})
export class RateUpdateListComponent implements OnInit {
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
  xlsJsonUpload: any = []
  filterpatchedJson: any = {}
  xlsJsonUploadData: any = []
  contractRateJson: any = {
    contractRatelist: [{
      "laneId": null,
      "contractId": this.contractDetailsById,
      "ftlTripRate": null,
      "transitDays": null,
      "transTypeId": null,
      "matrixTypeId": null,
      "ftlRateTypeId": null,
      "startDate": null,
      "endDate": null,
      "loadingtermId": null,
      "unloadingtermId": null,
      "transitHours": 0,
      "reasonId": null,
      "noofVehicle": null,
      "tatfordelivery": 0,
      "holidaystatus": null,
      "committedPercentage": null,
      "pickupinyear": null,
      "primarySource": null,
      "discountinPer": null,
      "deliverytypeId": null,
      "otherAmount": null,
      "twopointlocId": null,
      "proposedlt": null,
      "proposedult": null,
      "isActive": true,
      "createdBy": this.cs.login_User_Code(),
      "createdOn": "2023-09-26T11:29:53.044Z",
      "updatedBy": 0,
      "updatedOn": "2023-09-26T11:29:53.044Z",
      "rateid": 0,
    }]
  };
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
    this.filterjson = JSON.parse(sessionStorage.getItem('filterSearch') || '{}')
    this.getCityList();
    this.getGeneralMasterDropDwon();
    this.formMaster = this.formbuilder.group({
      fromCity: ['', Validators.required],
      isActive: [true]
    });
    this.contractRateJson?.contractRatelist.forEach((element: { deliverytypeId: any; }) => {
      element.deliverytypeId = 521;//abhay requirement
    });
  }
  get f() {
    return this.formMaster.controls;
  }
  getCityList() {
    this.maserservice.getAllCityMasterList().subscribe((res: any) => {
      this.cityList = res.data;
      let json = this.cityList.filter((x: any) => x.cityId == this.filterjson.fromCityId)
      this.filterpatchedJson['fromCityId'] = json[0]?.cityName
      console.log(this.filterpatchedJson)
      let jsons = this.cityList.filter((x: any) => x.toCityId == this.filterjson.toCityId)
      this.filterpatchedJson['toCityId'] = json[0]?.cityName
      console.log(this.filterpatchedJson)
    });
    this.maserservice.getAllLaneMaster().subscribe((res: any) => {
      this.laneMasterList = res.data;
      this.filterpatchedJson['location'] = res.data.filter((x: { laneId: number; })=>x.laneId==1)[0]
      console.log(this.filterpatchedJson)
      this.dtTrigger.next(null);
    });
  }
  getGeneralMasterDropDwon() {
    this.maserservice.getGeneralMasterByCodeTyoeId(62).subscribe((res: any) => {
      this.loadTypeList = res.data;
    });
    this.maserservice.getGeneralMasterByCodeTyoeId(64).subscribe((res: any) => {
      this.rateLoadType = res.data;
    });
    this.maserservice.getGeneralMasterByCodeTyoeId(111).subscribe((res: any) => {
      this.tatBaseList = res.data;
    });
    this.maserservice.getGeneralMasterByCodeTyoeId(112).subscribe((res: any) => {
      this.holidayStatus = res.data;
    });
    this.maserservice.getGeneralMasterByCodeTyoeId(114).subscribe((res: any) => {
      this.loadingTerm = res.data;
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
      console.log(this.filterpatchedJson)
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
      console.log(this.filterpatchedJson)
    })
    console.log(this.matrixAllowed)
    this.custService.getcontractratebyfilters(this.filterjson).subscribe((result: any) => {
      if (result.data.length > 0) {
        this.contractRateJson.contractRatelist = result.data
      }else{
        this.contractRateJson.contractRatelist.forEach((x:any)=>{
          x.transTypeId=this.filterjson.transTypeId
          x.matrixTypeId=this.filterjson.matrixTypeId
          // x.transTypeI=this.filterjson.transTypeId
        })
      }
    }, err => {
      // if (err instanceof HttpErrorResponse) {
      //   if (err.status === 422) {
      //     debugger

      //     Object.keys(err.error.Errors).forEach((prop: any) => {
      //       const formControl = this.seachCrit.get(err.error.Errors[prop]?.PropertyName);
      //       //wrong key comes 
      //       if (formControl) {
      //         // activate the error message
      //         formControl.setErrors({
      //           serverError: err.error.Errors[prop]?.ErrorMessage
      //         });
      //       }
      //     });
      //   }
      this.toastrService.error(`${err.error.Message}`, `Error status:${err.status}`);
      // }
    })

  }
  modelopen(model: any) {
    this.cs.destryTableData();
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
  }
  data: AOA = [
    [
      "From Location",
      "To Location",
      "VehicleType",
      "Load Type",
      "Rate Type Load",
      "Rate",
      // "No.of Vehicle",
      "TAT",
      "TAT Base",
      "Holiday Status",
      "Rate Type",
      // "Transit Mode",
      "Loading Terms",
      "UnLoading Terms",
      "Reason Of Update",
      "Discount In Percentage",
      "Start Date",
      "End Date",
      "Primary Source",
      //  "Delivery Type",
           "SOB%",
      "Total Pickup in a Year"

    ],
  ];
  wopts: XLSX.WritingOptions = { bookType: "csv", type: "array" };
  fileName: string = "rateUpdate.csv";
  downloadSampleAgainstLane(): void {
    const dataWithHeaders = [...this.data];
    /* Join the header row with commas to create a CSV header line */
    const headerLine = dataWithHeaders[0].join(",");
      /* Create an array for CSV content including the header line */
    const csvContent = [headerLine];
      /* Append the rest of the data to the CSV content */
    for (let i = 1; i < dataWithHeaders.length; i++) {
      csvContent.push(dataWithHeaders[i].join(","));
    }
      /* Join the CSV lines with line breaks to create a valid CSV content */
    const csvData = csvContent.join("\n");
      /* Generate a Blob containing the CSV data */
    const blob = new Blob([csvData], { type: "text/csv" });
      /* Create a temporary URL for the Blob and trigger the download */
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = this.fileName;
    a.click();
      /* Clean up the temporary URL */
    window.URL.revokeObjectURL(url);
  }
  addRowForTables(data: any) {
    if (data == '' || data == 0) return;
    if (data < 60) {
      const newLength = parseInt(data) + (this.contractRateJson.contractRatelist.length);
      const newContractRatelist = Array.from({ length: newLength }, () => ({
        "laneId": null,
        "contractId": this.contractDetailsById,
        "ftlTripRate": null,
        "transitDays": null,
        "transTypeId": this.filterjson.transTypeId,
        "matrixTypeId": this.filterjson.matrixTypeId,
        "ftlRateTypeId": null,
        "startDate": null,
        "endDate": null,
        "loadingtermId": null,
        "unloadingtermId": null,
        "transitHours": 0,
        "reasonId": null,
        "noofVehicle": null,
        "tatfordelivery": 0,
        "holidaystatus": null,
        "committedPercentage": null,
        "pickupinyear": null,
        "primarySource": null,
        "discountinPer": null,
        "deliverytypeId": null,
        "otherAmount": null,
        "twopointlocId": null,
        "proposedlt": null,
        "proposedult": null,
        "isActive": true,
        "createdBy": this.userId,
        "createdOn": "2023-09-26T11:29:53.044Z",
        "updatedBy": this.userId,
        "updatedOn": "2023-09-26T11:29:53.044Z",
        "rateid": 0,
      }));

      this.contractRateJson.contractRatelist = [
        ...this.contractRateJson.contractRatelist,
        ...newContractRatelist.slice(this.contractRateJson.contractRatelist.length),
      ];
    }
  }
  updateLaneIdAll(ev: any, data: any) {
    debugger;
    if (data == 'laneId') this.contractRateJson?.contractRatelist.forEach((element: { laneId: any; }) => {
      element.laneId = ev;

    });
    else if (data == 'ftlTripRate') this.contractRateJson?.contractRatelist.forEach((element: { ftlTripRate: any; }) => {
      element.ftlTripRate = ev;
    });
    else if (data == 'noofVehicle') this.contractRateJson?.contractRatelist.forEach((element: { noofVehicle: any; }) => {
      element.noofVehicle = ev;
    });
    else if (data == 'tatbase') this.contractRateJson?.contractRatelist.forEach((element: { tatbase: any; }) => {
      element.tatbase = ev;
    });
    else if (data == 'pickupinyear') this.contractRateJson?.contractRatelist.forEach((element: { pickupinyear: any; }) => {
      element.pickupinyear = ev;
    });
    else if (data == 'holidaystatus') this.contractRateJson?.contractRatelist.forEach((element: { holidaystatus: any; }) => {
      element.holidaystatus = ev;
    });
    else if (data == 'transitHours') this.contractRateJson?.contractRatelist.forEach((element: { transitHours: any; }) => {
      element.transitHours = ev;
    });
    else if (data == 'transitHours') this.contractRateJson?.contractRatelist.forEach((element: { transitHours: any; }) => {
      element.transitHours = ev;
    });
    else if (data == 'loadingtermId') this.contractRateJson?.contractRatelist.forEach((element: { loadingtermId: any; }) => {
      element.loadingtermId = ev;
    });
    else if (data == 'proposedlt') this.contractRateJson?.contractRatelist.forEach((element: { proposedlt: any; }) => {
      element.proposedlt = ev;
    });
    else if (data == 'proposedult') this.contractRateJson?.contractRatelist.forEach((element: { proposedult: any; }) => {
      element.proposedult = ev;
    });
    else if (data == 'proposedult') this.contractRateJson?.contractRatelist.forEach((element: { proposedult: any; }) => {
      element.proposedult = ev;
    });
    else if (data == 'unloadingtermId') this.contractRateJson?.contractRatelist.forEach((element: { unloadingtermId: any; }) => {
      element.unloadingtermId = ev;
    });
    else if (data == 'reasonId') this.contractRateJson?.contractRatelist.forEach((element: { reasonId: any; }) => {
      element.reasonId = ev;
    });
    else if (data == 'discountinPer') this.contractRateJson?.contractRatelist.forEach((element: { discountinPer: any; }) => {
      element.discountinPer = ev;
    });
    else if (data == 'startDate') this.contractRateJson?.contractRatelist.forEach((element: { startDate: any; }) => {
      element.startDate = ev;
    });
    else if (data == 'endDate') this.contractRateJson?.contractRatelist.forEach((element: { endDate: any; }) => {
      element.endDate = ev;
    });
    else if (data == 'primarySource') this.contractRateJson?.contractRatelist.forEach((element: { primarySource: any; }) => {
      element.primarySource = ev;
    });
    else if (data == 'deliverytypeId') this.contractRateJson?.contractRatelist.forEach((element: { deliverytypeId: any; }) => {
      element.deliverytypeId = ev;
    });
    else if (data == 'otherAmount') this.contractRateJson?.contractRatelist.forEach((element: { otherAmount: any; }) => {
      element.otherAmount = ev;
    });
    else if (data == 'isActive') this.contractRateJson?.contractRatelist.forEach((element: { isActive: any; }) => {
      element.isActive = ev;
    });
    else if (data == 'tatfordelivery') this.contractRateJson?.contractRatelist.forEach((element: { tatfordelivery: any; }) => {
      element.tatfordelivery = ev;
    });
    else if (data == 'committedPercentage') this.contractRateJson?.contractRatelist.forEach((element: { committedPercentage: any; }) => {
      element.committedPercentage = ev;
    });
    else if (data == 'ftlRateTypeId') this.contractRateJson?.contractRatelist.forEach((element: { ftlRateTypeId: any; }) => {
      element.ftlRateTypeId = ev;
    });
    else if (data == 'twopointlocId') this.contractRateJson?.contractRatelist.forEach((element: { twopointlocId: any; }) => {
      element.twopointlocId = ev;
    });
    else if (data == 'tatforpickup') this.contractRateJson?.contractRatelist.forEach((element: { tatforpickup: any; }) => {
      element.tatforpickup = ev;
    });
    console.log(this.contractRateJson?.contractRatelist)
  }
  saveExit() {
    this.contractRateJson.contractRatelist.forEach((x: { contractId: any; }) => x.contractId = this.contractDetailsById);
    console.warn(this.contractRateJson);
    this.custService.createCRate(this.contractRateJson).subscribe((result) => {
      this.toastrService.success('succesfully saved !', 'Success-200 !');
      this.routes.navigate(['master/rate-update']);
      sessionStorage.setItem('contractIdBackUpForRate', this.filterjson?.custIdData)
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          debugger;
          Object.keys(err.error.Errors).forEach((prop: any) => {
            // const formControl = this.formCountryMaster.get(err.error.Errors[prop]?.PropertyName);
            // //wrong key comes 
            // if (formControl) {
            //   // activate the error message
            //   formControl.setErrors({
            //     serverError: err.error.Errors[prop]?.ErrorMessage
            //   });
            // }
          });
        }
        this.toastrService.error(err.error.Message, `Error status:${err.status}`);
      }
    });
  }
  getLanedetails(index: any, data: any) {
    const user = this.laneMasterList.filter((x: any) => x.laneId === +data)[0];
    this.contractRateJson.contractRatelist[index]['flocaton'] = user.fromlocName
    this.contractRateJson.contractRatelist[index]['tolocName'] = user.tolocName
    this.contractRateJson.contractRatelist[index]['loadability'] = user.loadability
    this.contractRateJson.contractRatelist[index]['ratetypeload'] = user.ratetypeload
  }
  singleInheritData(value: any, index: any, cond: any) {
    debugger
    if (cond === 'ftlTripRate') this.contractRateJson.contractRatelist[index]['ftlTripRate'] = value
    else if (cond === 'noofVehicle') this.contractRateJson.contractRatelist[index]['noofVehicle'] = value
    else if (cond === 'tatbase') this.contractRateJson.contractRatelist[index]['tatbase'] = value
    else if (cond === 'tatforpickup') this.contractRateJson.contractRatelist[index]['tatforpickup'] = value
    else if (cond === 'holidaystatus') this.contractRateJson.contractRatelist[index]['holidaystatus'] = value
    else if (cond === 'ftlRateTypeId') this.contractRateJson.contractRatelist[index]['ftlRateTypeId'] = value
    else if (cond === 'transitHours') this.contractRateJson.contractRatelist[index]['transitHours'] = value
    else if (cond === 'loadingtermId') this.contractRateJson.contractRatelist[index]['loadingtermId'] = value
    else if (cond === 'proposedlt') this.contractRateJson.contractRatelist[index]['proposedlt'] = value
    else if (cond === 'unloadingtermId') this.contractRateJson.contractRatelist[index]['unloadingtermId'] = value
    else if (cond === 'proposedult') this.contractRateJson.contractRatelist[index]['proposedult'] = value
    else if (cond === 'reasonId') this.contractRateJson.contractRatelist[index]['reasonId'] = value
    else if (cond === 'discountinPer') this.contractRateJson.contractRatelist[index]['discountinPer'] = value
    else if (cond === 'startDate') this.contractRateJson.contractRatelist[index]['startDate'] = value
    else if (cond === 'endDate') this.contractRateJson.contractRatelist[index]['endDate'] = value
    else if (cond === 'primarySource') this.contractRateJson.contractRatelist[index]['primarySource'] = value
    else if (cond === 'deliverytypeId') this.contractRateJson.contractRatelist[index]['deliverytypeId'] = value
    else if (cond === 'otherAmount') this.contractRateJson.contractRatelist[index]['otherAmount'] = value
    else if (cond === 'isActive') this.contractRateJson.contractRatelist[index]['isActive'] = value
    else if (cond === 'committedPercentage') this.contractRateJson.contractRatelist[index]['committedPercentage'] = value
    else if (cond === 'pickupinyear') this.contractRateJson.contractRatelist[index]['pickupinyear'] = value
    else if (cond === 'twopointlocId') this.contractRateJson.contractRatelist[index]['twopointlocId'] = value
  }
  async onFileChangeCsv(event: any) {
    debugger;
    const file = event.target.files[0];
    if (file) {
      await this.cs.csvToJsonForResponse(file); // Await the asynchronous method
      let json = this.cs.getModulemasterList();
      // console.warn('check+++' + JSON.stringify(json));
      this.xlsJsonUpload.push(json)
      this.submissionJson = { contractRateExcelDtl: json }
       console.warn('check+++===>' , { contractRateExcelDtl: this.parseJsonFormRate(this.submissionJson) });
      this.custService.rateExcelSubmission({ contractRateExcelDtl: this.parseJsonFormRate(this.submissionJson) }).subscribe((res: any) => {
        if (res.succeeded) {
          this.xlsJsonUploadData = res.data
        }
      })
    }
  }

  parseJsonFormRate(inputJson: any) {
    debugger
    return inputJson['contractRateExcelDtl'].map((item: { [x: string]: string; }, index: any) => {
      return {
        fromCity: item["From Location"],
        toCity: item["To Location"],
        fromCityId: 0,
        toCityId: 0,
        laneId: null,
        contractCode: 0,//
        ftlTripRate: item["Rate"]?item["Rate"]:0,
        transitDays: 0,//
        transType: this.filterpatchedJson?.transTypeId,//item["Transit Mode"],
        transTypeId: 0,
        matrixType: this.filterpatchedJson?.matrixTypeId ? this.filterpatchedJson?.matrixTypeId : '',//
        matrixTypeId: 0,
        ftlRateType: item["Rate Type"]?item["Rate Type"]:0,
        ftlRateTypeId: 0,
        startDate: item["Start Date"]?item["Start Date"]:'2023-10-19',
        endDate: item["End Date"]?item["End Date"]:'2023-10-19',
        loadingterm: item["Loading Terms"],
        loadingtermId: 0,
        unloadingterm: item["UnLoading Terms"],
        unloadingtermId: 0,
        reason: item["Reason Of Update"],
        reasonId: 0,
        tatbasedesc: item['TAT Base'],
        tatbase: item["TAT"],
        tatforpickup: item["TAT"]?item["TAT"]:0,//
        holidaystatusdesc: item["Holiday Status"],
        holidaystatus: 0,
        committedPercentage: item["SOB%"]?item["SOB%"]:0,
        pickupinyear: item["Total Pickup in a Year"]?item["Total Pickup in a Year"]:0,
        primarySourcedesc: item["Primary Source"],
        primarySource: 0,
        discountinPer: item["Discount In Percentage"]?item["Discount In Percentage"]:0,
        proposedlt: 0,//
        proposedult: 0,
        loadability: item["Load Type"],
        rateTypeLoad: item["Rate Type Load"],
        loadabilityId: 0,
        otherAmount: +(item['Other Amount']),
        rateTypeLoadId: 0,
        vehicletypeId: 0,
        vehicletype: item["VehicleType"],
        createdBy: this.cs.login_User_Code(),
        errorMessage: ""
      }
    });
  }
  submissionCsvData() {
    const hasErrorMessage = this.xlsJsonUploadData.every((item: { errorMessage: string | string[]; }) => item.errorMessage == "");
    if (!hasErrorMessage || this.xlsJsonUploadData.length == 0) {
      this.toastrService.error("Resolve Error Occured !", "Error-302 !");
      return
    }
    // this.xlsJsonUploadData?.forEach((element:any) => {
    //   element['rateid']=+(this.ClaausecontratId)
    // });
    this.contractRateJson.contractRatelist = this.xlsJsonUploadData
    this.modalService.closeModal()
  }
  revalidateJsonToCsv() {
    this.xlsJsonUploadData = []
    this.custService.rateExcelSubmission({ contractRateExcelDtl: this.parseJsonFormRate(this.submissionJson) }).subscribe((res: any) => {
      if (res.succeeded) {
        this.xlsJsonUploadData = res.data
      }
    }, err => {
      this.toastrService.error(`${err.error.Message}`, `Error status:${err.status}`);
    })
  }
  saveDataForBackUp() {
    sessionStorage.setItem('contractIdBackUpForRate', this.filterjson?.custIdData)
  }

}

