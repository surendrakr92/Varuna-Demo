import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-stock-update-list',
  templateUrl: './stock-update-list.component.html',
  styleUrls: ['./stock-update-list.component.scss']
})
export class StockUpdateListComponent implements OnInit {
  UserId: any
  formMaster!: FormGroup
  arrivalConditionList: any
  submitted = false
  delyProcesslist: any
  delayReasonIdList: any
  usermasterlist: any

  constructor(private cs: CommonServiceService, private formbuilder: FormBuilder, private masterService: CountryMasterService,) {
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
    this.formMaster = this.formbuilder.group({
      tcNo: ["", Validators.required],
      BranchId: [""],
      docketDate: [""],
      committedDlyDate: [""],
      pkgsNo: ["", Validators.required],
      Actualwt: ["", Validators.required],
      tentativeClaimAmt: ["", Validators.required],
      remark: [""],
      arrivalCondition: ["",Validators.required],
      WarehouseID: [""],
      delyProcess: ["", Validators.required],
      deliveryDate: ["", Validators.required],
      delayReasonId: ["",Validators.required],
      delayPerson: ["", Validators.required],
    })
    this.dropDownList()
  }


  get f() {
    return this.formMaster.controls
  }
  goTOStockUpdate(){
    this.submitted= true
    if(this.formMaster.invalid){
      return
    }
  }

  WarehouseList=[
    {id:1,type:'A'},
    {id:2,type:'B'},
    {id:3,type:'C'},
    {id:4,type:'D'},
  ] 


  dropDownList() {
    this.masterService.getGeneralMasterByCodeTyoeId(156).subscribe((res: any) => {
      this.arrivalConditionList = res.data
    })
    this.masterService.getGeneralMasterByCodeTyoeId(157).subscribe((res: any) => {
      this.delyProcesslist = res.data
    })
    this.masterService.getGeneralMasterByCodeTyoeId(158).subscribe((res: any) => {
      this.delayReasonIdList = res.data
    })
    this.masterService.getAllUserMasterList().subscribe((res: any) => {
      this.usermasterlist = res.data
      console.log(this.usermasterlist)
    })
  }
  filterOne(data:any){
console.log(data)
  }
}
