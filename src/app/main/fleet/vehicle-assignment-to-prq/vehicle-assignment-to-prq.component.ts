import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

@Component({
  selector: 'app-vehicle-assignment-to-prq',
  templateUrl: './vehicle-assignment-to-prq.component.html',
  styleUrls: ['./vehicle-assignment-to-prq.component.scss']
})
export class VehicleAssignmentToPRQComponent implements OnInit {

  submitted = false
  submitt = false
  formMaster!: FormGroup
  FormMaster2!: FormGroup
  branchMasterList: any
  showDataList: any
  vehicleList: any
  prqListByAssignVeh: any = []
  Change_Vehicle_Remarks: any
  currBrnchId: any
  userId: any
  datee:any=new Date().toISOString().slice(0, 10)
  tommarrow:any= new Date(new Date().getTime() + 48 * 60 * 60 * 1000).toISOString().slice(0, 10);
  constructor(private formbuilder: FormBuilder, private masterService: CountryMasterService,
    private indentServ: IndentServiceService,
    private modalService: ModalPopupService, private fb: FormBuilder,
    private tostrS: ToastrService,
    private cs: CommonServiceService
  ) { 
    this.userId=this.cs.login_UserId()
    this.currBrnchId=this.cs.login_UserCurrBranchId()
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      // processing:true,
    }
  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.formMaster = this.formbuilder.group({
      branchId: [+this.currBrnchId, Validators.required],
      date: ["", Validators.required],
      showDataList: ["All", Validators.required],
    })
    this.formMaster.controls['date'].setValue(this.datee)
    this.dropDownList()
    this.indentServ.gtVhByBranchId({
      "branchId": this.formMaster.controls['branchId'].value,
      "date": new Date().toISOString().slice(0, 10)
    }).subscribe((res: any) => {
      if (res.succeeded) {
        this.vehicleList = res.data
      }
    })
  }
  get f() {
    return this.formMaster.controls
  }
  get fs() {
    return this.FormMaster2.controls
  }
  dropDownList() {
    this.masterService.getAllBranchMasterList().subscribe((res: any) => {
      this.branchMasterList = res.data
    })
    this.masterService.getGeneralMasterByCodeTyoeId(148).subscribe((res: any) => {
      this.showDataList = res.data

    })
    // this.masterService.getAllVehicleMaster().subscribe((res: any) => {
    //   this.vehicleList = res.data
    // })
    this.masterService.getGeneralMasterByCodeTyoeId(149).subscribe((res: any) => {
      this.Change_Vehicle_Remarks = res.data
    })
  }

  onSubmit() {
    this.submitted = true
    if (this.formMaster.invalid) {
      return
    }
    $('#MyTable').DataTable().destroy();
    this.indentServ.getPrQListForAssignVh(this.formMaster.value).subscribe((res: any) => {
      if (res.succeeded) {
        this.prqListByAssignVeh = res.data
        console.log(this.prqListByAssignVeh)
        this.dtTrigger.next(null);      }
    }, err => {
      this.tostrS.error(err.error.Message)
    })
   
  }

  modelOpen(model: any) {
    debugger
    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.large
    )
  }
  setUpJson(data: any, index: any, cond: string) {
    debugger
    if(cond=='vehicleId') {
      this.prqListByAssignVeh[index]['vehicleNo'] = data?.vehicleNo?.split(':')[0]
      this.prqListByAssignVeh[index]['vehicleId'] = data?.vehicleDetailId
      return
    }
    else if (cond) this.prqListByAssignVeh[index][cond] = data
    if(data){
      this.prqListByAssignVeh[index]['hndl']=true
    }else{
      this.prqListByAssignVeh[index]['hndl']=false
    }
        console.log(this.prqListByAssignVeh)
  }
  onAssign(data: any, cond: any) {
    this.submitt = true
    let json: any = data
    json['action'] = cond == "assign" ? "A" : cond == "reassign" ? "RA" : "R";
    json['createdBy'] =this.userId
    debugger
    this.indentServ.Assignvehicletoprq(json).subscribe((res: any) => {
      if (res.succeeded) {
        this.tostrS.success(cond=='assign'?'Vehicle Assigned Succesfully':'Vehicle Removed Succesfully', 'Success-200 !');
      }
    }, err => {
      this.tostrS.error(err.error.Message)
    })
  }
}
