import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { primeNG } from './primeNG-modules/primeNG';
import { AlertComponent } from './component/alert-dialog-dynamically/alert.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { PlaceholderDirective } from './directive/placeholder.directive';
import { AlertService } from './component/alert-dialog-dynamically/alert.service';
import { MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogRef,
  DynamicDialogConfig,
} from 'primeng/dynamicdialog';

const component = [SpinnerComponent, PlaceholderDirective];
@NgModule({
  declarations: [...component],
  imports: [...primeNG],
  exports: [...primeNG, ...component],
  providers: [
    DialogService,
    MessageService,
    DynamicDialogRef,
    DynamicDialogConfig,
    AlertService,
  ],
})
export class SharedModuleModule {}
