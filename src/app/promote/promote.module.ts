import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromoteRoutingModule } from './promote-routing.module';
import { PromoteComponent } from './promote.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,SharedModule,
    PromoteRoutingModule
  ],
  declarations: [PromoteComponent]
})
export class PromoteModule { }
