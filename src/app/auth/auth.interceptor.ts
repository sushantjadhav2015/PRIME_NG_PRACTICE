/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable, switchMap, take } from 'rxjs'

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  private static readonly TOKEN = ''

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('Request INterceptor');
    let modifiedRequest = request.clone({
      //headers: req.headers.append('auth', 'abc'),
      //params: req.params.append('hai', 'hello world'),
    });
    return next.handle(modifiedRequest);
  }

}
