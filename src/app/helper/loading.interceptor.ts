import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoadingServicceService } from '../services/loading-servicce.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  constructor(
    private loadingService: LoadingServicceService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.totalRequests++;
    this.loadingService.startLoading();
    return next.handle(request).pipe(
      tap(res => {
        if (res instanceof HttpResponse) {
          this.decreaseRequests();
        }
      }),
      catchError(err => {
        this.decreaseRequests();
        throw err;
      }),
    );
  }
  private decreaseRequests() {
    this.totalRequests--;
    if (this.totalRequests === 0) {
      this.loadingService.stopLoading();
    }
  }
}
