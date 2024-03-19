import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetRoutingModule } from './fleet-routing.module';
import { TripOpenComponent } from './tripOperatons/trip-open/trip-open.component';
import { TripOpenDetailsComponent } from './tripOperatons/trip-open-details/trip-open-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { VehicleAssignmentToPRQComponent } from './vehicle-assignment-to-prq/vehicle-assignment-to-prq.component';
import { TripAdvanceComponent } from './tripOperatons/trip-advance/trip-advance.component';

import { RemarksMasterViewComponent } from './DPR/remarks-master-view/remarks-master-view.component';
import { SubCategoryMasterViewComponent } from './DPR/sub-category-master-view/sub-category-master-view.component';
import { MainCategoryMasterViewComponent } from './DPR/main-category-master-view/main-category-master-view.component';
import { MainCategoryMasterListComponent } from './DPR/main-category-master-list/main-category-master-list.component';
import { RemarksMasterComponent } from './DPR/remarks-master/remarks-master.component';
import { SubCategoryMasterComponent } from './DPR/sub-category-master/sub-category-master.component';
import { DriverPerformanceRemarksCreateComponent } from './DPR/driver-performance-remarks-create/driver-performance-remarks-create.component';
import { DriverPerformanceRemarksEntryComponent } from './DPR/driver-performance-remarks-entry/driver-performance-remarks-entry.component';


@NgModule({
  declarations: [
    TripOpenComponent,
    TripOpenDetailsComponent,
    LandingPageComponent,
    VehicleAssignmentToPRQComponent,
    RemarksMasterComponent,
    SubCategoryMasterComponent,
    MainCategoryMasterListComponent,
    TripAdvanceComponent,
    MainCategoryMasterViewComponent,
    SubCategoryMasterViewComponent,
    RemarksMasterViewComponent,
    DriverPerformanceRemarksCreateComponent,
    DriverPerformanceRemarksEntryComponent
  ],
  imports: [
    CommonModule,
    FleetRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule
  ]
})
export class FleetModule { }
