import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-manage',
  templateUrl: './view-manage.component.html',
  styleUrls: ['./view-manage.component.scss']
})
export class ViewManageComponent implements OnInit {
  manageId:any=""
  manageDestailById:any=""
  uploadSOP:any=""
  constructor(private shared_service:SharedService,private countryMaster:CountryMasterService,private activeRoute:ActivatedRoute,){}
  ngOnInit(): void {
    this.activeRoute.params.subscribe((res:any)=>{
     this.manageId = res.id
     console.log(this.manageId)
    })
    this.countryMaster.getUploadSopbyid(this.manageId).subscribe((res:any)=>{
this.manageDestailById=res.data

    })
  }
  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }
  
}
