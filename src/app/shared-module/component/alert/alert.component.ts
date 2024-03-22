import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ALERT_TYPE } from '../../constants/app-constatnt';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  providers:[MessageService]
})
export class AlertComponent {
  severity = ALERT_TYPE
  alertStyle?: string

  constructor (
    public messageService: MessageService
  ) { }

  ngOnInit (): void {
  }

  // showAlert (alertType: string, alertMessage: string, alertTitle?: string, alertStyle?: string): any {
  //   this.alertStyle = alertStyle

  //   console.log(this.alertStyle)
  //   switch (alertType) {
  //     case 'success':
  //       this.success(alertMessage, alertTitle)
  //       break
  //     case 'error':
  //       this.error(alertMessage, alertTitle)
  //       break
  //     case 'info':
  //       this.info(alertMessage, alertTitle)
  //       break
  //     case 'warn':
  //       this.warn(alertMessage, alertTitle)
  //   }
  // }

  success (message: string, title?: string): any {
    this.show(this.severity.SUCCESS, message, title)
  }

  error (message: string, title?: string): any {
    this.show(this.severity.ERROR, message, title)
  }

  info (message: string, title?: string): any {
    this.show(this.severity.INFO, message, title)
  }

  warn (message: string, title?: string): any {
    this.show(this.severity.WARN, message, title)
  }

  show (type: string, message: any, title?: string): any {
    if (!type) {
      type = this.severity.ERROR
    }

    if (!message) {
      return
    }

    const alertOptions: any = {
      severity: type,
      summary: type,
      detail: message
    }
    this.clear()
    this.messageService.add(alertOptions)
  }

  clear (): any {
      this.messageService.clear()
  }
}
