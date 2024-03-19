import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-pin-code',
  templateUrl: './view-pin-code.component.html',
  styleUrls: ['./view-pin-code.component.scss']
})
export class ViewPinCodeComponent implements OnInit {

  constructor(private masterservices:CountryMasterService,private shared_service:SharedService,
     private activateroutes:ActivatedRoute ){}
  pincodeId:any=""
  pinCodeById:any
ngOnInit(): void {
  
  this.activateroutes.params.subscribe((res)=>{
this.pincodeId= res.id

  })
  this.masterservices.getPincodeListDetailsById(this.pincodeId).subscribe((res:any)=>{
this.pinCodeById=res.data
console.log(this.pinCodeById)
  })

}
download_pdf_print() {
  let element_id="viewData_information"
 this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
 })
 }

}
