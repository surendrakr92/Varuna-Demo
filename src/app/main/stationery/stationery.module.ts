import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationeryRoutingModule } from './stationery-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ItemMasterComponent } from './item/itemMaster/item-master.component';
import { CreateMasterComponent } from './createitemMaster/create-item-master.component';
import { ViewItemMasterComponent } from './item/viewitemMaster/view-item-master.component';
import { CreatePCMasterComponent } from './purchasechallan/createpcmaster/create-pc-master.component';
import { PurchaseMasterComponent } from './purchasechallan/purchasechallanMaster/purchase-master.component';
import { ViewPCMasterComponent } from './purchasechallan/viewpcmaster/view-pc-master.component';
import { ReceiptComponent } from './receipt/receipt-master.component';
import { ReceiptItemComponent } from './receipt/viewreceiptItem/viewreceiptitem-master.component';


import { CreateRequistionComponent } from './requisition/createrequistion/createrequistion-master.component';
import { RequistionMasterComponent } from './requisition/requistionmaster/requistion-master.component';
import { CreateSplitMasterComponent } from './splitStock/createsplitstock/create-split-master.component';
import { SplitComponent } from './splitStock/splitstock/split-master.component';
import { StatioaneryissueMasterComponent } from './statioanaryissuebranchemployee/branchemployeemaster/branchemp-master.component';
import { CreateBEMasterComponent } from './statioanaryissuebranchemployee/createbranchemployeemaster/create-be-master.component';
import { ViewBEMasterComponent } from './statioanaryissuebranchemployee/viewbranchemployeemaster/view-be-master.component';
import { TrackingComponent } from './tracking/tracking-master.component';
import { ViewreceiptitemlistComponent } from './receipt/viewreceiptitemlist/viewreceiptitemlist.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    ItemMasterComponent,
    ViewItemMasterComponent,
    CreateMasterComponent,
    PurchaseMasterComponent,
    ViewPCMasterComponent,
    CreatePCMasterComponent,
    StatioaneryissueMasterComponent,
    ViewBEMasterComponent,
    CreateBEMasterComponent,
    ReceiptComponent,
    ReceiptItemComponent,
    RequistionMasterComponent,
    CreateRequistionComponent,
    TrackingComponent,
    SplitComponent,
    CreateSplitMasterComponent,
    ViewreceiptitemlistComponent,
  ],
  imports: [
    CommonModule,
    StationeryRoutingModule,
    FormsModule,
    NgSelectModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  
  ]
})
export class StationeryModule { }
