/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { GlobalErrorHandler } from './global-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class CommonApicallService {
  constructor(
    private readonly http: HttpClient,
    private readonly globalErrorHandler: GlobalErrorHandler
  ) {}

  get(path: any, params?: any): Observable<any> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    return this.http.get<any>(path, { params: httpParams }).pipe(
      map((rep) => {
        this.errorHandler(rep);
        return rep;
      })
    );
  }

  patch(path: any, body: any): Observable<any> {
    return this.http.patch<any>(path, body).pipe(
      catchError((err: any): any => {
        this.errorHandler(err);
        return throwError(() => null);
      })
    );
  }

  put(path: any, body: any): Observable<any> {
    return this.http.put<any>(path, body).pipe(
      catchError((err: any): any => {
        this.errorHandler(err);
        return throwError(() => null);
      })
    );
  }

  post(path: any, body?: any): Observable<any> {
    return this.http.post<any>(path, body).pipe(
      catchError((err: any): any => {
        this.errorHandler(err);
        return throwError(() => null);
      })
    );
  }

  delete(path: string): Observable<any> {
    return this.http.delete(path).pipe(
      catchError((err: any): any => {
        this.errorHandler(err);
        return throwError(() => null);
      })
    );
  }

  errorHandler(response: any): void {
    this.globalErrorHandler.handleError(response);
  }
}
