import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-sub-city-master',
  templateUrl: './view-sub-city-master.component.html',
  styleUrls: ['./view-sub-city-master.component.scss']
})
export class ViewSubCityMasterComponent implements OnInit {

  subCityMasterById:any
  subCityMasterDetailById:any

  constructor(private masterservice:CountryMasterService,private activeroute:ActivatedRoute,
    private shared_service:SharedService){}
  ngOnInit(): void {
    
    this.activeroute.params.subscribe((res)=>{
      this.subCityMasterById=res.id
    })
    this.masterservice.getSubCityMasterListDetailsById(this.subCityMasterById).subscribe((res:any)=>{
      this.subCityMasterDetailById=res.data 
    })
  }
  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }
}
