import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  providers:[MessageService]
})
export class ToastComponent implements OnChanges{

  @Input() _severity!: string;
  @Input() _details!: string
  
  constructor(private messageService: MessageService){}
  ngOnChanges(): void {
    this.messageService.add({
      sticky: true,
      severity: this._severity,
      summary: 'Success',
      detail: this._details,
    });
  }
}
