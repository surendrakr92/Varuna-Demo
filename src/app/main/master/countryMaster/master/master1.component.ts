import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-master1',
  templateUrl: './master1.component.html',
  styleUrls: ['./master1.component.scss']
})
export class Master1Component {
  constructor(private redirectionSetup:SharedService){}
  setUpMenu(){
    this.redirectionSetup.setMenuItem("")
  }
}
