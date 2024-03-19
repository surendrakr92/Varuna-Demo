import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-division-master',
  templateUrl: './view-division-master.component.html',
  styleUrls: ['./view-division-master.component.scss']
})
export class ViewDivisionMasterComponent implements OnInit {

constructor(private divisionservices:CountryMasterService,private shared_service:SharedService, private activateroutes:ActivatedRoute){}
divisionId:any=""
divisionDetailsById:any
ngOnInit(): void {
  this.activateroutes.params.subscribe((res)=>{
    this.divisionId=res.id
  })
  this.divisionservices.getDivisionDetailsById(this.divisionId).subscribe((res:any)=>{
    this.divisionDetailsById=res.data
  })
}
download_pdf_print() {
  let element_id="viewData_information"
 this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
 })
 }
}
