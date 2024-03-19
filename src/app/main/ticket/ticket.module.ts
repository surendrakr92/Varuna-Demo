import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketLandingComponent } from './ticket-landing/ticket-landing.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplaintForwardComponent } from './complaint/complaint-fwd.component';
import { CreateTicketComponent } from './ticketentry/ticket-entry.component';
import { DepartmentMappingComponent } from './departmentmapping/deptmappingmaster/dept-mapping.component';


@NgModule({
  declarations: [
    TicketLandingComponent,
    ComplaintForwardComponent,
    CreateTicketComponent,
    DepartmentMappingComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
    FormsModule,
    NgSelectModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    

  ]
})
export class TicketModule { }
