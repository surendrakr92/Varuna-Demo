import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { StationaryService } from 'src/app/services/master-service/stationary.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-item-master',
  templateUrl: './view-item-master.component.html',
  styleUrls: ['./view-item-master.component.scss']
})
export class ViewItemMasterComponent {
  constructor(private activateroutes:ActivatedRoute,private masterservice:StationaryService,private shared_service:SharedService){}
  itemId:any
  itemDetailsById:any
  ngOnInit(): void {
    this.activateroutes.params.subscribe((res)=>{
      this.itemId=res.id
    })
    this.masterservice.getAllItemListDetailsById(this.itemId).subscribe((res:any)=>{
      this.itemDetailsById=res.data
    })
  }
  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }
 
}
