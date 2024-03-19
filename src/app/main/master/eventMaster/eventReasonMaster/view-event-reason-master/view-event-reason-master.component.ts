import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventMasterService } from 'src/app/services/master-service/event-master.service';

@Component({
  selector: 'app-view-event-reason-master',
  templateUrl: './view-event-reason-master.component.html',
  styleUrls: ['./view-event-reason-master.component.scss']
})
export class ViewEventReasonMasterComponent implements OnInit{
  eventReasonById:any=''
  constructor(private ev:EventMasterService,
    private routes:ActivatedRoute){}
  ngOnInit(): void {
let id=this.routes.snapshot.params.id
    this.ev.geteventRDetailsById(id).subscribe((res:any)=>this.eventReasonById=res.data[0])
  }
  download_pdf_print(){}
}
