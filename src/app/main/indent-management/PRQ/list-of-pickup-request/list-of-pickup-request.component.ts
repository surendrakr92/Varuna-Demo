import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { IndentServiceService } from 'src/app/services/master-service/indent-service.service';
declare var $: any

@Component({
  selector: 'app-list-of-pickup-request',
  templateUrl: './list-of-pickup-request.component.html',
  styleUrls: ['./list-of-pickup-request.component.scss']
})
export class ListOfPickupRequestComponent implements OnInit {

  UserId: any
  prqList: any = []
  constructor(
    private routes: Router,
    private cs: CommonServiceService,//for id
    private indentS: IndentServiceService
  ) {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      lengthMenu: [5,10, 20, 50, 100,200],
      // processing:true,
    }
    this.UserId = this.cs.login_User_Code()//for id
  }
  dtTrigger: Subject<any> = new Subject<any>()
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
  this.getPrqList()

  }
  OnCLick(id:any) {
    this.routes.navigate(['/indent/update-pickup-request',id])
  }
  getPrqList(){
    this.indentS.getAllPRq().subscribe((Res: any) => {
      this.prqList = Res.data
      this.dtTrigger.next(null)
    })
  }



}
