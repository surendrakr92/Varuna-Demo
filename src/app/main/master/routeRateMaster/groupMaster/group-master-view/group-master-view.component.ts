import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-group-master-view',
  templateUrl: './group-master-view.component.html',
  styleUrls: ['./group-master-view.component.scss']
})
export class GroupMasterViewComponent {
  constructor(private activateroutes:ActivatedRoute, private shared_service:SharedService,
    private masterservice:CountryMasterService){}
  stateId:any
 groupMasterDetailsById:any
  ngOnInit(): void {
    this.activateroutes.params.subscribe((res)=>{
      this.stateId=res.id
    })
    this.masterservice.getGroupMasterbyid(this.stateId).subscribe((res:any)=>{
      this.groupMasterDetailsById=res.data
      console.log(this.groupMasterDetailsById)
    })
  }
  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }
  
 
}
