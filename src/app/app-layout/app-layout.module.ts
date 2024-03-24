import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AlertComponent } from '../shared-module/component/alert/alert.component';

@NgModule({
  declarations: [
    LoginComponent, 
    HomeComponent, 
    AdminComponent, 
    SideNavComponent,
    AlertComponent
  ],
  imports: [
    SharedModuleModule,
    GoogleSigninButtonModule
  ],
})
export class AppLayoutModule {}
