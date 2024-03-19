import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-sub-cluster-master',
  templateUrl: './view-sub-cluster-master.component.html',
  styleUrls: ['./view-sub-cluster-master.component.scss']
})
export class ViewSubClusterMasterComponent {
  constructor(private activateroutes:ActivatedRoute, private masterservices:CountryMasterService,
   private shared_service:SharedService){}

  subClusterId:any=""
 subClusterDetailsById:any
  ngOnInit(): void {
    this.activateroutes.params.subscribe((res)=>{
      this.subClusterId=res.id
    })
    this.masterservices.getSubClusterMasterDetailsById(this.subClusterId).subscribe((res:any)=>{
      this.subClusterDetailsById=res.data
      console.log(this.subClusterDetailsById)
    })
  }
  print(){
       let element_id="viewData_information"
       this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
       })
  }
}
