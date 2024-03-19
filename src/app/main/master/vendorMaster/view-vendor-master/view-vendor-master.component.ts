import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-vendor-master',
  templateUrl: './view-vendor-master.component.html',
  styleUrls: ['./view-vendor-master.component.scss']
})
export class ViewVendorMasterComponent implements OnInit {
  vendorId:any
  viewVendorMasterById:any

constructor(private activates:ActivatedRoute, private masterservice:CountryMasterService,  private shared_service:SharedService,){}
  ngOnInit(): void {
    debugger
    this.activates.params.subscribe((res)=>{
    this.vendorId= res.id
    })
    this.masterservice.getVendorMasterById(this.vendorId).subscribe((res:any)=>{
      this.viewVendorMasterById=res.data[0]
    })
  }
  download_pdf_print(){
    let element_id="viewData_information"
    this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
    })
  }
}
