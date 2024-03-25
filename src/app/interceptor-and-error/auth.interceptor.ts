/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable, NgZone } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, take, throwError } from 'rxjs';
import { ErrorService } from './error.service';
import { SERVERITY } from '../shared-module/constants/app-constatnt';
import { ERROR_MSG } from '../shared-module/constants/error-constant';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService, private zone: NgZone) {}
  private static readonly TOKEN = '';

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Request INterceptor');
    let modifiedRequest = request.clone({
      //headers: req.headers.append('auth', 'abc'),
      //params: req.params.append('hai', 'hello world'),
    });

    return next.handle(modifiedRequest);
  }

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   console.log('Request INterceptor');
  //   let modifiedRequest = request.clone({
  //     //headers: req.headers.append('auth', 'abc'),
  //     //params: req.params.append('hai', 'hello world'),
  //   });

  //   return next.handle(modifiedRequest).pipe(
  //     catchError((error: any) => {
  //       this.handleError(error);
  //       return throwError(() => error);
  //     })
  //   );
  // }

  // /**
  //  *
  //  * @param errorRes - This will come from any API
  //  */
  // handleError(errorRes: HttpErrorResponse): void {
  //   this.zone.run(() => {
  //     let errorMessage = 'An Error Occurred';

  //     if (errorRes.status === 0 && errorRes.statusText === 'Unknown Error') {
  //       errorMessage = 'Network Error: Please check your internet connection';
  //       this.errorService.setErrorState(true, errorMessage, SERVERITY.ERROR);
  //     }else if (errorRes.error && errorRes.error.error && errorRes.error.error.message) {
  //       errorMessage = ERROR_MSG
  //       errorMessage = errorMessage[errorRes.error.error.message] || errorRes.error.error.message;
  //       this.errorService.setErrorState(true, errorMessage, SERVERITY.ERROR);
  //       // this.alertService.openDialog(errorMessage);
  //     }
  //   });
  // }
}
