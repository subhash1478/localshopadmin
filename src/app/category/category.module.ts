import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';

import { SharedModule } from '../shared/shared.module';
 
@NgModule({
  imports: [
    CommonModule,  SharedModule, 
    CategoryRoutingModule
  ],
  declarations: [CategoryComponent]
})
export class CategoryModule { }
