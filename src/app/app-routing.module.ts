import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app-layout/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { AdminComponent } from './app-layout/admin/admin.component';
import { ROUTES } from './shared-module/constants/routes-constant';

const routes: Routes = [
  { path: ROUTES.LOGIN, component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./pages/events/events.module').then(
            (m) => m.EventsModule
          ),
      },
    ],
  },
  // { path: '**', redirectTo: ROUTES.LOGIN, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
