import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { primeNG } from './primeNG-modules/primeNG';

@NgModule({
  declarations: [],
  imports: [...primeNG],
  exports: [...primeNG],
})
export class SharedModuleModule {}
