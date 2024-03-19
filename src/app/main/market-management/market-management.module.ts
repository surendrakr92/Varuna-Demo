import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketManagementRoutingModule } from './market-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';

import { CreateMvAvailabilityComponent } from './create-mv-availability/create-mv-availability.component';
import { MvAvailabilityComponent } from './mv-availability/mv-availability.component';
import { MvAvailabilityListComponent } from './mv-availability-list/mv-availability-list.component';
import { MvVehicleListListComponent } from './MVUnionVehicleEntry/mv-vehicle-list-list/mv-vehicle-list-list.component';
import { MvNonVehicleComponent } from './mvNonPlacedVehicle/mv-non-vehicle/mv-non-vehicle.component';
import { CreateMvNonVehicleComponent } from './mvNonPlacedVehicle/create-mv-non-vehicle/create-mv-non-vehicle.component';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    CreateMvAvailabilityComponent,
    MvAvailabilityComponent,
    MvAvailabilityListComponent,
    MvVehicleListListComponent,
    MvNonVehicleComponent,
    CreateMvNonVehicleComponent

  
  ],
  imports: [
    CommonModule,
    MarketManagementRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    SharedModule
  ]
})
export class MarketManagementModule { }
