import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-pickup-request-view',
  templateUrl: './pickup-request-view.component.html',
  styleUrls: ['./pickup-request-view.component.scss']
})
export class PickupRequestViewComponent implements OnInit {

  constructor( private shared_service:SharedService,private indentServ:IndentServiceService,
    private modalService:ModalPopupService,
    private router:ActivatedRoute){}
    prqDetails:any
  ngOnInit(): void {
    this.modalService.closeModal()
    this.router.params.subscribe((res) => {

      let prqReqId = res.data
      if (prqReqId) {
        this.indentServ.getgetprqbyid(prqReqId).subscribe((res: any) => {
         this.prqDetails=res.data[0]
        })
      }
   
    })
  }
  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }
}
