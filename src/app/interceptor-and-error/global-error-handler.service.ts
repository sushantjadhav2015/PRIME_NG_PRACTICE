import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, throwError } from 'rxjs';
import { AlertService } from '../shared-module/component/alert-dialog-dynamically/alert.service';
import { ErrorService } from './error.service';
import { SERVERITY } from '../shared-module/constants/app-constatnt';
import { ERROR_MSG } from '../shared-module/constants/error-constant';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private zone: NgZone, public errorService: ErrorService) {}

  handleError(errorRes: HttpErrorResponse): void {
    let errorMessage = 'An Error Occurred';

    if (errorRes.status === 0 && errorRes.statusText === 'Unknown Error') {
      errorMessage = 'Network Error: Please check your internet connection';
      this.errorService.setErrorState(true, errorMessage, SERVERITY.ERROR);
    } else if (errorRes.error && errorRes.error.error && errorRes.error.error.message) {
      errorMessage = ERROR_MSG;
      errorMessage = errorMessage[errorRes.error.error.message] || errorRes.error.error.message;
      this.errorService.setErrorState(true, errorMessage, SERVERITY.ERROR);
      // this.alertService.openDialog(errorMessage);
    }
  }
}
