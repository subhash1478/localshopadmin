import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerRoutingModule } from './banner-routing.module';
import { BannerComponent } from './banner.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule,
    CommonModule,
    BannerRoutingModule
  ],
  declarations: [BannerComponent]
})
export class BannerModule { }
