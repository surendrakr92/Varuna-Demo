import { Routes } from "@angular/router";
import { MappedProductComponent } from "src/app/main/indent-management/E-LR Management/ELRProductMaster/mapped-product/mapped-product.component";
import { UnMappedProductComponent } from "src/app/main/indent-management/E-LR Management/ELRProductMaster/un-mapped-product/un-mapped-product.component";
import { AllowELRCustomerAddressMasterComponent } from "src/app/main/indent-management/E-LR Management/allow-elr-customer-address-master/allow-elr-customer-address-master.component";
import { ELRDashboardComponent } from "src/app/main/indent-management/E-LR Management/elr-dashboard/elr-dashboard.component";
import { EwayBillCorrectionComponent } from "src/app/main/indent-management/E-LR Management/eway-bill-correction/eway-bill-correction.component";
import { ManageDigitizedLRComponent } from "src/app/main/indent-management/E-LR Management/manage-digitized-lr/manage-digitized-lr.component";
import { ManifestArrivalComponent } from "src/app/main/indent-management/Manifest/manifest-arrival/manifest-arrival.component";
import { ManifestCancellationComponent } from "src/app/main/indent-management/Manifest/manifest-cancellation/manifest-cancellation.component";
import { ManifestViewComponent } from "src/app/main/indent-management/Manifest/manifest-view/manifest-view.component";
import { ManifestComponent } from "src/app/main/indent-management/Manifest/manifest/manifest.component";
import { AllocationOfPODSupervisorAgainstCustomerComponent } from "src/app/main/indent-management/POD/allocation-of-pod-supervisor-against-customer/allocation-of-pod-supervisor-against-customer.component";
import { ChangePODLocationComponent } from "src/app/main/indent-management/POD/change-pod-location/change-pod-location.component";
import { CreatePODPFMTargetDaysComponent } from "src/app/main/indent-management/POD/pod-pfm-target-days/create-pod-pfm-target-days/create-pod-pfm-target-days.component";
import { PODPFMTargetDaysComponent } from "src/app/main/indent-management/POD/pod-pfm-target-days/pod-pfm-target-days/pod-pfm-target-days.component";
import { PodapprovalComponent } from "src/app/main/indent-management/POD/podapproval/podapproval.component";
import { UploadPODCopyComponent } from "src/app/main/indent-management/POD/upload-podcopy/upload-podcopy.component";
import { CreatePickupRequestComponent } from "src/app/main/indent-management/PRQ/create-pickup-request/create-pickup-request.component";
import { ListOfPickupRequestComponent } from "src/app/main/indent-management/PRQ/list-of-pickup-request/list-of-pickup-request.component";
import { PickupRequestViewComponent } from "src/app/main/indent-management/PRQ/pickup-request-view/pickup-request-view.component";
import { PickupClosureComponent } from "src/app/main/indent-management/PRQClosure/pickup-closure/pickup-closure.component";
import { PrqClosureUpdateComponent } from "src/app/main/indent-management/PRQClosureUpdate/prq-closure-update/prq-closure-update.component";
import { StockUpdateListComponent } from "src/app/main/indent-management/Stock Update/stock-update-list/stock-update-list.component";
import { StockUpdateComponent } from "src/app/main/indent-management/Stock Update/stock-update/stock-update.component";
import { EmptyAutoTHCComponent } from "src/app/main/indent-management/THC/empty-auto-thc/empty-auto-thc.component";
import { LoadedAutoThcComponent } from "src/app/main/indent-management/THC/loaded-auto-thc/loaded-auto-thc.component";
import { LoadedManualThcComponent } from "src/app/main/indent-management/THC/loaded-manual-thc/loaded-manual-thc.component";
import { DocketCancellationComponent } from "src/app/main/indent-management/docketEntry/docket-cancellation/docket-cancellation.component";
import { DocketClubEditComponent } from "src/app/main/indent-management/docketEntry/docket-club-edit/docket-club-edit.component";
import { DocketEntryComponent } from "src/app/main/indent-management/docketEntry/docket-entry/docket-entry.component";
import { DocketListComponent } from "src/app/main/indent-management/docketEntry/docket-list/docket-list.component";
import { DocketUnfinalizedComponent } from "src/app/main/indent-management/docketEntry/docket-unfinalized/docket-unfinalized.component";

export const IndentRoutes: Routes = [
    {
        path: 'pickup-request', component: CreatePickupRequestComponent
      },
      {
        path: 'update-pickup-request/:data', component: CreatePickupRequestComponent
      },
      {
        path: 'list-of-pickup-request', component: ListOfPickupRequestComponent
      },
      {
        path: 'list-of-pickup-request/pickup-request-view/:data', component: PickupRequestViewComponent
      },
      {
        path: 'pickup-closure', component: PickupClosureComponent
      },
      {
        path: 'pickup-closure-update', component: PrqClosureUpdateComponent
      },
      {
        path: 'docket-entry', component: DocketEntryComponent
      },
      {
        path: 'docket-list/docket-update', component: DocketEntryComponent
      },
      {
        path: 'docket-finencial-list/docket-update', component: DocketEntryComponent
      },
      {
        path: 'docket-nestle-list/docket-update', component: DocketEntryComponent
      },
      {
        path: 'docket-list', component: DocketListComponent
      },
      {
        path: 'docket-finencial-list', component: DocketListComponent
      },
      {
        path: 'docket-nestle-list', component: DocketListComponent
      },
      {
        path: 'docket-club-edit', component: DocketClubEditComponent
      },
      {
        path: 'docket-cancellation', component: DocketCancellationComponent
      },
      {
        path: 'docketUnfinalized', component: DocketUnfinalizedComponent
      },
      {
        path: 'upload-pod-copy', component: UploadPODCopyComponent
      },
      {
        path: 'pod-approval', component: PodapprovalComponent
      },
      {
        path: 'allocation-of-POD-Supervisor-Against-Customer', component: AllocationOfPODSupervisorAgainstCustomerComponent
      },
      {
        path: 'change_POD_Location', component: ChangePODLocationComponent
      }, 
      {
        path: 'POD-PFM-Target-days', component: PODPFMTargetDaysComponent
      },
      {
        path: 'manageDigitizedLR', component: ManageDigitizedLRComponent
      },
      {
        path: 'allow-ELR-Customer-address-Master', component: AllowELRCustomerAddressMasterComponent
      },
      {
        path: 'eway-Bill-Correction', component: EwayBillCorrectionComponent
      },
      {
        path: 'elr-dashboard', component: ELRDashboardComponent
      },
      {
        path: 'POD-PFM-Target-days/create-POD-PFM-Target-days', component: CreatePODPFMTargetDaysComponent
      },
      {
        path: 'POD-PFM-Target-days/edit-POD-PFM-Target-days/:id', component: CreatePODPFMTargetDaysComponent
      },
      {
        path: 'POD-PFM-Target-days', component: PODPFMTargetDaysComponent
      },
      //manifest
      {
        path: 'manifest', component: ManifestComponent
      },
      {
        path: 'manifest-view', component: ManifestViewComponent
      },
      {
        path: 'manifest-Cancellation', component: ManifestCancellationComponent
      },
      {
        path:'manifest-arrival',component:ManifestArrivalComponent
      },


      //thc
      {
        path: 'empty-auto-thc', component: EmptyAutoTHCComponent
      },
      {
        path: 'loaded-auto-thc', component: LoadedAutoThcComponent
      },
      {
        path:'loaded-manual-thc',component:LoadedManualThcComponent
      },
      //stock
      {
        path:'stock-update',component:StockUpdateComponent
      },
      {
        path:'stock-update/stock-update-list',component:StockUpdateListComponent
      },
      {
        path:'un-mapped-product',component:UnMappedProductComponent
      },
      {
        path:'mapped-product',component:MappedProductComponent
      },
      
  ]