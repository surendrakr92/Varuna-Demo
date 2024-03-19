import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-view-country-master',
  templateUrl: './view-country-master.component.html',
  styleUrls: ['./view-country-master.component.scss']
})
export class ViewCountryMasterComponent implements OnInit{
constructor(private activateroutes:ActivatedRoute,private masterservice:CountryMasterService,
  private shared_service:SharedService){}
countryId:any
countryDetailsById:any
@ViewChild('content') content: ElementRef | undefined;
ngOnInit(): void {
  this.activateroutes.params.subscribe((res)=>{
    this.countryId=res.id
  })
  this.masterservice.getAllCountryListDetailsById(this.countryId).subscribe((res:any)=>{
    this.countryDetailsById=res.data
  })
}
download_pdf_print() {
 let element_id="viewData_information"
this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
})
}
}
