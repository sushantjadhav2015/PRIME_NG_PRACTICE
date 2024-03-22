import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { LayoutRoutingModule } from './app-layout-routing.module';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, 
    SharedModuleModule, 
    LayoutRoutingModule,
    GoogleSigninButtonModule 
  ]
})
export class AppLayoutModule {}
