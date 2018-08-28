import { Component } from '@angular/core';
import { ChatAdapter } from 'ng-chat';
import { SocketIOAdapter } from './socketio-adapter'
import { Socket } from 'ngx-socket-io';
import { Http } from '@angular/http';
import { DataService } from './data.service';
 
(window as any).global = window;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  userId: string;
  username: string;

  public adapter: ChatAdapter;

  constructor(private socket: Socket, private http: Http,
  public _services:DataService
  ) {
    this.InitializeSocketListerners();  
    this.socket.emit("join",'admin');
  
    


    this._services.getVendor().subscribe((Response:any)=>{
       console.log(Response)
    })


  }

  

  public InitializeSocketListerners(): void
  {
    this.socket.on("generatedUserId", (userId) => {
      // Initializing the chat with the userId and the adapter with the socket instance
      this.adapter = new SocketIOAdapter(userId, this.socket, this.http);
      this.userId = userId;
    });
  }
}