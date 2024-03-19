import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripOpenComponent } from './tripOperatons/trip-open/trip-open.component';
import { TripOpenDetailsComponent } from './tripOperatons/trip-open-details/trip-open-details.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { VehicleAssignmentToPRQComponent } from './vehicle-assignment-to-prq/vehicle-assignment-to-prq.component';
import { TripAdvanceComponent } from './tripOperatons/trip-advance/trip-advance.component';
import { Remarks } from 'src/app/models/fleet';
import { RemarksMasterViewComponent } from './DPR/remarks-master-view/remarks-master-view.component';
import { MainCategoryMasterListComponent } from './DPR/main-category-master-list/main-category-master-list.component';
import { MainCategoryMasterViewComponent } from './DPR/main-category-master-view/main-category-master-view.component';
import { RemarksMasterComponent } from './DPR/remarks-master/remarks-master.component';
import { SubCategoryMasterViewComponent } from './DPR/sub-category-master-view/sub-category-master-view.component';
import { SubCategoryMasterComponent } from './DPR/sub-category-master/sub-category-master.component';
import { DriverPerformanceRemarksEntryComponent } from './DPR/driver-performance-remarks-entry/driver-performance-remarks-entry.component';
import { DriverPerformanceRemarksCreateComponent } from './DPR/driver-performance-remarks-create/driver-performance-remarks-create.component';

const routes: Routes = [

  {
    path: '', component: LandingPageComponent
  },
  {
    path: 'trip-open', component: TripOpenComponent
  },
  {
    path: 'trip-open-details', component: TripOpenDetailsComponent
  },
  {
    path: 'vehicle-Assignment-to-PRQ', component: VehicleAssignmentToPRQComponent
  },
  {
    path: 'main-category-master-dashboard', component: MainCategoryMasterListComponent
  },
  {
    path: 'main-category-master-dashboard/main-category-master-view/:id', component: MainCategoryMasterViewComponent
  },
  {
    path: 'sub-category-master', component: SubCategoryMasterComponent
  },
  {
    path: 'sub-category-master/sub-category-master-view/:id', component: SubCategoryMasterViewComponent
  },
  {
    path: 'remarks-master', component: RemarksMasterComponent
  },
  {
    path: 'remarks-master/remarks-master-view/:id', component: RemarksMasterViewComponent
  },
  {
    path: 'trip-advance', component: TripAdvanceComponent
  },
  // driver Performance Remarks Entry
  {
    path: 'driver-performance-remarks-entry', component: DriverPerformanceRemarksEntryComponent
  },
  {
    path: 'driver-performance-remarks-entry/driver-performance-create', component: DriverPerformanceRemarksCreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRoutingModule { }
