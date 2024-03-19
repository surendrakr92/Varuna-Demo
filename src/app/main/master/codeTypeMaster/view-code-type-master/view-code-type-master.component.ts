import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-view-code-type-master',
  templateUrl: './view-code-type-master.component.html',
  styleUrls: ['./view-code-type-master.component.scss']
})
export class ViewCodeTypeMasterComponent implements OnInit {
  codeTypeId:any
  CodeTYpeDetailsById:any
  constructor(private masterservices:CountryMasterService, private activeroutes:ActivatedRoute){}

  ngOnInit(): void {
 this.activeroutes.params.subscribe((res)=>{
  this.codeTypeId=res.id
 })
 this.masterservices.getcodeTypeById(this.codeTypeId).subscribe((res:any)=>{
  this.CodeTYpeDetailsById=res.data
 })
  }

}
