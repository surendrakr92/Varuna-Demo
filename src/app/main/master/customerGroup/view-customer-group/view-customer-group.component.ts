import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-customer-group',
  templateUrl: './view-customer-group.component.html',
  styleUrls: ['./view-customer-group.component.scss']
})
export class ViewCustomerGroupComponent implements OnInit {

  constructor(private activateroutes:ActivatedRoute,private shared_service:SharedService, private masterservice:CountryMasterService){}
 groupId:any
 customerGroupDetailsById:any
  ngOnInit(): void {
    this.activateroutes.params.subscribe((res)=>{
      this.groupId=res.id
    })
    this.masterservice.getCustomerMasterById(this.groupId).subscribe((res:any)=>{
      this.customerGroupDetailsById=res.data
    })
  }
  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }
  }
  