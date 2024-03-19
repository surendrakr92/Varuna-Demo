import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-financial-year',
  templateUrl: './view-financial-year.component.html',
  styleUrls: ['./view-financial-year.component.scss']
})
export class ViewFinancialYearComponent implements OnInit {

  constructor(private activeroute:ActivatedRoute,private shared_service:SharedService, private masterservices:CountryMasterService){}
  finYearId:any
 finYearDetailsById:any
  ngOnInit(): void {
    
this.activeroute.params.subscribe((res)=>{
this.finYearId= res.id

})
this.masterservices.getFinacialYearById(this.finYearId).subscribe((res:any)=>{
  this.finYearDetailsById=res.data
})
  }

  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }
}
