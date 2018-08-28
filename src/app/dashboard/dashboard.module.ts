import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { HttpModule } from '@angular/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NgChatModule } from 'ng-chat';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
@NgModule({
  imports: [
    CommonModule,SharedModule, SocketIoModule.forRoot(config) , NgChatModule,
    DashboardRoutingModule,HttpModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
