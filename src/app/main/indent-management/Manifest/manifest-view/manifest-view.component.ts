import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { Subject, of } from 'rxjs';
import { popupclass } from 'src/app/models/Class/enum';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';
import { ModalPopupService } from 'src/app/services/modalServices/modal-popup.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-manifest-view',
  templateUrl: './manifest-view.component.html',
  styleUrls: ['./manifest-view.component.scss']
})
export class ManifestViewComponent implements OnInit {

  UserId: any
  prqList: any = []
  menfistDList: any = []
  constructor(
    private routes: ActivatedRoute,
    private cs: CommonServiceService,//for id
    private modalService: ModalPopupService,
    private shared_service: SharedService,
    private indntServ: IndentServiceService,
    private toastrService:ToastrService

  ) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5,10, 20, 50, 100,200],
      // processing:true,
    }
    this.UserId = this.cs.login_User_Code()//for id
  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
this.routes.queryParams.subscribe((res:any)=>{

  this.getMenfDt(res.tc)
})
  }
  getMenfDt(data:string){
    this.indntServ.getmanifestdetailByTc(data).subscribe((res:any) => {
      if(res.succeeded){
       this.menfistDList=res.data
       this.dtTrigger.next(null)
      }
      },err=>{
        this.toastrService.error(err.error.Message)
      })
  }
  modelOpen(model: any) {
    debugger

    this.modalService.modalOpenSuccess(
      model,
      popupclass.info,
      true,
      false,
      false,
      popupclass.extralarge

    )
  }
  download_pdf_print(data:any) {
    debugger
    let element_id = "viewData_information"
    // this.shared_service.print_file_to_pdf(element_id).subscribe((rs) => {
    // })
    const doc = new jsPDF("p", "pt", "a4");
    const source = (<HTMLInputElement>document.getElementById(data.id));
    html2canvas(source).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 595.28; // A4 width in pixels
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save('ManifestByTCDetails.pdf');
    });
    }
}
