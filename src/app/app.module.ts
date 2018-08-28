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
import { HttpModule } from '@angular/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [MaterialModule,SharedModule,   NgChatModule,    FormsModule,
    HttpModule,
    SocketIoModule.forRoot(config) ,
    BrowserModule, AppRouting, HttpClientModule,BrowserAnimationsModule,ToastrModule.forRoot()
  ],
  providers: [DataService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
