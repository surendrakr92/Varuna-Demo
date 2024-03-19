import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketLandingComponent } from './ticket-landing/ticket-landing.component';
import { CreateTicketComponent } from './ticketentry/ticket-entry.component';
import { ComplaintForwardComponent } from './complaint/complaint-fwd.component';
import { DepartmentMappingComponent } from './departmentmapping/deptmappingmaster/dept-mapping.component';


const routes: Routes = [

  {
    path:'', component:TicketLandingComponent
  },

  {
    path: 'ticket-entry', component: CreateTicketComponent
  
  },
  {
    path: 'complaint-fwd', component: ComplaintForwardComponent
  
  },
  {
    path: 'dept-mapping', component: DepartmentMappingComponent
  
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
