import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VenueComponent } from './venue/venue.component';
import { SignalComponent } from './signal/signal.component';
import { ROUTES } from '../../shared-module/constants/routes-constant';

const routes: Routes = [
  { path: '', component: VenueComponent },
  {
    path: 'signal',
    component: SignalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
