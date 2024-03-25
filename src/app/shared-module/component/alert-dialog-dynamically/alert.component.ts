import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, computed } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SERVERITY } from '../../constants/app-constatnt';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AlertService } from './alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})

export class AlertComponent implements OnInit{
  severity = SERVERITY
  alertStyle?: string
  data: any
  msgFromService = {} as any

  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    public messageService: MessageService,
    public dialogService: DialogService,
    public alertService: AlertService
  ) {}

  ngOnInit (): void {
    this.data = this.alertService.getData();
    const mesg = computed(() => this.data())
    this.msgFromService = mesg()
    console.log('new-alrt componnet', mesg());
    this.success(this.msgFromService.msg)
  }

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
