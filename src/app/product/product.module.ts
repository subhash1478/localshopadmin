import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, SharedModule,
    ProductRoutingModule
  ],
  declarations: [ProductComponent]
})
export class ProductModule { }
