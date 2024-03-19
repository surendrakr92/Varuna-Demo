import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sub-category-master-view',
  templateUrl: './sub-category-master-view.component.html',
  styleUrls: ['./sub-category-master-view.component.scss']
})
export class SubCategoryMasterViewComponent implements OnInit {


  subCatId:any
  subcateDetailById:any
  constructor(private shared_service:SharedService, private activeroute:ActivatedRoute,private eventMasterService:EventMasterService,){}
  ngOnInit(): void {
    this.activeroute.params.subscribe((res:any)=>{
      this.subCatId= res.id
    })
    this.eventMasterService.getSubCategoryDetailsById(this.subCatId).subscribe((res:any)=>{
this.subcateDetailById= res.data
console.log(this.subcateDetailById)
    })

  }
  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }

}
