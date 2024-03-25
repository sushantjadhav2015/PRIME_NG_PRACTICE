import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { AlertComponent } from '../../../shared-module/component/alert-dialog-dynamically/alert.component';
import { AlertService } from '../../../shared-module/component/alert-dialog-dynamically/alert.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../shared-module/services/auth-service.service';
// import { GlobalErrorHandler } from '../../../interceptor-and-error/global-error-handler.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  // providers: [GlobalErrorHandler],
})
export class DashboardComponent implements OnInit {
  @ViewChild(AlertComponent) alert!: AlertComponent;
  private opened = false;
  ref: DynamicDialogRef | undefined;
  authservice = inject(AuthService);

  constructor(
    public alertService: AlertService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {}

  // TODO this code is for add error dialog dynamically
  /**
   *  here the error mesage will pass dynamiccaly in alert service that alert service has one method openDialog
   *by using this method we will open dilog and pass data in that dilog using signals (alert diloag added dynamically)
   */
  openDialog(): void {
    // this.alertService.openDialog('Here the dashboard error', 22);
    this.authservice.login('sushant@gmail.com', '12345').subscribe({
      next: (res) => {
        console.log('data in dashboard', res);
      },
    });
  }
}
