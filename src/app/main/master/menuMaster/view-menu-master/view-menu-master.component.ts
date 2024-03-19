import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-menu-master',
  templateUrl: './view-menu-master.component.html',
  styleUrls: ['./view-menu-master.component.scss']
})
export class ViewMenuMasterComponent {

  constructor(private activateroutes:ActivatedRoute,  private shared_service:SharedService, private masterservice:CountryMasterService){}
  webPageId:any
 menuDetailsById:any
  ngOnInit(): void {
    this.activateroutes.params.subscribe((res)=>{
      this.webPageId=res.id
    })
    this.masterservice.getMenuMasterDetailsById(this.webPageId).subscribe((res:any)=>{
      this.menuDetailsById=res.data
    })
  }
  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }
  }
