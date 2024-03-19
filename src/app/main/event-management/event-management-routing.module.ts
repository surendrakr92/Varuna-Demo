import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventManagmentComponent } from './event-managment/event-managment.component';
import { VehicleStatusComponent } from './vehicleStatus/vehicle-status/vehicle-status.component';

const routes: Routes = [
  {
    path:'',component:EventManagmentComponent
  },
  {
    path:'vehicle-status',component:VehicleStatusComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventManagementRoutingModule { }
