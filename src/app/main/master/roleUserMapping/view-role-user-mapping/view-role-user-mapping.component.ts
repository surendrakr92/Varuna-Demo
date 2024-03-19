import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-role-user-mapping',
  templateUrl: './view-role-user-mapping.component.html',
  styleUrls: ['./view-role-user-mapping.component.scss']
})
export class ViewRoleUserMappingComponent implements OnInit {
viewRoleMappingById:any
roleId:any
  constructor(private masterservices:CountryMasterService,
    private shared_service:SharedService, private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
  
  this.activatedRoute.params.subscribe((res)=>{
    this.roleId = res.id
  })
  this.masterservices.getRoleUserMappingById(this.roleId).subscribe((res:any)=>{
    this.viewRoleMappingById = res.data
    console.log(this.viewRoleMappingById)
  })
}
download_pdf_print() {
  let element_id="viewData_information"
 this.shared_service.print_file_to_pdf(element_id).subscribe((rs)=>{
 })
 }
}
