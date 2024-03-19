import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-elr-dashboard',
  templateUrl: './elr-dashboard.component.html',
  styleUrls: ['./elr-dashboard.component.scss']
})
export class ELRDashboardComponent implements OnInit {
  submitted= false
  formMaster!:FormGroup


  controlShow=false
  showSection1 = false;
  showSection2 = false;
  showSection3 = false;
  showSection4 = false;
  activeSection: string | null = null;
  constructor(private formbuilder:FormBuilder, private countryService:CountryMasterService){}
  ngOnInit(): void {
    this.formMaster= this.formbuilder.group({
      customerId:['']
    })
   
  }
  get f(){
    return this.formMaster.controls
  }
ewaybillList=[
{id:'Pending', type:'Pending'},
{id:'Completed', type:'Completed '},
{id:'Both', type:'Both'},

]

searchFilter(){

}


keyup(event:any){

if(event=='Pending'){
this.controlShow= true
}else if(event=='Completed'){
  this.controlShow= true
}else if(event=='Both'){
  this.controlShow= true
}else{
  this.controlShow= true
}

}



toggleContent(section: string): void {
  this.activeSection = this.activeSection === section ? null : section;

  if (section === 'section1') {
    this.showSection1 = !this.showSection1;
    this.showSection2 = false;
    this.showSection3 = false;
    this.showSection4 = false;
  
  } else if (section === 'section2') {
    this.showSection2 = !this.showSection2;
    this.showSection1 = false;
    this.showSection3 = false;
    this.showSection4 = false;
  }else if (section === 'section3') {
    this.showSection3 = !this.showSection3;
    this.showSection1 = false;
    this.showSection2 = false;
    this.showSection4 = false;
  }
  else if (section === 'section4') {
    this.showSection4 = !this.showSection4;
    this.showSection1 = false;
    this.showSection2 = false;
    this.showSection3 = false;
  }
}



}


