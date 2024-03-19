import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-fullcomponent',
  templateUrl: './fullcomponent.component.html',
  styleUrls: ['./fullcomponent.component.scss']
})
export class FullcomponentComponent {
  [x: string]: any;
  toggleStyle: boolean = false;
  changeclass=''
  setUpMenu:any
  // toggle(){
  //   this.toggleStyle = !this.toggleStyle;
  // }

  @Output() public toggleValue = new EventEmitter<any>();
  constructor(router: Router ,private redirectionApi:SharedService){
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setUpMenu = this.redirectionApi.getMenu();
        // alert(this.setUpMenu)
        // console.log(this.setUpMenu)
        if(event.url.includes('dashboard'))  this.redirectionApi.setMenuItem("")
        if(event.url.includes('master'))  this.redirectionApi.setMenuItem("Master")
        if(event.url.includes('operation'))  this.redirectionApi.setMenuItem("Operation")
        if(event.url.includes('finance'))  this.redirectionApi.setMenuItem("Finance")
        if(event.url.includes('event-management'))  this.redirectionApi.setMenuItem("Event Management")
        if(event.url.includes('market'))  this.redirectionApi.setMenuItem("Market")
        if(event.url.includes('indent'))  this.redirectionApi.setMenuItem("Indent")
        if(event.url.includes('stationery'))  this.redirectionApi.setMenuItem("stationery")
        if(event.url.includes('ticket'))  this.redirectionApi.setMenuItem("ticket")
        if(event.url.includes('fleet'))  this.redirectionApi.setMenuItem("Fleet")
        if(event.url.includes('Operations'))  this.redirectionApi.setMenuItem("Operations")
        // if(this.setUpMenu==='')  this.redirectionApi.setMenuItem("")
        // if(this.setUpMenu==='Master')  this.redirectionApi.setMenuItem("Master")
        // if(this.setUpMenu==='Operation')  this.redirectionApi.setMenuItem("Operation")
        // if(this.setUpMenu==='Finance')  this.redirectionApi.setMenuItem("Finance")
        // if(this.setUpMenu==='Event Management')  this.redirectionApi.setMenuItem("Event Management")
      }
  });
  }
  
  onchange(){
    this.toggleStyle = !this.toggleStyle;
}

toggle() {
  this.toggleStyle = !this.toggleStyle;
  this.changeclass="-fill"

}

}