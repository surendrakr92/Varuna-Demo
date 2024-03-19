import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-address-master',
  templateUrl: './view-address-master.component.html',
  styleUrls: ['./view-address-master.component.scss']
})
export class ViewAddressMasterComponent implements OnInit {
addressId:any
addressMasterDetailById:any
  constructor(private masterservice:CountryMasterService, private shared_service:SharedService, private activeroute:ActivatedRoute){}
  ngOnInit(): void {
    this.activeroute.params.subscribe((res)=>{
this.addressId= res.id
    })
    this.masterservice.getAddressMasterById(this.addressId).subscribe((res:any)=>{
this.addressMasterDetailById= res.data
    })

  }
  PrintRecord(){
    
  }
  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }
}
