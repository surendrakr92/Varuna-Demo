import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeFinYearComponent } from './change-fin-year/change-fin-year.component';
import { HelpComponentComponent } from './help-component/help-component.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { QuickGuideComponent } from './quick-guide/quick-guide.component';
import { VirtualLoginComponent } from './virtual-login/virtual-login.component';
import { FileUploadCongfigrationComponent } from './FileUploadConfigration/file-upload-congfigration/file-upload-congfigration.component';
import { NewFileUploadCongfigrationComponent } from './FileUploadConfigration/new-file-upload-congfigration/new-file-upload-congfigration.component';

const routes: Routes = [
{
  path:'',component:MyProfileComponent
},
{
  path:'quick',component:QuickGuideComponent
},
{
  path:'ChangeFinYear',component:ChangeFinYearComponent
},
{
  path:'VirtualLogin',component:VirtualLoginComponent
},
{
  path:'help',component:HelpComponentComponent
},
{
  path:'file-uploading-configration',component:FileUploadCongfigrationComponent
},
{
  path:'file-uploading-configration/new-file-uploading-configration',component:NewFileUploadCongfigrationComponent
},
{
  path:'update-file-uploading-configration/:data',component:NewFileUploadCongfigrationComponent
},
{
  path:'view-file-uploading-configration/:viewData',component:NewFileUploadCongfigrationComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
