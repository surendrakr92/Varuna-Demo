import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-branch',
  templateUrl: './view-branchLevel.component.html',
  styleUrls: ['./view-branchLevel.component.scss']
})
export class ViewBranchComponent {

constructor(private activateroutes:ActivatedRoute, private masterservices:CountryMasterService,
  private shared_service:SharedService){}
branchId:any=""
  branchDetailsById:any
  ngOnInit(): void {
    this.activateroutes.params.subscribe((res)=>{
      this.branchId=res.id
    })
    this.masterservices.getBranchLevelDetailsById(this.branchId).subscribe((res:any)=>{
      this.branchDetailsById=res.data
      console.log(this.branchDetailsById)
    })
  }
  print(){
    let element_id="viewData_information"
    this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
    })
  }
}
