import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-route-master',
  templateUrl: './view-route-master.component.html',
  styleUrls: ['./view-route-master.component.scss']
})
export class ViewRouteMasterComponent implements OnInit {
routeMasterId:any
routeMasterDetailById:any
  constructor(private masterservice:CountryMasterService, private shared_service:SharedService, private activeroute:ActivatedRoute){}
  ngOnInit(): void {
    this.activeroute.params.subscribe((res)=>{
      this.routeMasterId=res.id
    })

    
    this.masterservice.getRouteMasterDetailsById(this.routeMasterId).subscribe((res:any)=>{
      this.routeMasterDetailById= res.data[0]
      console.log(this.routeMasterDetailById)
    })

  }
  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }
}
