import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
  import {AppRouting} from './app.routing'
import { AppComponent } from './app.component';
 import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
 import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
 import { ToastrModule } from 'ngx-toastr';
 import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
 import { PromoteComponent } from './promote/promote.component';
import { PostComponent } from './post/post.component';
import { NgxEditorModule } from 'ngx-editor'; 
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './auth-guard.service';
import { PostdetailsComponent } from './post/postdetails/postdetails.component';
import { PlacedataComponent } from './placedata/placedata.component';
 import { ProductcategoryComponent } from './productcategory/productcategory.component';
import { SearchPipe } from './search';
import { ProductComponent } from './product/product.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';

import { OrderComponent } from './order/order.component';
import { OrderdetailsComponent } from './order/orderdetails.component'
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
      HeaderComponent,
      FooterComponent,
        PromoteComponent,
    PostComponent,
    SearchPipe,
    PageNotFoundComponent,
   
    PostdetailsComponent,
   
    PlacedataComponent,
   
    ProductcategoryComponent,
   
    ProductComponent,
   
    
   
    OrderComponent,
   
    OrderdetailsComponent,
   ],
  imports: [SelectDropDownModule,MaterialModule,SharedModule,  
    BrowserModule,NgxEditorModule, AppRouting, HttpClientModule,BrowserAnimationsModule,ToastrModule.forRoot()
  ],
  providers: [DataService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
