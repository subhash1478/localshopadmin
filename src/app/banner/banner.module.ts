import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerRoutingModule } from './banner-routing.module';
import { BannerComponent } from './banner.component';
import { SharedModule } from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [SharedModule,
    CommonModule, FormsModule,
    ReactiveFormsModule,
    BannerRoutingModule
  ],
  declarations: [BannerComponent]
})
export class BannerModule { }
