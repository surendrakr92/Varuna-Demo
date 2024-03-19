
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public apiresponse: ApiResponse | any;
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {

    this.userSubject = new BehaviorSubject<User | null>(null); // JSON.parse(localStorage.getItem('user')!)
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  private refreshTokenTimeout: any;


  public isAuthenticated(): Observable<boolean> {
    return this.user.pipe(map(u => !!u));
  }
  login(username: string, password: string,companyCode:string) {
    return this.httpClient.post<ApiResponse>(environment.baseWebApiUrl + 'authentication/authenticate?api-version=v1', { username, password ,companyCode})
      .pipe(
        map((response: ApiResponse) => {
          debugger
          const user = response.data;
          user['currBrcdId']=response.data?.branchID//changes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          this.startRefreshTokenTimer();
          return response;

        }
        ));
  }
  logout() {
    // remove user from local storage and set current user to null
    const refreshtoken: any = this.userValue?.refreshToken;
    this.httpClient.post<any>(`${environment.baseWebApiUrl}authentication/revoke-token`, { token: refreshtoken })
      .subscribe();
    this.stopRefreshTokenTimer();
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
  }
  forgotPassword(userCode: string) {
    return this.httpClient.post(`${environment.baseWebApiUrl}authentication/forgot-password`, { userCode });
  }
  refreshToken(refreshtoken: string) {
    debugger
    return this.httpClient.post<any>(`${environment.baseWebApiUrl}/Authentication/refresh-token`, { token: refreshtoken })
      .pipe(map((response: ApiResponse) => {
        const user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return response;
      }));
  }
  private startRefreshTokenTimer() {
    debugger
    // parse json object from base64 encoded jwt token
    const user: any = this.userValue;
    const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
    const refreshtoken: string = user.refreshToken;
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken(refreshtoken).subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

}
