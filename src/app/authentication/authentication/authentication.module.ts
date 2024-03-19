import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import{ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    LoginPageComponent,
    ForgotPasswordComponent,
    TermsConditionComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
