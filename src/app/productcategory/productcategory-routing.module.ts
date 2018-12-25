import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductcategoryComponent } from './productcategory.component';

const routes: Routes = [{
  path: '', component: ProductcategoryComponent,
  children: [
  {
    path: 'category/:id',
    component: ProductcategoryComponent
  }
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductcategoryRoutingModule { }
