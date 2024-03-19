import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { QuickGuideComponent } from './quick-guide/quick-guide.component';
import { ChangeFinYearComponent } from './change-fin-year/change-fin-year.component';
import { VirtualLoginComponent } from './virtual-login/virtual-login.component';

import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { HelpComponentComponent } from './help-component/help-component.component';
import {DataTablesModule} from 'angular-datatables'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadCongfigrationComponent } from './FileUploadConfigration/file-upload-congfigration/file-upload-congfigration.component';
import { NewFileUploadCongfigrationComponent } from './FileUploadConfigration/new-file-upload-congfigration/new-file-upload-congfigration.component';




@NgModule({
  declarations: [
    MyProfileComponent,
    QuickGuideComponent,
    ChangeFinYearComponent,
    VirtualLoginComponent,
    HelpComponentComponent,
    FileUploadCongfigrationComponent,
    NewFileUploadCongfigrationComponent,
    

  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgSelectModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule 
    
    

  ]
})
export class ProfileModule { }
