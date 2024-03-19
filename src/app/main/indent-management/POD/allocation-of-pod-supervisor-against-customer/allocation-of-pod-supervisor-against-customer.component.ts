import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { CustomerMasterServiceService } from 'src/app/services/master-service/customer-master-service.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';

@Component({
  selector: 'app-allocation-of-pod-supervisor-against-customer',
  templateUrl: './allocation-of-pod-supervisor-against-customer.component.html',
  styleUrls: ['./allocation-of-pod-supervisor-against-customer.component.scss']
})
export class AllocationOfPODSupervisorAgainstCustomerComponent implements OnInit {
  UserId: any
  userList: any
  customerList: any
  branchList: any
  responceData:any=[]
  PodAllJSOn: any = {
    "allocationlist": [
      {
        "allocationId": 0,
        "userId": this.cs.login_UserId(),
        "custId": 0,
        "branchId": 0,
        "createdBy": this.cs.login_UserId(),
        "createdOn": "2024-02-15T11:57:51.534Z"
      }
    ]
  }
  constructor(private customerMaster: CustomerMasterServiceService,
    private indntServ: IndentServiceService,
    private toastrService: ToastrService,
    private masterService: CountryMasterService, private cs: CommonServiceService,) {

    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
    this.UserId = this.cs.login_User_Code()//for id
  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.downDownList()
  }

  addRow() {
    this.PodAllJSOn.allocationlist.push({ ...this.PodAllJSOn.allocationlist[0] })
    console.log(this.PodAllJSOn)
  }

  Onsubmit() {
    this.indntServ.AllocationCMdCust(this.PodAllJSOn).subscribe((result: any) => {
      if (result.succeeded) {
        this.toastrService.success('succesfully Saved !', 'Success-200 !');
        this.responceData=result.data
        this.PodAllJSOn = {
          "allocationlist": [
            { 
              "allocationId": 0,
              "userId": this.cs.login_UserId(),
              "custId": 0,
              "branchId": 0,
              "createdBy": this.cs.login_UserId(),
              "createdOn": "2024-02-15T11:57:51.534Z"
            }
          ]
        }
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
        }
        this.toastrService.error(`${err.error.Message}`, `Staus Code-${err.status}`);
      }
    })

  }

  downDownList() {
    this.masterService.getAllUserMasterList().subscribe((res: any) => {
      this.userList = res.data
    })
    this.customerMaster.getAllCustomerMaster().subscribe((res: any) => {
      this.customerList = res.data

    })
    this.masterService.getAllBranchMasterList().subscribe((res: any) => {
      this.branchList = res.data
      console.log(this.branchList)
    })

  }
  setupJson(data: any, index: any, cond: string) {
    this.PodAllJSOn.allocationlist[index][cond] = data
  }
}
