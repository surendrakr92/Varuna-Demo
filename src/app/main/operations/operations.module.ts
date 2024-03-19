import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';

import { LandingComponent } from './landing/landing.component';
import { ScanDocumentComponent } from './scan-document/scan-document.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ForwardDocumentComponent } from './forward-document/forward-document.component';
import { AcknowledgeDocumentComponent } from './acknowledge-document/acknowledge-document.component';
import { ViewPrintComponent } from './view-print/view-print.component';
import { TrackDocumentComponent } from './track-document/track-document.component';
import { DocumentPendingforScanComponent } from './document-pendingfor-scan/document-pendingfor-scan.component';
import { UpdateArrivalDateTimeComponent } from './update-arrival-date-time/update-arrival-date-time.component';
import { ReScanDocumentComponent } from './re-scan-document/re-scan-document.component';
import { DFMLocationEditComponent } from './dfmlocation-edit/dfmlocation-edit.component';
import { CourierDetailsUpdateComponent } from './courier-details-update/courier-details-update.component';
import { UploadInvoiceComponent } from './upload-invoice/upload-invoice.component';
import { ReuploadInvoiceCopyComponent } from './reupload-invoice-copy/reupload-invoice-copy.component';
import { EmptyRouteRequestComponent } from './EmptyRouteRequest/empty-route-request/empty-route-request.component';
import { OvrIvrEntryComponent } from './OtherVehicleEntry/ovr-ivr-entry/ovr-ivr-entry.component';
import { CreateOvrIvrEntryComponent } from './OtherVehicleEntry/create-ovr-ivr-entry/create-ovr-ivr-entry.component';
import { ExtendewaybillexpiryComponent } from './ExtendEwayBillExpiry/extendewaybillexpiry/extendewaybillexpiry.component';
import { BlackListMVMasterComponent } from './BlackListMVMaster/black-list-mvmaster/black-list-mvmaster.component';


@NgModule({
  declarations: [

    LandingComponent,
     ScanDocumentComponent,
     ForwardDocumentComponent,
     AcknowledgeDocumentComponent,
     ViewPrintComponent,
     TrackDocumentComponent,
     DocumentPendingforScanComponent,
     UpdateArrivalDateTimeComponent,
     ReScanDocumentComponent,
     DFMLocationEditComponent,
     CourierDetailsUpdateComponent,
     UploadInvoiceComponent,
     ReuploadInvoiceCopyComponent,
     EmptyRouteRequestComponent,
     OvrIvrEntryComponent,
     CreateOvrIvrEntryComponent,
     ExtendewaybillexpiryComponent,
     BlackListMVMasterComponent
  ],
  imports: [
    CommonModule,
    OperationsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule
  ]
})
export class OperationsModule { }
