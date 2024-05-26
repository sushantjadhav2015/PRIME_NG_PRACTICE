import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { VenueComponent } from './venue/venue.component';
import { SharedModuleModule } from '../../shared-module/shared-module.module';
import { SignalComponent } from './signal/signal.component';


@NgModule({
  declarations: [
    VenueComponent,
    SignalComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModuleModule
  ]
})
export class EventsModule { }
