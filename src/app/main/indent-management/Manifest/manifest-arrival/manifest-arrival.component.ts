import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { popupclass } from 'src/app/models/Class/enum';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';

@Component({
  selector: 'app-manifest-arrival',
  templateUrl: './manifest-arrival.component.html',
  styleUrls: ['./manifest-arrival.component.scss']
})
export class ManifestArrivalComponent implements OnInit {
  submitt=false
  submitted=false
  formMaster!:FormGroup
  formMaster2!:FormGroup
  ShowDaterange = false;
  lateArrivelList:any
  userMasterList:any=''
  constructor(private fb:FormBuilder, private formbuilder:FormBuilder,
    private modalService:ModalPopupService,private masterService:CountryMasterService,){}
  ngOnInit(): void {
    this.formMaster= this.fb.group({
      // prqNo:[""],
      rangeDate:["", Validators.required],
      fromDate:[""],
      toDate:[""],
      thcNo:[""],
      presentDate: new FormControl(new Date().toISOString().substring(0, 10)),
    })
    this.APIbinding()
    this.formMaster2nd()
  }


  get f(){
    return this.formMaster.controls
  }

  ShowFilter(){
    this.submitt= true
    if(this.formMaster.invalid){
      return
    }
  }


dateRangeList=[
  {id:1, type:'Select Date range'},
  {id:2, type:'Last week (Including today)'},
  {id:3, type:'Today'},
  {id:4, type:'THC till date'},
 
]

formMaster2nd(){
this.formMaster2= this.formbuilder.group({
  tcNo:["",Validators.required],
  sealNoIn:["",Validators.required],
  thcBranchId:["",Validators.required],
  eventDate:["",Validators.required],
  userId:["",Validators.required],
  remark:["",Validators.required],
  lateArrivalReason:["",Validators.required],
})
}
get fs(){
  return this.formMaster2.controls
}

OnSubmit(){
  this.submitted= true
  if(this.formMaster2.invalid){
    return
  }
  
}

selectionDate(event: any) {

  this.formMaster.controls["fromDate"].setValue("");
  this.formMaster.controls["toDate"].setValue("");
  if (event == 3) {
    this.ShowDaterange = true;
    this.formMaster.controls["fromDate"].setValue(
      this.formMaster.controls.presentDate.value
    );
    this.formMaster.controls["toDate"].setValue(
      this.formMaster.controls.presentDate.value
    );
  } else if (event == 2) {
    this.ShowDaterange = true;
    this.formMaster.controls["toDate"].setValue(
      this.formMaster.controls.presentDate.value
    );
    this.formMaster.controls["fromDate"].setValue(
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .substring(0, 10)
    );
  } else if (event == 4) {
    this.ShowDaterange = true;
    this.formMaster.controls["fromDate"].setValue("1990-12-12");
    this.formMaster.controls["toDate"].setValue(
      this.formMaster.controls.presentDate.value
    );
  } else {
    this.ShowDaterange = true;
    this.formMaster.controls["fromDate"].setValue("");
    this.formMaster.controls["toDate"].setValue("");
    this.formMaster.controls["fromDate"].enable();
    this.formMaster.controls["toDate"].enable();
  }
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

APIbinding(){
this.masterService.getGeneralMasterByCodeTyoeId(167).subscribe((res:any)=>{
this.lateArrivelList=res.data
})
this.masterService.getAllUserMasterList().subscribe((res:any)=>{
this.userMasterList= res.data
console.log(this.userMasterList);
})
}
}
