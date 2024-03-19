import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ToasterComponent } from './toaster/toaster.component';
import { LoadingComponent } from './loading/loading.component';
import { PageNotFoundComponent } from './PageNotFound/page-not-found/page-not-found.component';
import { DatePickerDirective } from './directive/dateManualPrevent';
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ToasterComponent,
    LoadingComponent,
    PageNotFoundComponent,
    DatePickerDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[HeaderComponent,SidebarComponent,ToasterComponent,LoadingComponent,PageNotFoundComponent,DatePickerDirective]
})
export class SharedModule { }
