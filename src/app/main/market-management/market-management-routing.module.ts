import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { MvAvailabilityComponent } from './mv-availability/mv-availability.component';
import { MvAvailabilityListComponent } from './mv-availability-list/mv-availability-list.component';
import { MvVehicleListListComponent } from './MVUnionVehicleEntry/mv-vehicle-list-list/mv-vehicle-list-list.component';
import { CreateMvAvailabilityComponent } from './create-mv-availability/create-mv-availability.component';
import { MvNonVehicleComponent } from './mvNonPlacedVehicle/mv-non-vehicle/mv-non-vehicle.component';
import { CreateMvNonVehicleComponent } from './mvNonPlacedVehicle/create-mv-non-vehicle/create-mv-non-vehicle.component';



const routes: Routes = [


  {
    path: 'mv-availability', component: MvAvailabilityComponent
  },
  {
    path: 'mv-availability/create-mv-availability', component: CreateMvAvailabilityComponent
  },
  {
    path: 'mv-availability/mv-availability-list', component: MvAvailabilityListComponent
  },
//-------------------MV VehicleList-------

  {
    path: 'mv-vehicleList', component: MvVehicleListListComponent
  },
  {
    path: 'mv-vehicleList/update-mv-vehicleList/:date', component: MvVehicleListListComponent
  },

  //-------------- MV Non Placed Vehicle-------------- 

  {
    path:'mv-non-placed-vehicle', component:MvNonVehicleComponent
  },
  {
    path:'mv-non-placed-vehicle/create-mv-non-placed-vehicle', component:CreateMvNonVehicleComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketManagementRoutingModule { }
