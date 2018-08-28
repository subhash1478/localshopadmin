import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { ChatAdapter } from 'ng-chat';
import { SocketIOAdapter } from '../socketio-adapter'
import { Socket } from 'ngx-socket-io';
import { Http } from '@angular/http';
  
 
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
 
export class DashboardComponent implements OnInit {
  title = 'app';
  
  userId: string;
  username: string;

  public adapter: ChatAdapter;
 

   crud: string;
  user:any={}
  vendorList: any=[];
  category: any=[];
 

  constructor(private socket: Socket, private http: Http,
    
   public _services:DataService,public toastr: ToastrService, vcr: ViewContainerRef) {
    this.InitializeSocketListerners();  
   

  }
  public InitializeSocketListerners(): void
  {
    this.socket.on("generatedUserId", (userId) => {
      console.log('userId',userId);
      
      // Initializing the chat with the userId and the adapter with the socket instance
      this.adapter = new SocketIOAdapter(userId, this.socket, this.http);
      this.userId = userId;
    });
  }
  ngOnInit() {
    this._services.getVendor().subscribe((Response:any)=>{
      let result=Response.data
      this.vendorList=
      console.log(Response)

      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        this.socket.emit("join",element);

      }

    })

    this._services.getCategory().subscribe((Response:any)=>{
      this.category=Response.data
    })
  }

  addUser(){

    console.log(this.crud)
    this.user.type='vendor'

    this._services.addUser(this.user,this.crud).subscribe(( Response:any)=>{
      console.log(Response)
      if(Response.success==false){
        if(Response.message.message){
          this.toastr.error(Response.message.message, 'Alert!');

        }

        this.toastr.error(Response.message, 'Alert!');

      }else{
        this.user={}
        this.toastr.success(Response.message, 'Success!');
        this.ngOnInit()

      }


    })
  }
  edit(item){
    console.log(item)
    this.crud='edit'

    this.user=item
  }
  action(type){
    this.user={}
    console.log(type)
    this.crud=type
  }
}
