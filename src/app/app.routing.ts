import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {    path: 'login',    loadChildren: './login/login.module#LoginModule'  },
  {    path: 'dashboard',    loadChildren: './dashboard/dashboard.module#DashboardModule'  },
  {    path: 'driver',     loadChildren: './driver/driver.module#DriverModule'  },
  {    path: 'category',   loadChildren: './category/category.module#CategoryModule'  },
  {    path: 'order',    loadChildren: './order/order.module#OrderModule',    // ,
},
{    path: 'promote',  loadChildren: './promote/promote.module#PromoteModule' },
{    path: 'product-category', loadChildren: './productcategory/productcategory.module#ProductcategoryModule' ,
},
{    path: 'product/:id', loadChildren: './product/product.module#ProductModule' ,   },
{    path: 'post', loadChildren: './post/post.module#PostModule' ,
},
{    path: 'placeapi', loadChildren: './placedata/placedata.module#PlacedataModule' ,    },
{    path: 'banner', loadChildren: './banner/banner.module#BannerModule' ,    },
// {    path: 'chat', loadChildren: './chat/chat.module#ChatModule' ,    },
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
