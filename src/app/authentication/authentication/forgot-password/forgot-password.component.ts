import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgetemail: any = "";
  validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  constructor(private routes: Router, private authenticationService: AuthenticationService,
    private tosrerS:ToastrService) { }
  validationmessege: any = "";
  validation = false;
  ngOnInit(): void {
  }
  forgetPassword(data: any) {
    debugger;
    let fieldData = data.value;
    if (fieldData == '') {
      this.validationmessege = "please enter valid email";
      this.validation = true;
      return;
    }
    debugger
    // this.routes.navigate(['auth'])
    this.forgetemail = data.value;
    this.authenticationService.forgotPassword(this.forgetemail)
      .pipe(first())
      // .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.tosrerS.success('Please check your email for password reset instructions')
        },
         error: (error: any) => {
          this.tosrerS.error(error.error.Message)
          this.forgetemail=''
         }
      });
  }
  validatingInput(password: any) {
    if (password && password.value.match(this.validRegex)) {
      this.validation = false;
      this.validationmessege = '';
    } else {
      this.validationmessege = "please enter valid email";
      this.validation = true;
    }
  }
}
