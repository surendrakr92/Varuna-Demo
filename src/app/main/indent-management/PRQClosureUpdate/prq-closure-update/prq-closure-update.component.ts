import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cngr_cnse_Master } from 'src/app/models/master';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';

@Component({
  selector: 'app-prq-closure-update',
  templateUrl: './prq-closure-update.component.html',
  styleUrls: ['./prq-closure-update.component.scss']
})
export class PrqClosureUpdateComponent implements OnInit {
  formMaster!: FormGroup
  formMaster2!: FormGroup
  submitted = false
  cityList: any=''
  Cngr_Cnse_Master: any
  UserId: any
  Login_branchId: any
  closerUpdateList: any=''

  constructor(private formbuilder: FormBuilder, private fb:FormBuilder,
     private indentService: IndentServiceService, private masterService: CountryMasterService, private cs: CommonServiceService,) {
    this.UserId = this.cs.login_User_Code()//for id
    this.Login_branchId = this.cs.login_UserCurrBranchId()
  }

  ngOnInit(): void {
    this.formMaster = this.formbuilder.group({
      prqNo: ["", Validators.required],
      branchId: [1],

    })
    // this.formMaster.controls['branchId'].setValue(this.Login_branchId)
    this.getAllDataList()
  }



get fs(){
  return this.formMaster2.controls
}

  get f() {
    return this.formMaster.controls
  }
  PRQFilter() {
    this.submitted = true
    if (this.formMaster.invalid) {
      return
    }
    this.indentService.getAllPRqClosureUpdate(this.formMaster.value).subscribe((res: any) => {
      this.closerUpdateList = res.data
      console.log(this.closerUpdateList)
    })
  }

  getAllDataList() {
    // this.masterService.getAllCityMasterList().subscribe((res: any) => {
    //   this.cityList = res.data
    // })
    this.masterService.getAll_Cngr_Cnse_Master().subscribe((res: any) => {
      this.Cngr_Cnse_Master = res.data

    })
    this.indentService.getAllPRqClosure(this.formMaster.value).subscribe((res:any)=>{
this.cityList= res.data
console.log(this.cityList);
    })

  }


}
