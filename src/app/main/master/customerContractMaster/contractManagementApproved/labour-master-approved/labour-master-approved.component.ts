import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';
type AOA = any[][];
import * as XLSX from "xlsx";
@Component({
  selector: 'app-labour-master-approved',
  templateUrl: './labour-master-approved.component.html',
  styleUrls: ['./labour-master-approved.component.scss']
})
export class LabourMasterApprovedComponent implements OnInit {
  formMaster!: FormGroup;
  submitted = false;
  submittedNew = false;
  payBasisList: any;
  customerMasterList: any;
  Show: boolean = false;
  labourDetailsByCustId: any = []
  newShow = false;
  reasonUpdateList: any;
  ftlTypeList: any;
  cityList: any;
  customerlist: any;
  labourPayBasis: any;
  typeList: any;
  addressMasterList: any;
  laneList: any;
  TypeList: any;
  userId: any = ''
  custLaneDet: any = ''
  typeGeneralId: any = 0
  popLabourListD: any = []
  setupJson:any=[]
  submissionJson: any
  xlsJsonUploadData: any
  submisionJson: any
  checkJsonCOnd: any = undefined
  indexForEdit:any=null

  constructor(
    private formbuilder: FormBuilder,
    private route: Router,
    private customerMaster: CustomerMasterServiceService,
    private toastrService: ToastrService,
    private cs: CommonServiceService,
    private modalService:ModalPopupService,
  

  ) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    };
    this.userId = this.cs.login_User_Code()
  }
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.formMaster = this.formbuilder.group({
      custId: ["", Validators.required],
      approvedStatus:[""],
      activeType: [0, Validators.required],
    });
 
    this.getCustomerMasterList();

  }
  get f() {
    return this.formMaster.controls;
  }
  // get fs() {
  //   return this.formMaster2.controls;
  // }



 

  lanType = [
    { id: 2, type: "All Lanes" },
    { id: 0, type: "Expiry Lanes" },
    { id: 1, type: "Valid Lanes" },
  ];
  rateForList = [
    { id: 1, type: "Loading" },
    { id: 2, type: "Unloading" },
    { id: 3, type: "Dalla" },
    { id: 4, type: "Others" },
  ];

  approvedStatus=[
    {id:1, type:'Approve '},
    {id:2, type:'Dis-approve'},
  ]

  showExistingTables() {
    this.submitted = true;
    if (this.formMaster.invalid) return
    let json = {
      "custId": this.formMaster.controls['custId'].value,
      "activeType": this.formMaster.controls['activeType'].value ?? 0
    }
    this.customerMaster.filterByCustIdLab(json).subscribe((res: any) => {
      console.log("Customer Master", res);
      if (res) {
        this.labourDetailsByCustId = res.data
        $("#MyTable").DataTable().destroy();
        this.dtTrigger.next(null);
      }
    }, (err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          Object.keys(err.error.Errors).forEach((prop: any) => {
            const formControl = this.formMaster.get(err.error.Errors[prop]?.PropertyName);
            if (formControl) {
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


  getCustomerMasterList() {
    this.customerMaster.getAllCustomerMaster().subscribe((res: any) => {
      this.customerMasterList = res.data;
    });
  }
  modelOpen(model: any,item:any) {
    debugger
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    )
    this.customerMaster.getLabourChById(item.laneId).subscribe((res: any) => {
      if (res.succeeded) {
        this.popLabourListD = res.data
        console.log(this.popLabourListD)
      }
    })
}
jsonSubmission(){
      let json={
      "laboureRateApprovallist":this.paresiJson(this.setupJson)
    }
    this.customerMaster.labourrateApproval(json).subscribe((result) => {
      this.toastrService.success('succesfully saved !', 'Success-200 !');
      this.showExistingTables()
      // sessionStorage.setItem('contractIdBackUpForRateApproval', this.filterjson?.custIdData)
      this.setupJson=[]
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
issueSUbmission(data:any,index:any){
  this.labourDetailsByCustId[index]['isApproved'] = data==1?true:false
}
paresiJson(inputJson:any){
  return inputJson.map((item: { [x: string]: string; }, index: any) => {
    return {
      "isApproved": item['isApproved'],
      "labourRateId": 0,
      "approvedBy": this.userId,
      "approvedOn": "2023-11-11T05:50:56.428Z",
      "laneId":item['laneId']
    }
  });
}
// singleCheckRel(data: any, index: any,item:any) {
//   if (data == true) {
//     this.setupJson.push(item)
//   } else {
//     this.setupJson.splice(index, 1)
//   }
//   console.log(this.setupJson)

// }
// checkAllrelvent(data: any) {
//   debugger
//   if (data === true) {
//     this.setupJson = this.labourDetailsByCustId;
//   } else {
//     this.setupJson = [];
//   }
//   this.labourDetailsByCustId.forEach((element: any) => {
//     element['checked'] = data
//   });
//   this.setupJson.forEach((element: any) => {
//     element['checked'] = data
//   });
//   console.log(this.setupJson);
// }
checkAllrelvent(data: any) {
  if (data === true) {
    // Create a copy of the original data
    this.setupJson = [...this.labourDetailsByCustId];
  } else {
    this.setupJson = [];
  }

  this.labourDetailsByCustId.forEach((element: any) => {
    element['checked'] = data;
  });
  console.log(this.setupJson);
}

singleCheckRel(data: any, index: any, item: any) {
  const isChecked = data;

  if (isChecked) {
    this.setupJson.push(item);
  } else {
    // Remove the item from the setupJson array
    const itemIndex = this.setupJson.findIndex((el: any) => el.laneId === item.laneId);
    if (itemIndex !== -1) {
      this.setupJson.splice(itemIndex, 1);
    }
  }
  console.log(this.setupJson);
}
}
