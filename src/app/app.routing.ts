import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component'


 import { PromoteComponent } from './promote/promote.component';
import { PostComponent } from './post/post.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './auth-guard.service';
 import { PostdetailsComponent } from './post/postdetails/postdetails.component';
import { PlacedataComponent } from './placedata/placedata.component';
import { ProductcategoryComponent } from './productcategory/productcategory.component';
import { ProductComponent } from './product/product.component';

import { OrderComponent } from './order/order.component';
import { OrderdetailsComponent } from './order/orderdetails.component';
  
 const appRoutes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
     canActivate: [AuthGuardService]

  },
  {
    path: 'driver', 
    loadChildren: './driver/driver.module#DriverModule',

    
    canActivate: [AuthGuardService]
  },
  {
    path: 'category', 
    
    loadChildren: './category/category.module#CategoryModule',

    canActivate: [AuthGuardService]
  },
  {
    path: 'promote', component: PromoteComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'product-category', component: ProductcategoryComponent, canActivate: [AuthGuardService],
    children: [
      {
        path: 'category/:id',

        component: ProductcategoryComponent
      }
    ]
  },
  
  {
    path: 'product/:id', component: ProductComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'post', component: PostComponent,
    children: [
      {
        path: 'category/:id',

        component: PostComponent
      }
    ]
  },
  
  {
    path: 'placeapi', component: PlacedataComponent, canActivate: [AuthGuardService]
  },

  {
    path: 'order', component: OrderComponent, canActivate: [AuthGuardService],
     children: [
 
      {
        path: 'detail/:id',

        component: OrderdetailsComponent
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRouting { }
