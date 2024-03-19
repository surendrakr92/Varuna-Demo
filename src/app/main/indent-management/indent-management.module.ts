import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndentManagementRoutingModule } from './indent-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { CreatePickupRequestComponent } from './PRQ/create-pickup-request/create-pickup-request.component';
import { PickupClosureComponent } from './PRQClosure/pickup-closure/pickup-closure.component';
import { PrqClosureUpdateComponent } from './PRQClosureUpdate/prq-closure-update/prq-closure-update.component';
import { DocketEntryComponent } from './docketEntry/docket-entry/docket-entry.component';
import { DocketClubEditComponent } from './docketEntry/docket-club-edit/docket-club-edit.component';
import { DocketCancellationComponent } from './docketEntry/docket-cancellation/docket-cancellation.component';
import { DocketListComponent } from './docketEntry/docket-list/docket-list.component';
import { ListOfPickupRequestComponent } from './PRQ/list-of-pickup-request/list-of-pickup-request.component';
import { PickupRequestViewComponent } from './PRQ/pickup-request-view/pickup-request-view.component';
import { UploadPODCopyComponent } from './POD/upload-podcopy/upload-podcopy.component';
import { AllocationOfPODSupervisorAgainstCustomerComponent } from './POD/allocation-of-pod-supervisor-against-customer/allocation-of-pod-supervisor-against-customer.component';
import { ChangePODLocationComponent } from './POD/change-pod-location/change-pod-location.component';
import { PodapprovalComponent } from './POD/podapproval/podapproval.component';
import { ManifestComponent } from './Manifest/manifest/manifest.component';
import { DocketUnfinalizedComponent } from './docketEntry/docket-unfinalized/docket-unfinalized.component';
import { AllowELRCustomerAddressMasterComponent } from './E-LR Management/allow-elr-customer-address-master/allow-elr-customer-address-master.component';
import { ELRDashboardComponent } from './E-LR Management/elr-dashboard/elr-dashboard.component';
import { EwayBillCorrectionComponent } from './E-LR Management/eway-bill-correction/eway-bill-correction.component';
import { ManageDigitizedLRComponent } from './E-LR Management/manage-digitized-lr/manage-digitized-lr.component';
import { ManifestCancellationComponent } from './Manifest/manifest-cancellation/manifest-cancellation.component';
import { ManifestViewComponent } from './Manifest/manifest-view/manifest-view.component';
import { EmptyAutoTHCComponent } from './THC/empty-auto-thc/empty-auto-thc.component';
import { LoadedAutoThcComponent } from './THC/loaded-auto-thc/loaded-auto-thc.component';
import { StockUpdateListComponent } from './Stock Update/stock-update-list/stock-update-list.component';
import { StockUpdateComponent } from './Stock Update/stock-update/stock-update.component';
import { LoadedManualThcComponent } from './THC/loaded-manual-thc/loaded-manual-thc.component';
import { UnMappedProductComponent } from './E-LR Management/ELRProductMaster/un-mapped-product/un-mapped-product.component';
import { MappedProductComponent } from './E-LR Management/ELRProductMaster/mapped-product/mapped-product.component';
import { PODPFMTargetDaysComponent } from './POD/pod-pfm-target-days/pod-pfm-target-days/pod-pfm-target-days.component';
import { CreatePODPFMTargetDaysComponent } from './POD/pod-pfm-target-days/create-pod-pfm-target-days/create-pod-pfm-target-days.component';
import { ManifestArrivalComponent } from './Manifest/manifest-arrival/manifest-arrival.component';
@NgModule({
  declarations: [
    CreatePickupRequestComponent,
    PickupClosureComponent,
    PrqClosureUpdateComponent,
    DocketEntryComponent,
    DocketClubEditComponent,
    DocketCancellationComponent,
    DocketListComponent,
    ListOfPickupRequestComponent,
    PickupRequestViewComponent,
    UploadPODCopyComponent,
    ChangePODLocationComponent,
    AllocationOfPODSupervisorAgainstCustomerComponent,
    PodapprovalComponent,
    ManifestComponent,
    DocketUnfinalizedComponent,
    ManageDigitizedLRComponent,
    AllowELRCustomerAddressMasterComponent,
    EwayBillCorrectionComponent,
    ELRDashboardComponent,
    ManifestCancellationComponent,
    ManifestViewComponent,
    LoadedAutoThcComponent,
    EmptyAutoTHCComponent,
    StockUpdateComponent,
    StockUpdateListComponent,
    LoadedManualThcComponent,
    MappedProductComponent,
    UnMappedProductComponent,
    PODPFMTargetDaysComponent,
    CreatePODPFMTargetDaysComponent,
    ManifestArrivalComponent
  ],
  imports: [
    CommonModule,
    IndentManagementRoutingModule,
    FormsModule,
    NgSelectModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class IndentManagementModule { }
