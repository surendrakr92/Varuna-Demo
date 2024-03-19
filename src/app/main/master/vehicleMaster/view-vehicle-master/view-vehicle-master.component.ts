import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryMasterService } from 'src/app/services/master-service/country-master.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-vehicle-master',
  templateUrl: './view-vehicle-master.component.html',
  styleUrls: ['./view-vehicle-master.component.scss']
})
export class ViewVehicleMasterComponent implements OnInit {

  vehicleId:any
  vehicleDetailById:any
  constructor(private activeroute:ActivatedRoute, private masterService:CountryMasterService,   private test_service: SharedService,){}
  ngOnInit(): void {
    
    this.activeroute.params.subscribe((res)=>{
this.vehicleId= res.id
    })
this.masterService.getvehicleDetailById(this.vehicleId).subscribe((res:any)=>{
this.vehicleDetailById= res.data[0]
console.log(this.vehicleDetailById)
})
  }

  download_pdf_print() {
    let elementId = 'viewData_information'
    this.test_service.print_file_to_pdf(elementId).subscribe((res: any) => {

    })
  }

}
