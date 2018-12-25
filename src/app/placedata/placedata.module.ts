import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlacedataRoutingModule } from './placedata-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PlacedataComponent } from './placedata.component';
@NgModule({
  imports: [
    CommonModule, SharedModule,
    PlacedataRoutingModule
  ],
  declarations: [PlacedataComponent]
})
export class PlacedataModule { }
