import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from '../../../shared-module/component/alert/alert.component';
import { AlertService } from '../../../shared-module/component/alert/alert.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit{
  @ViewChild(AlertComponent) alert!: AlertComponent
  private opened = false;
  ref: DynamicDialogRef | undefined;

  constructor(
    public alertService: AlertService,
    public dialogService: DialogService,
    public messageService: MessageService
    ){}

  ngOnInit(): void {
    setTimeout(() => {
      // this.alert.error('message is comming from the dashboard')
      this.alertService.openDialog('Here the dashboard error', 22)
    }, 5000);
  }

  openDialog(): void {
    // this.alertService.openDialog('Here the dashboard error', 22)
    this.alert.error('message is comming from the dashboard')
    }
  }
