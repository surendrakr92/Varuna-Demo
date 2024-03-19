import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-branch-user-mapping',
  templateUrl: './view-branch-user-mapping.component.html',
  styleUrls: ['./view-branch-user-mapping.component.scss']
})
export class ViewBranchUserMappingComponent implements OnInit {
branchUserList:any
branchUserMappingById:any=[]
constructor(private mastrservice:CountryMasterService,private shared_service:SharedService, private activeroute:ActivatedRoute){}
ngOnInit(): void {
  
  this.activeroute.params.subscribe((res)=>{
    this.branchUserList= res.id;

  })
  
  this.mastrservice.getBranchUserMappingById(this.branchUserList).subscribe((res:any)=>{
this.branchUserMappingById=res.data

  })
}
download_pdf_print() {
  let element_id="viewData_information"
 this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
 })
 }
}
