import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { SharedService } from 'src/app/services/shared.service';



@Component({
  selector: 'app-help-component',
  templateUrl: './help-component.component.html',
  styleUrls: ['./help-component.component.scss']
})


export class HelpComponentComponent implements OnInit {
  fackData: any
  constructor(private service:SharedService){}
  tableflag=0
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu:[5,10,20,50,100],
      // processing:true,
    } 


    this.service.getfackData().subscribe((res)=>{
      this.fackData= res;
      console.log(this.fackData)
this.tableflag=1

    })

  }



}
