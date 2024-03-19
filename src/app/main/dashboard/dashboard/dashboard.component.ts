import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  menu = [
    {
      "label": "Master",
      "icon": "bi bi-people",
      "route": "/master"
    },
    {
      "label": "Fleet",
      "icon": "bi bi-truck",
      "route": "/fleet"
    },
    {
      "label": "Event",
      "icon": "bi bi-calendar3",
      "route": "/event-management"
    },
    {
      "label": "Market",
      "icon": "bi bi-megaphone-fill",
      "route": "/market"
    },
    {
      "label": "Indent",
      "icon": "bi bi-person-fill-gear",
      "route": "/indent"
    },
    {
      "label": "Stationery",
      "icon": "bi bi-box-fill",
      "route": "/stationery"
    },
    {
      "label": "Ticket",
      "icon": "bi bi-ticket-detailed",
      "route": "/ticket"
    },
    {
      "label": "Operations",
      "icon": "bi bi-gear-wide-connected",
      "route": "/Operations"
    },
  ]
  constructor(private redirectionApi: SharedService) { } 
  redirectToMenu(paramsLavel: string) {
    debugger
    this.redirectionApi.setMenuItem(paramsLavel)

  }


}
// import { Component, OnInit } from '@angular/core';
// import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
// import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
// import { SharedService } from 'src/app/services/shared.service';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit{
//   menu:any =[] 
//   Module_Respince_Data:any
//   constructor(private redirectionApi: SharedService,private cs:CommonServiceService,
//     private masterServ:CountryMasterService) { }
//   ngOnInit(): void {
//     debugger
//     this.Module_Respince_Data=this.cs.login_UserModuleByRoleId()
//     this.menu=this.Module_Respince_Data[0].userModuelResponses
//   }
//   redirectToMenu(paramsLavel: any) {
//     debugger
//     this.redirectionApi.setMenuItem(paramsLavel.moduleName)
//     this.masterServ.getModulbyMenurights(paramsLavel.moduleId).subscribe((res)=>{
      
//     })
//   }
// }
