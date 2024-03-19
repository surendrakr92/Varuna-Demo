import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-land-master',
  templateUrl: './view-land-master.component.html',
  styleUrls: ['./view-land-master.component.scss']
})
export class ViewLandMasterComponent implements OnInit {
laneMasterId:any
laneMasterDetailsById:any
  constructor(private masterservice:CountryMasterService, private shared_service:SharedService, private activeroute:ActivatedRoute){}
  ngOnInit(): void {
    
    this.activeroute.params.subscribe((res)=>{
this.laneMasterId=res.id
    })
this.masterservice.getLaneMasterDetailsById(this.laneMasterId).subscribe((res:any)=>{
this.laneMasterDetailsById= res.data
})
  }
  
  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }
}
