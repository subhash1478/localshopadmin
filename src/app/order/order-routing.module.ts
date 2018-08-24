import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { OrderdetailsComponent } from './orderdetails.component';

const routes: Routes = [{
  path:'',component:OrderComponent,
    children: [
    {
      path: 'detail/:id',
      component: OrderdetailsComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
