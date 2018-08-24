import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductcategoryRoutingModule } from './productcategory-routing.module';
import { ProductcategoryComponent } from './productcategory.component';
import { SharedModule } from '../shared/shared.module';
 @NgModule({
  imports: [
    CommonModule,SharedModule,
    ProductcategoryRoutingModule
  ],
  declarations: [ProductcategoryComponent]
})
export class ProductcategoryModule { }
