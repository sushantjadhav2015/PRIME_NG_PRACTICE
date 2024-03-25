import {
  Component,
  OnInit,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { ErrorService } from './interceptor-and-error/error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  private errorHandler: ErrorHandler;

  constructor(private errorService: ErrorService, private messageService: MessageService) {
    this.errorHandler = new ErrorHandler(errorService, messageService);
  }

  ngOnInit(): void {
    this.errorHandler.subscribeToErrors();
  }

  ngOnDestroy(): void {
    this.errorHandler.unsubscribeFromErrors();
  }
}

// TODO this code is for show toast globaly -- START
export class ErrorHandler {
  private errorSubscription!: Subscription;
  constructor(private errorService: ErrorService, private messageService: MessageService) {}

  subscribeToErrors(): void {
    this.errorSubscription = this.errorService.error$.subscribe(({ hasError, error, severity }) => {
      if (hasError) {
        this.triggerMethod(error, severity);
      }
    });
  }

  triggerMethod(error: string, severity: string): void {
    this.messageService.add({
      sticky: true,
      severity: severity,
      summary: severity.toUpperCase(),
      detail: error,
    });
  }

  unsubscribeFromErrors(): void {
    this.errorSubscription.unsubscribe();
  }
}
// TODO this code is for show toast globaly -- END

