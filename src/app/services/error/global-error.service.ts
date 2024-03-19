import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorService implements ErrorHandler{
 
  constructor(
    private injector: Injector,private routes:Router
  ) { }
  handleError(errorResponse: any): void {
    const toastrService = this.injector.get(ToastrService);
    if (errorResponse.status === 401) {
      this.routes.navigate(['/auth'], {queryParams: { returnUrl: this.routes.url }});
       toastrService.error('Unauthorised !', 'Please login again!');
    } else if (errorResponse.status === 400) {
      // alert(this.formatErrors(errorResponse.error.Errors));
       toastrService.error('Error !', `${errorResponse.error.Errors} !`);
       console.error(errorResponse.error.Errors)
    } else if (errorResponse.status === 500) {
      // alert(this.formatErrors(errorResponse.error.Errors));
       toastrService.error('Error ! Staus :500', `${errorResponse.error.Message} !`);
       console.error(errorResponse.error.Errors)
    }
    else {
      // All other errors including 500
      const error = errorResponse && errorResponse.rejection ? errorResponse.rejection.error : errorResponse;
 
    //  toastrService.error(error.message);
    console.error(error.message)
      // this.toastrService.error('Error !',`${error.message}`);
      // IMPORTANT: Don't Rethrow the error otherwise it will not emit errors after once
      // https://stackoverflow.com/questions/44356040/angular-global-error-handler-working-only-once
      // throw errorResponse;
    }
  }
  private formatErrors(errors: any) {
    return errors ? errors.map((err: any) => err.PropertyName + ' : ' + err.ErrorMessage).join('<br>') : '';
  }
}