import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BlankcomponentComponent } from 'src/layout/blankcomponent/blankcomponent.component';
import { FullcomponentComponent } from 'src/layout/fullcomponent/fullcomponent.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrivacyPolicyComponent } from './authentication/authentication/privacy-policy/privacy-policy.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GlobalErrorService } from './services/error/global-error.service';
import { JwtInterceptor } from './helper/jwt.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingInterceptor } from './helper/loading.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    FullcomponentComponent,
    BlankcomponentComponent,
    PrivacyPolicyComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000, // 10 seconds
      closeButton: true,
      progressBar: true,
    }),
    NgbModule, // ToastrModule added
  ],
  providers: [
     { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
     { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
      { provide: ErrorHandler, useClass: GlobalErrorService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
