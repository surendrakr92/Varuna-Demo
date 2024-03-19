import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const user = this.authenticationService.userValue;
      
      const localuser=JSON.parse(localStorage.getItem('user')|| '{}');//changes by me

      if ('token' in localuser) {
        return true;
      }

      this.router.navigate(['/auth'], {queryParams: { returnUrl: state.url }});
      return false;
  }


}
