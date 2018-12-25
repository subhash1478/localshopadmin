import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { SharedModule } from '../shared/shared.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://139.59.12.86:3001', options: {} };
@NgModule({
  imports: [SharedModule,
    CommonModule,
    ChatRoutingModule   , SocketIoModule.forRoot(config)

  ],
  declarations: [ChatComponent]
})
export class ChatModule { }
