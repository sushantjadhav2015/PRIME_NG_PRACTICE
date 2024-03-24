import { Injectable, computed, signal } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AlertComponent } from './alert.component';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private opened = false;

  ref: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService
  ) {}

  openDialog(message: string, sts?: number): void {
    const messageData = {
      msg: message, 
      status: sts 
    }
    this.setData(messageData)

    if (!this.opened) {
      this.opened = true;
      this.ref = this.dialogService.open(AlertComponent, {
        header: 'Select a Product',
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: messageData,
      });

      this.ref.onClose.subscribe((product: any) => {
        this.opened = false;
        // if (product) {
        //     this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
        // }
      });
    }
  }


  private data = signal('');

  message = computed(() => this.data());

  setData(update: any) {
    this.data.set(update);
  }

  getData(){
    console.log('data of singnal in service :--', this.message());
    return this.data;
  }
}
