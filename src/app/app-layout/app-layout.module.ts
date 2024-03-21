import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { LayoutRoutingModule } from './app-layout-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedModuleModule, LayoutRoutingModule],
})
export class AppLayoutModule {}
