import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { primeNG } from './primeNG-modules/primeNG';
import { AlertComponent } from './component/alert/alert.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { PlaceholderDirective } from './directive/placeholder.directive';

const component = [AlertComponent, SpinnerComponent, PlaceholderDirective];
@NgModule({
  declarations: [...component],
  imports: [...primeNG],
  exports: [...primeNG, ...component],
})
export class SharedModuleModule {}
