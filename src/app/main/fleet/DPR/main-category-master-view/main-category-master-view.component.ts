import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';
import { OperationsService } from 'src/app/services/master-service/operations.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-main-category-master-view',
  templateUrl: './main-category-master-view.component.html',
  styleUrls: ['./main-category-master-view.component.scss']
})
export class MainCategoryMasterViewComponent implements OnInit {

  MainCatId:any
  mainCategoryDetailsById:any
  constructor(private shared_service:SharedService, private activeroute:ActivatedRoute,private eventMasterService:EventMasterService,){}
  ngOnInit(): void {
    this.activeroute.params.subscribe((res:any)=>{
      this.MainCatId= res.id
    })
    this.eventMasterService.getMainCategoryDetailsById(this.MainCatId).subscribe((res:any)=>{
this.mainCategoryDetailsById= res.data
console.log(this.mainCategoryDetailsById)
    })

  }
  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }

}
