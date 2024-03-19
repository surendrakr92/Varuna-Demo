import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ScanDocumentComponent } from './scan-document/scan-document.component';
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
import { ViewManageComponent } from '../master/SOP/view-manage/view-manage.component';
import { CreateOvrIvrEntryComponent } from './OtherVehicleEntry/create-ovr-ivr-entry/create-ovr-ivr-entry.component';
import { ExtendewaybillexpiryComponent } from './ExtendEwayBillExpiry/extendewaybillexpiry/extendewaybillexpiry.component';
import { BlackListMVMasterComponent } from './BlackListMVMaster/black-list-mvmaster/black-list-mvmaster.component';

const routes: Routes = [

{
  path:'', component:LandingComponent
},
{
  path:'scan-document', component:ScanDocumentComponent
},
{
  path:'forward-document', component:ForwardDocumentComponent
},
{
  path:'acknowledge-document', component:AcknowledgeDocumentComponent
},
{
  path:'view-print', component:ViewPrintComponent
},
{
  path:'track-document', component:TrackDocumentComponent
},
{
  path:'document-pending-for-scan', component:DocumentPendingforScanComponent
},
{
  path:'update-arrival-date-time', component:UpdateArrivalDateTimeComponent
},
{
  path:'re-scan-document', component:ReScanDocumentComponent
},
{
  path:'dfm-location-edit', component:DFMLocationEditComponent
},
{
  path:'courier-details-update', component:CourierDetailsUpdateComponent
},
{
  path:'upload-invoice', component:UploadInvoiceComponent
},
{
  path:'reupload-invoice', component:ReuploadInvoiceCopyComponent
},
{
  path:'empty-route-request', component:EmptyRouteRequestComponent
},
{
  path:'ovr-ivr-entry', component:OvrIvrEntryComponent
},
{
  path:'ovr-ivr-entry/create-ovr-ivr-entry', component:CreateOvrIvrEntryComponent
},

{
  path:'ovr-ivr-entry/update-ovr-ivr-entry/:id', component:CreateOvrIvrEntryComponent
},
// Extend E-way Bill Expiry

{
  path:'extendewaybillexpiry', component:ExtendewaybillexpiryComponent
},

//black-list-mvmaster
{
  path:'black-list-mv-master', component:BlackListMVMasterComponent
},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
