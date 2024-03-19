import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-cluster-master',
  templateUrl: './view-cluster-master.component.html',
  styleUrls: ['./view-cluster-master.component.scss']
})
export class ViewClusterMasterComponent {
  clusterId:any=""
  clusterMasterDetailsById:any
  constructor(private masterservices:CountryMasterService, private activateroutes:ActivatedRoute,
    private shared_service:SharedService){}

  ngOnInit(): void {
    this.activateroutes.params.subscribe((res)=>{
      this.clusterId=res.id
    })
    this.masterservices.getClusterMasterDetailsById(this.clusterId).subscribe((res:any)=>{
      this.clusterMasterDetailsById=res.data
  
    })
  }
  // print(){
  //   let element_id="viewData_information"
  //   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
  //   })
  // }
  download_pdf_print() {
    let element_id="viewData_information"
   this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
   })
   }
}
