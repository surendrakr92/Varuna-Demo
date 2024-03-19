import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-branch-master',
  templateUrl: './view-branch-master.component.html',
  styleUrls: ['./view-branch-master.component.scss']
})
export class ViewBranchMasterComponent implements OnInit {
 
  branchMasterDetailById:any=[]
  branchID:any=""
  constructor(private masterservices:CountryMasterService, private activateroutes:ActivatedRoute,
    private shserv:SharedService){}

  ngOnInit(): void {
    this.activateroutes.params.subscribe((res)=>{
      this.branchID=res.id
    })
    this.masterservices.getBranchMasterDetailsById(this.branchID).subscribe((res:any)=>{
      this.branchMasterDetailById=res.data
      console.log(this.branchMasterDetailById)
    })
  }
  printPdf(){
    let id='view_information'
this.shserv.print_file_to_pdf(id).subscribe((res)=>{})
  }
}
