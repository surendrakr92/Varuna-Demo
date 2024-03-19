import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-zone',
  templateUrl: './view-zone.component.html',
  styleUrls: ['./view-zone.component.scss']
})
export class ViewZoneComponent implements OnInit {

  

  constructor(private masterservices:CountryMasterService, private shared_service:SharedService,
    private activateroutes:ActivatedRoute){}
  zoneId:any=""
  zoneDetailsById:any
  ngOnInit(): void {
    this.activateroutes.params.subscribe((res)=>{
      this.zoneId=res.id
    })
    this.masterservices.getZoneDetailsById(this.zoneId).subscribe((res:any)=>{
      this.zoneDetailsById=res.data
      console.log(this.zoneDetailsById)
    })
  }

  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }

  }