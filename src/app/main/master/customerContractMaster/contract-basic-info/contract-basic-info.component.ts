import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-contract-basic-info',
  templateUrl: './contract-basic-info.component.html',
  styleUrls: ['./contract-basic-info.component.scss']
})
export class ContractBasicInfoComponent implements OnInit {
  submitted=false
  formMaster:any=FormGroup
  constructor(private masterservice:CountryMasterService, private formbuilder:FormBuilder, private routes:Router){}
ngOnInit(): void {
 this.formMaster = this.formbuilder.group({
  customerCode:['',Validators.required],
 }) 
  
}
get f(){
  return this.formMaster.controls
}
goToList(){
  this.routes.navigate(['/master/customer-contract-master/customer-contract-master-list'])
}
}

