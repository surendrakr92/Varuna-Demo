import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventManagementRoutingModule } from './event-management-routing.module';
import { EventManagmentComponent } from './event-managment/event-managment.component';
import { VehicleStatusComponent } from './vehicleStatus/vehicle-status/vehicle-status.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    EventManagmentComponent,
    VehicleStatusComponent
  ],
  imports: [
    CommonModule,
    EventManagementRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
  ]
})
export class EventManagementModule { }
