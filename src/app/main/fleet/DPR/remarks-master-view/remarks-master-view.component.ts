import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-remarks-master-view',
  templateUrl: './remarks-master-view.component.html',
  styleUrls: ['./remarks-master-view.component.scss']
})
export class RemarksMasterViewComponent implements OnInit {

  remarksID:any
  remarkDetailById:any
  constructor(private shared_service:SharedService, private activeroute:ActivatedRoute,private eventMasterService:EventMasterService,){}
  ngOnInit(): void {
    this.activeroute.params.subscribe((res:any)=>{
      this.remarksID= res.id
    })
    this.eventMasterService.getRemarkDetailsById(this.remarksID).subscribe((res:any)=>{
this.remarkDetailById= res.data
console.log(this.remarkDetailById)
    })

  }
  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }

}
