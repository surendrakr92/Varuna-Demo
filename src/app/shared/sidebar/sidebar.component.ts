import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})


export class SidebarComponent implements OnInit {
  $menu: any = ""
  userId:any
  sideBarData = [
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
  constructor(private redirectionApi: SharedService,private cs:CommonServiceService) {
    this.switchMenuValue()
    this.userId=this.cs.login_User_Code()
  }
  ngOnInit() {
  }
  switchMenuValue() {
    this.redirectionApi.menu.subscribe(result => {
      this.$menu = result
    })
  }
  redirectToMenu(paramsLavel: string) {
    this.redirectionApi.setMenuItem(paramsLavel)

  }
}
// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { Observable, Subscription } from 'rxjs';
// import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
// import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
// import { SharedService } from 'src/app/services/shared.service';

// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.scss']
// })


// export class SidebarComponent implements OnInit {
//   private menuUpdateSubscription: Subscription;
//   $menu: any = ""
//   userId: any
//   menuItems: any = []
//   sideBarData: any = [
//   ]
//   Module_Respince_Data: any
//   constructor(private redirectionApi: SharedService, private cs: CommonServiceService,
//     private masterServ: CountryMasterService) {
//     this.switchMenuValue()
//     this.userId = this.cs.login_User_Code()
//     debugger
//     // this.menuItems = this.cs.MenuDetail_By_ModuleId()
//     this.menuUpdateSubscription = this.masterServ.menuUpdated$.subscribe(() => {
//       this.menuItems = this.cs.MenuDetail_By_ModuleId();
//     });
//     if(this.menuItems=[]){
//       this.menuItems = this.cs.MenuDetail_By_ModuleId();
//     }
//   }
//   ngOnInit() {
//     this.Module_Respince_Data = this.cs.login_UserModuleByRoleId()
//     this.sideBarData = this.Module_Respince_Data[0].userModuelResponses
//   }
//   ngOnDestroy() {
//     // Unsubscribe from the subscription to avoid memory leaks
//     this.menuUpdateSubscription.unsubscribe();
//   }
//   switchMenuValue() {
//     this.redirectionApi.menu.subscribe(result => {
//       this.$menu = result
//     })
//   }
//   redirectToMenu(paramsLavel: any) {
//     this.redirectionApi.setMenuItem(paramsLavel.moduleName)
//     this.masterServ.getModulbyMenurights(paramsLavel.moduleId).subscribe((res) => {
//       this.menuItems = this.cs.MenuDetail_By_ModuleId()
//     })
//   }
//   setupActionHandler(handler: any) {
//     debugger
//     if (handler.subMenuNewEntities) {
//       let rr = handler.subMenuNewEntities.reduce((acc: { [x: string]: any; }, item: { description: string | number; isActionRight: any; }) => {
//         acc[item.description] = item.isActionRight;
//         return acc;
//       }, {});
//       sessionStorage.setItem('actionHandler', JSON.stringify(rr))
//       let ceckJSon: any = JSON.parse(sessionStorage.getItem('actionHandler') || '{}')
//       debugger
//       if (ceckJSon['Add New Country'] == true) {
//         // const createButton:any = document.getElementById("createButton");
//         // createButton.disabled = true;
//         const createButton: any = document.getElementById("createButton");
//         createButton.disabled = true;
//         createButton.style.display = "none";
//         return
//       }
//       sessionStorage.removeItem('actionHandler')
//       return
//     }

//   }
// }
