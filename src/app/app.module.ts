import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRouting} from './app.routing'
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './auth-guard.service'; 
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { NgChatModule } from 'ng-chat';
import { FormsModule } from '@angular/forms'; 

 
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [MaterialModule,SharedModule,   NgChatModule,   
    
    BrowserModule, AppRouting, HttpClientModule,BrowserAnimationsModule,ToastrModule.forRoot()
  ],
  providers: [DataService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
