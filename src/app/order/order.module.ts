import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OrderComponent } from './order.component';
import { OrderdetailsComponent } from './orderdetails.component';
@NgModule({
  imports: [
    CommonModule,SharedModule,
    OrderRoutingModule
  ],
  declarations: [OrderComponent,OrderdetailsComponent
  ]
})
export class OrderModule { }
