import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { StationaryService } from 'src/app/services/master-service/stationary.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-pc-master',
  templateUrl: './view-pc-master.component.html',
  styleUrls: ['./view-pc-master.component.scss']
})
export class ViewPCMasterComponent {
  constructor(private activateroutes:ActivatedRoute,private masterservice:StationaryService,private shared_service:SharedService){}
  challanId:any
  challanDetailsById:any
  ngOnInit(): void {
    this.activateroutes.params.subscribe((res)=>{
      this.challanId=res.id
    })
    this.masterservice.getAllPurchaseListDetailsById(this.challanId).subscribe((res:any)=>{
      this.challanDetailsById=res.data
    })
  }

  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }

 
}
