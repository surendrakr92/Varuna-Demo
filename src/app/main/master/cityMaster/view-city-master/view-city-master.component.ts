import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-city-master',
  templateUrl: './view-city-master.component.html',
  styleUrls: ['./view-city-master.component.scss']
})
export class ViewCityMasterComponent implements OnInit {

  constructor(private activateroutes:ActivatedRoute,private shared_service:SharedService,
     private masterservices:CountryMasterService){}

  cityId:any=""
 cityDetailById:any
  ngOnInit(): void {
    this.activateroutes.params.subscribe((res)=>{
      this.cityId=res.id
    })
    this.masterservices.getCityListDetailsById(this.cityId).subscribe((res:any)=>{
      this.cityDetailById=res.data
      console.log(this.cityDetailById)
    })
  }

  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }
  
}
