import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-state-master',
  templateUrl: './view-state-master.component.html',
  styleUrls: ['./view-state-master.component.scss']
})
export class ViewStateMasterComponent {
  constructor(private activateroutes:ActivatedRoute, private shared_service:SharedService,
    private masterservice:CountryMasterService){}
  stateId:any
  stateDetailsById:any
  ngOnInit(): void {
    this.activateroutes.params.subscribe((res)=>{
      this.stateId=res.id
    })
    this.masterservice.getAllStateListDetailsById(this.stateId).subscribe((res:any)=>{
      this.stateDetailsById=res.data
    })
  }
  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }
  
 
}
