import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,

    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const user = this.authenticationService.userValue;
    const localuser=JSON.parse(localStorage.getItem('user')|| '{}');//changes by me
    const isLoggedIn = localuser && localuser.token;
    const userToken = localuser?.token;

    const isApiUrl = request.url.startsWith(environment.baseWebApiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
          setHeaders: {
              Authorization: `Bearer ${userToken}`
          }
      });
  }
    return next.handle(request);
  }
}
