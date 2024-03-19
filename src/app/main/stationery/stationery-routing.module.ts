import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMasterComponent } from './createitemMaster/create-item-master.component';
import { ItemMasterComponent } from './item/itemMaster/item-master.component';
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
import { LandingPageComponent } from './landing-page/landing-page.component';

import { ViewreceiptitemlistComponent } from './receipt/viewreceiptitemlist/viewreceiptitemlist.component';

const routes: Routes = [

  {
    path: '', component: LandingPageComponent
  },


  {
    path: 'item-master', component: ItemMasterComponent

  },
  {
    path: 'item-master/view-item-master/:id', component: ViewItemMasterComponent

  },
  {
    path: 'item-master/create-item-master', component: CreateMasterComponent

  },
  {
    path: 'item-master/update-item-master/:data', component: CreateMasterComponent

  },

  {
    path: 'purchase-master', component: PurchaseMasterComponent

  },

  {
    path: 'purchase-master/view-pc-master/:id', component: ViewPCMasterComponent

  },
  {
    path: 'purchase-master/create-pc-master', component: CreatePCMasterComponent

  },
  {
    path: 'purchase-master/update-pc-master/:data', component: CreatePCMasterComponent

  },

  {
    path: 'branchemp-master', component: StatioaneryissueMasterComponent

  },


  {
    path: 'branchemp-master/view-be-master/:id', component: ViewBEMasterComponent

  },

  {
    path: 'branchemp-master/create-be-master', component: CreateBEMasterComponent

  },

  {
    path: 'branchemp-master/update-be-master/:data', component: CreateBEMasterComponent

  },

  {
    path: 'receipt-master', component: ReceiptComponent

  },
  {
    path: 'receipt-master-list', component: ViewreceiptitemlistComponent
  },
  {
    path: 'receipt-master/viewreceiptitem-master/:id', component: ReceiptItemComponent
  },
  {
    path: 'requistion-master', component: RequistionMasterComponent

  },


  {
    path: 'requistion-master/createrequistion-master', component: CreateRequistionComponent

  },


  {
    path: 'requistion-master/updaterequistion-master/:data', component: CreateRequistionComponent

  },



  {
    path: 'tracking-master', component: TrackingComponent

  },


  {
    path: 'split-master', component: SplitComponent

  },

  {
    path: 'split-master', component: SplitComponent

  },

  {
    path: 'split-master/createsplit-master', component: CreateSplitMasterComponent

  },

  {
    path: 'split-master/updatesplit-master/:data', component: CreateSplitMasterComponent

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationeryRoutingModule { }
