import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-company-master',
  templateUrl: './view-company-master.component.html',
  styleUrls: ['./view-company-master.component.scss']
})
export class ViewCompanyMasterComponent implements OnInit {

  constructor(private activateroutes:ActivatedRoute,private masterservices:CountryMasterService,
    private shared_service:SharedService){}
  companyId:any=""
  companyDetailById:any
  ngOnInit(): void {
    this.activateroutes.params.subscribe((res)=>{
      this.companyId=res.id
    })
    this.masterservices.getCompanyDetailsById(this.companyId).subscribe((res:any)=>{
      this.companyDetailById=res.data
    })
  }
  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }
}
