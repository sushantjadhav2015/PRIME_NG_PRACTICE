import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { VenueComponent } from './venue/venue.component';
import { SharedModuleModule } from '../../shared-module/shared-module.module';


@NgModule({
  declarations: [
    VenueComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModuleModule
  ]
})
export class EventsModule { }
