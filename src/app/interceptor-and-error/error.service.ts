import { Injectable, computed, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface ErrorMsg {
  hasError: boolean, 
  error: any,
  severity: string
}

@Injectable({
  providedIn: 'root'
})

export class ErrorService {

  private errorSubject: BehaviorSubject<ErrorMsg> = new BehaviorSubject<ErrorMsg>({ hasError: false, error: null, severity: 'error' });
  public error$: Observable<ErrorMsg> = this.errorSubject.asObservable();

  setErrorState(hasError: boolean, error: any, severity: string) {
    this.errorSubject.next({ hasError, error, severity });
  }
}
