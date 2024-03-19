import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-view-user-master',
  templateUrl: './view-user-master.component.html',
  styleUrls: ['./view-user-master.component.scss']
})
export class ViewUserMasterComponent {

  constructor(private userMasterServices:CountryMasterService, private activateroutes:ActivatedRoute){}
  userId:any=""
 userMasterDetailsById:any
  ngOnInit(): void {
    this.activateroutes.params.subscribe((res)=>{
      this.userId=res.id
    })
    this.userMasterServices.getUserMasterDetailsById(this.userId).subscribe((res:any)=>{
      this.userMasterDetailsById=res.data
    })
  }
  
  }
  
