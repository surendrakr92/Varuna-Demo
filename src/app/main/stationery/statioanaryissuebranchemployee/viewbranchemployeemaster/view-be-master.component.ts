import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { itemList } from 'src/app/models/Class/stationary';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { StationaryService } from 'src/app/services/master-service/stationary.service';

@Component({
  selector: 'app-view-pc-master',
  templateUrl: './view-be-master.component.html',
  styleUrls: ['./view-be-master.component.scss']
})
export class ViewBEMasterComponent {
  constructor(private activateroutes: ActivatedRoute, private masterservice: StationaryService) { }
  issueId: any
  issueIdDetailsById: any
  issuesObj: any;
  ngOnInit(): void {
    this.activateroutes.params.subscribe((res) => {
      this.issueId = res.id;
      let beMasterId = res.id;
      if (beMasterId) {
        this.masterservice.getAllStationeryissueDetailsById(beMasterId).subscribe((res: any) => {
          this.issuesObj = res.data;
        })
      }
    })
  }
}
