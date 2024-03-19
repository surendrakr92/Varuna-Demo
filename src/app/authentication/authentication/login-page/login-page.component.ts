import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constructor(private formbuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService) { }

  formvalidate!: FormGroup;
  submitted!: true
  show = false;
  password: any = "password";
  ngOnInit(): void {

    this.formvalidate = this.formbuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
      password: ['', Validators.required],
      companyCode: ['VIL', Validators.required],


    })
    localStorage.removeItem('user');//changes 
  }
  get f() {
    return this.formvalidate.controls;
  }
  onsubmit() {
    this.submitted = true;
    if (this.formvalidate.invalid) {
      return
    }
    this.authenticationService.login(this.formvalidate.controls['username'].value, btoa(this.formvalidate.controls['password'].value), this.formvalidate.controls['companyCode'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          debugger;
          // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          // this.router.navigate([returnUrl]);
          // this.toastrService.success('succesfully login !', 'Success-200 !');
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          // Use navigateByUrl to include query parameters in the redirection
          this.router.navigateByUrl(returnUrl).then((success: boolean) => {
            if (success) {
              this.toastrService.success('Successfully logged in!', 'Success-200');
            } else {
              this.toastrService.error('Navigation failed!', 'Error');
            }
          });

        },
        error: err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 400) {
              debugger

              Object.keys(err.error.errors).forEach((prop: any) => {
                const formControl = this.formvalidate.get(prop.toLowerCase());

                if (formControl) {
                  // activate the error message
                  formControl.setErrors({
                    serverError: err.error.errors[prop]
                  });
                }
              });

            }
          }
          debugger
          this.toastrService.error(err.error.Message ?? 'Authentication Failed', 'Error !');
        }
      });
    // this.router.navigate(['dashboard'])
    // //for testing
    // let json = {
    //   "succeeded": true,
    //   "message": "Authenticated 00001581",
    //   "errors": null,
    //   "data": {
    //     "id": "1",
    //     "userCode": "00001581",
    //     "userName": "Rahul Kumar",
    //     "branchID": 1,
    //     "branchName": "",
    //     "userStatus": "Active",
    //     "email": "rahul.kumar@varuna.net",
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMDAwMTU4MSIsImp0aSI6IjM1Y2JjYmUzLTVjY2EtNDU5NC04MDUyLTEyMzE1MzJhNjA5ZiIsImVtYWlsIjoicmFodWwua3VtYXJAdmFydW5hLm5ldCIsInVpZCI6IjEiLCJleHAiOjE2ODc2MDY1ODUsImlzcyI6IlZhcnVuYUFyY2hpdGVjdHVyZUFwcCIsImF1ZCI6IlZhcnVuYUFyY2hpdGVjdHVyZUFwcFVzZXIifQ.9jRHj43pJLDeCbo5ZbDWOxCnpPcQ_bu3frDDEeJvx-E",
    //     "refreshToken": "Wl/VcX20nv28ZV+JDoXrpypn9GlcDjuKybq6yhxCZS4G+rM3RvbdDCPoxctQR/SkEuZHxKeh7+Rn5IEe8rmH2Q==",
    //     "userRoleDetailsResponses": [
    //       {
    //         "roleId": 1,
    //         "roleName": "AppSupport",
    //         "isDefaultRole": false,
    //         "userModuelResponses": [
    //           {
    //             "moduleId": 3,
    //             "moduleName": "string",
    //             "moduleImagePath": "string"
    //           },
    //           {
    //             "moduleId": 1,
    //             "moduleName": "Test12",
    //             "moduleImagePath": "image"
    //           }
    //         ]
    //       },
    //       {
    //         "roleId": 2,
    //         "roleName": "User-Aceess",
    //         "isDefaultRole": false,
    //         "userModuelResponses": [
    //           {
    //             "moduleId": 3,
    //             "moduleName": "string",
    //             "moduleImagePath": "string"
    //           },
    //           {
    //             "moduleId": 1,
    //             "moduleName": "Test12",
    //             "moduleImagePath": "image"
    //           }
    //         ]
    //       },
    //       {
    //         "roleId": 1,
    //         "roleName": "AppSupport",
    //         "isDefaultRole": false,
    //         "userModuelResponses": [
    //           {
    //             "moduleId": 3,
    //             "moduleName": "string",
    //             "moduleImagePath": "string"
    //           },
    //           {
    //             "moduleId": 1,
    //             "moduleName": "Test12",
    //             "moduleImagePath": "image"
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // }
    // localStorage.setItem('user', JSON.stringify(json));
    // for testing
  }
  onClick() {

    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
}