import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-eway-bill-correction',
  templateUrl: './eway-bill-correction.component.html',
  styleUrls: ['./eway-bill-correction.component.scss']
})
export class EwayBillCorrectionComponent implements OnInit{
  submitted= false
  formMaster!:FormGroup
  oprationList:any
  selfil:any
  ShowControl=false
  constructor(private formbuider:FormBuilder, private masterService:CountryMasterService,){}
  ngOnInit(): void {
    this.formMaster= this.formbuider.group({
      addressId:[''],
      Operation:[''],
    })
    this.dropDownList()
  }

  get f(){
    return this.formMaster.controls
  }
  onSubmit(){
    this.submitted= true
    if(this.formMaster.invalid){
      return
    }
  }

  dropDownList(){
this.masterService.getGeneralMasterByCodeTyoeId(153).subscribe((res:any)=>{
this.oprationList= res.data

})
  }

  selectFiler(event:any){
    this.selfil= event.codeDesc
    if(this.selfil=='Update Address Id' ||this.selfil=='Update LR using Ewbno'|| this.selfil=='Non Static Target Method' ||this.selfil=='LR delete when wrong data' ){
      this.ShowControl= true
    }else{
      this.ShowControl= false
    }


  }

}
