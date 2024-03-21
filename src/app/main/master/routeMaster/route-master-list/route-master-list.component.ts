import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { routeMaster } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

import * as XLSX from 'xlsx'
declare var $: any
@Component({
  selector: 'app-route-master-list',
  templateUrl: './route-master-list.component.html',
  styleUrls: ['./route-master-list.component.scss']
})
export class RouteMasterListComponent implements OnInit {

  submitt=false
  formMaster2!:FormGroup
  UserId: any

  flag = 0
  valuchanges = false
  routeMasterList: any
  cityList: any
  submitted = false
  formMaster: any = FormGroup
  routeCategoryList: any
  routeMasterById: any = ""
  selectedRemakr: any = ""
  branchMasterList: any = []
  routeTypeCategoryList: any = []
  totalItems: number = 5; // Initialize total items
  fromSearch: any = ''
  tosearch:any=''
  itemsPerPage: number = 5;
  p: number = 1;
  activefilter:boolean=false
  constructor(private masterservice: CountryMasterService,private fb:FormBuilder, private Activateroute: ActivatedRoute,
    private modalService: ModalPopupService, private formbuider: FormBuilder
    , private routes: Router, private cs: CommonServiceService,//for id
    private toastrService: ToastrService) {
    this.UserId = this.cs.login_User_Code()//for id
  }
  countryList: any = []
  ngOnInit(): void {
    this.getAllRouteMasterList()
    this.getAllCityMaster()
    this.getGeneralMasterDropDown()
    this.getCOntrlBranchList()
    this.formV()
    this.formMaster.controls['routeEndDate'].disable()
    this.Activateroute.params.subscribe((res: any) => {
      let routemasterId = res.id
      if (routemasterId) {
        this.masterservice.getRoleMasterById(routemasterId).subscribe((res: any) => {
          this.routeMasterById = res.data
          this.formMaster.patchValue(res.data)
        })
      }
    })
this.topFrom()

  }
  formV(){
    this.formMaster = this.formbuider.group({
      fromCityId: ['', Validators.required],
      toCityId: ['', Validators.required],
     routeCategoryId: ['', Validators.required],
      routeCategoryTypeId: ['', Validators.required],
      routeKm: ['', Validators.required],
      routeStartDate: ['', Validators.required],//
      routeEndDate: [''],//changes acc to roshan sir
      contrlBranchId: ['', Validators.required],//
      transitHour: [0],
      expressHour: [0],
      routeCategoryRemarks: [""],
      supperExpressHour: [""],
      isTwoPointDieselAllow: [false],
      isMultiPointDieselAllow: [false],
      isEmptyAllow: [false],
      suggestion: [''],//
      isActive: [true],
      fromDate: [''],
      toDate: [''],
      wefDate: [''],
      routeId: [''],
      rutcd: [''],
    

    })
  }
  get f() {
    return this.formMaster.controls
  }
  topFrom(){
this.formMaster2= this.fb.group({

  fromcity:[""],
  tocity:[""],
})
  }
get fs(){
return this.formMaster2.controls
}

FilterSearch(){
  this.submitt=true
  if(this.formMaster2.invalid){
    return
  }
  if(this.formMaster2.controls['fromcity'].value==''&&this.formMaster2.controls['tocity'].value=='') {
    this.toastrService.warning('please select at least on field')
    return
  }
  this.fromSearch=this.formMaster2.controls['fromcity'].value==null?'':this.formMaster2.controls['fromcity'].value
  this.tosearch=this.formMaster2.controls['tocity'].value==null?'':this.formMaster2.controls['tocity'].value
  let data = {
    cityId: 0,
    pageNumber: 1, // Use this.p for page number
    pageSize: 1,
    fromcity: this.fromSearch,
    tocity: this.tosearch
  };
  this.masterservice.getAllRouteMaster(data).subscribe((res: any) => {
    this.routeMasterList = res.data;
    console.log(this.routeMasterList)
    this.totalItems = res.retrieved; // Assign the total count from API 
    this.activefilter=true
    this.itemsPerPage=res.retrieved
  });
}
resetFilter(){
  this.formMaster2.reset()
  this.submitt=false
  this.p=1
  this.itemsPerPage=5
  this.itemsPerPage=5
  this.fromSearch=''
  this.tosearch=''
  this.activefilter=false
  this.getAllRouteMasterList()
}

  getAllRouteMasterList() {
    let data = {
      cityId: 0,
      pageNumber: this.p, // Use this.p for page number
      pageSize: this.itemsPerPage,
      fromcity: this.fromSearch,
      tocity: this.tosearch
    };
    this.masterservice.getAllRouteMaster(data).subscribe((res: any) => {
      this.routeMasterList = res.data;
      this.totalItems = res.totalCount; // Assign the total count from API 
    });

  }
  getAllCityMaster() {
    this.masterservice.getAllCityMasterList().subscribe((res: any) => {
      this.cityList = res.data
      // console.log(this.cityList)
    })
  }

  getGeneralMasterDropDown() {
    this.masterservice.getGeneralMasterByCodeTyoeId(65).subscribe((res: any) => {
      this.routeCategoryList = res.data
    })
    this.masterservice.getGeneralMasterByCodeTyoeId(136).subscribe((res: any) => {
      this.routeTypeCategoryList = res.data
    })


  }



  getCOntrlBranchList() {
    this.masterservice.getAllBranchMasterList().subscribe((res: any) => {
      this.branchMasterList = res.data
    })
  }

  redirectionEdit(id: any) {
    this.routes.navigate(['master/pin-code/update-pincode/', id])
  }
  activeInactive(id: any) {
    var json = new routeMaster()
    json.routeId = id
    json.updatedBy = +(this.UserId)//for Id   
    this.masterservice.disableAndEnableRouterMaster(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.toastrService.success('succesfully changed status', 'Success-200 !');
        $('#MyTable').DataTable().destroy();
        this.getAllRouteMasterList()
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          this.toastrService.error(err.error.Message, 'Error !');
        }

      }
    })
  }
  downloadExcel() {
    let fileName = 'routeMaster.xLsx'
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.routeMasterList);
    Object.keys(ws).forEach(key => {
      if (ws[key].v === "Action") {
        delete ws[key];
      }
    });
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName);
  }

  modelopen(model: any) {
    debugger
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
  }
  editForm(model: any, prevId: any) {
    debugger
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    );
    this.valuchanges=false
    this.formV()
    this.masterservice.getRouteMasterDetailsById(prevId).subscribe((res: any) => {
      this.routeMasterById = res.data[0]
      if (this.routeMasterById?.routeCategoryTypeId == 278) this.routeMasterById['routeCategoryRemarks'] = "High Profit"
      else if (this.routeMasterById?.routeCategoryTypeId == 279) this.routeMasterById['routeCategoryRemarks'] = "General Profit"
      else if (this.routeMasterById?.routeCategoryTypeId == 611) this.routeMasterById['routeCategoryRemarks'] = "No profit"
      setTimeout(() => {
        if (this.routeMasterById) {
          debugger
          this.formMaster.patchValue(this.routeMasterById);
          this.formMaster.controls['fromDate'].setValue(this.routeMasterById?.fromDate?.slice(0, 10));
          this.formMaster.controls['toDate'].setValue(this.routeMasterById?.toDate?.slice(0, 10));
          this.formMaster.controls['routeEndDate'].setValue(this.routeMasterById?.routeEndDate?.slice(0, 10));
          this.formMaster.controls['routeStartDate'].setValue(this.routeMasterById?.routeStartDate?.slice(0, 10));
          this.formMaster.controls['wefDate'].setValue(this.routeMasterById?.wefDate?.slice(0, 10));

          // this.formMaster.patchValue(this.routeMasterById);
        }
        else this.modalService.closeModal()
      }, 100);
    })
  }
  submit() {
    debugger
    this.submitted = true
    if (this.formMaster.invalid) {
      return
    }
    let routemasterJson = new routeMaster()
    routemasterJson = this.formMaster.value
    if (this.routeMasterById.routeId == undefined) { routemasterJson.createdBy = +this.UserId }
    else { routemasterJson.updatedBy = +this.UserId; routemasterJson.routeId = this.routeMasterById.routeId }
    console.log(routemasterJson);
    if (this.routeMasterById == "") {
      this.masterservice.createRouteMaster(routemasterJson).subscribe((result) => {
        this.toastrService.success('succesfully Created !', 'Success-200 !');
        this.routes.navigate(['master/route-master-list']);
        this.modalService.closeModal()
        this.formMaster.reset()
        $('#MyTable').DataTable().destroy();
        this.getAllRouteMasterList()
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
          this.toastrService.error('some thing went wrong', 'Error !');
        }
      })
    } else {
      this.masterservice.updateRoutemaster(routemasterJson).subscribe((result) => {
        this.toastrService.success('succesfully Updated !', 'Success-200 !');
        this.routes.navigate(['master/route-master-list']);
        $('#MyTable').DataTable().destroy();
        this.getAllRouteMasterList()
        this.modalService.closeModal()
        this.formMaster.reset()

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
          this.toastrService.error(`${err.error.Message}`, `Staus Code-${err.status}`);

        }
      })
    }
  }
  routeChanges(ev: any) {
    debugger
    if (ev == 278) {
      this.selectedRemakr = "High Profit"
    }
    else if (ev == 279) {
      this.selectedRemakr = "General Profit"
    }
    else if (ev == 611) {
      this.selectedRemakr = "No Proft"
    }
  }
  pagination(ev: number) {

    this.p = ev
    // this.p++;
    this.getAllRouteMasterList();
  }
  correctPage(event: number) {
    this.p = event; // Update the current page number based on bounds correction
    this.getAllRouteMasterList(); // Retrieve data for the corrected page
  }
  pagePerData(e: any) {
    // console.log(e.target.value)
    this.itemsPerPage = +(e.target.value)
    this.getAllRouteMasterList();
  }
  // searchData(ev: any) {
  //   this.p = 0 // Use this.p for page number
  //   this.itemsPerPage = 0
  //   this.searchD = +ev
  //   this.getAllRouteMasterList()
  // }
  setupValidation(ev:any) {
    if(ev.target.value){
      this.valuchanges = true
      const valdd = this.formMaster.get('wefDate');
      valdd.setValidators([Validators.required]);
      valdd.updateValueAndValidity();
    }
  }
  filterrest(){
    debugger
    if((this.formMaster2.controls['fromcity'].value==null||
    this.formMaster2.controls['fromcity'].value=='')&&(this.formMaster2.controls['tocity'].value==null ||this.formMaster2.controls['tocity'].value=='')){
      this.resetFilter()
    }
  }
}

