import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  constructor(private uServ:CountryMasterService,
    private cs:CommonServiceService){}
  userMasterDetailsById:any
  ngOnInit(): void {
    this.uServ.getUserMasterDetailsById(this.cs.login_UserId()).subscribe((res:any)=>{
      this.userMasterDetailsById=res.data
    })
  }

  profile:any=[
    {
      EmpId:'00005238',
      User_Id:'00005232',
      Secret_Question:"Varuna",
      Password:"varuna@#$",
      Secret_Answer:"Varuna@1"
    }
  ]
}
