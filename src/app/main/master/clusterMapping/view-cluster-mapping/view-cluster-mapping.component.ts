import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-cluster-mapping',
  templateUrl: './view-cluster-mapping.component.html',
  styleUrls: ['./view-cluster-mapping.component.scss']
})
export class ViewClusterMappingComponent {
  constructor(private activateroutes:ActivatedRoute,private shared_service:SharedService, private masterservices:CountryMasterService){}

  clusterMappingId:any=""
 clustermappingById:any
  ngOnInit(): void {
    this.activateroutes.params.subscribe((res)=>{
      this.clusterMappingId=res.id
    })
    this.masterservices.getclusterMappingById(this.clusterMappingId).subscribe((res:any)=>{
      this.clustermappingById=res.data
      console.log(this.clustermappingById)
    })
  }
  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }
}