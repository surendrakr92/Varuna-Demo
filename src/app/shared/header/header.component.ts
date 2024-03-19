import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userCode:any
  userName:any
  userBranch:any
  constructor(private authenticationService:AuthenticationService,
    private cs:CommonServiceService){
      this.userCode=this.cs.login_User_Code()
      this.userName=this.cs.login_UserName()
      this.userBranch=this.cs.login_UserCurrBranch()
    }
  showsearchbar:boolean=false
  @Output() public toggleValue = new EventEmitter<any>();
  toggle() {
    this.toggleValue.emit('value');
  }
 
  logout(){
    this.authenticationService.logout();
  }

  
}
