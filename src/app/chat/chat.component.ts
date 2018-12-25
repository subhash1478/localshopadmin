import { Component, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { DataService } from '../data.service';
import { Subscription, Observable } from 'rxjs';
(window as any).global = window;

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  itemsSubscription: Subscription;
  chatHistoryListing: any;
  msgList: any = [];


  editorMsg = '';
  showEmojiPicker = false;
  userList: any = [];
  User: any = {};
  remoteuser: any = [];
  vendorList: any = [];

  constructor(private socket: Socket, public service: DataService) {  // Get the navParams toUserId parameter

    const config: SocketIoConfig = {
      url: 'http://139.59.12.86:3001', options: {
        query: 'userid=' + this.User._id + '&sessionid=' + localStorage.getItem('token') + '&chatToken=' + localStorage.getItem('token')
      }
    };

    this.editorMsg = 'Hi ';


    this.User = JSON.parse(localStorage.getItem('userdetails'));






    this.itemsSubscription = this.getMessages().subscribe(message => {
      this.msgList.push(message);
    });


  }




  getMessages() {
    const observable = new Observable(observer => {
      this.socket.on('chatReciveRemoteuser', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
  ngOnInit() {
    this.getUser();

    setTimeout(() => {
      const data = {
        remoteuserid: this.User._id,
        username: 'chatuser_name',
        userid: this.remoteuser._id,
        chat: 'Welcome to baharampur one touch ',
        type: 'text',
        attachment: '',
        progress: 0,
        socketid: '',
        time: Date(),
        jsonWebToken: localStorage.getItem('token'),
        sender_seen: 'yes',
        receiver_seen: 'no',
        randomid: Math.random(),
        senderImage: this.User.profile_image
      };
      this.msgList.push(data);

    }, 3000);

  }

  ionViewWillLeave() {


    // unsubscribe
  }

  ionViewDidEnter() {

    // get message list

    // Subscribe to received  new message events
  }

  onFocus() {

  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
    } else {
    }

  }

  /**
  * @name getMsg
  * @returns {Promise<ChatMessage[]>}
  */
  getMsg(item) {
    this.msgList = [];
    const obj = {
      page: 1,
      remoteuserid: item._id
    };
    this.remoteuser = item._id;
    const data = {
      remoteuserid: item._id,
      userid: this.User._id
    };
    this.socket.emit('peerConnectRequest', data);


    this.service.getChatHistory(obj).subscribe((response: any) => {
      const chatHistory = [];
      const senderImage = '';
      if (response.success) {
        // load chat
        for (let i = 0; i < response.Chats.length; i++) {


          // tslint:disable-next-line:no-shadowed-variable
          const obj = {
            chatid: response.Chats[i]._id,
            remoteuserid: response.Chats[i].remoteUserId,
            userid: response.Chats[i].userId,
            chat: response.Chats[i].chatText,
            attachment: response.Chats[i].attachment,
            size: response.Chats[i].size,
            filename: response.Chats[i].chatFileName,
            type: 'text',
            progressshow: 0,
            time: response.Chats[i].chatDate,
            randomid: response.Chats[i].randomid,
            receiver_seen: response.Chats[i].receiver_seen,
            senderImage: senderImage,
            chatDate: response.Chats[i].chatDate


          };

          this.msgList.push(obj);

        }
      }

    }, (Error) => {
    });



  }

  /**
  * @name sendMsg
  */
  sendMsg() {
    if (!this.editorMsg.trim()) { return; }



    const data = {
      remoteuserid: this.remoteuser,
      username: 'chatuser_name',
      userid: this.User._id,
      chat: this.editorMsg,
      type: 'text',
      attachment: '',
      progress: 0,
      socketid: '',
      time: Date(),
      jsonWebToken: localStorage.getItem('token'),
      sender_seen: 'yes',
      receiver_seen: 'no',
      randomid: Math.random(),
      senderImage: this.User.profile_image
    };
    this.socket.emit('sendchat', data);
    this.editorMsg = '';
    this.msgList.push(data);
  }


  // pushNewMsg(msg:any) {
  //   const userId = this.user.id,
  //   toUserId = this.toUser.id;
  //   // Verify user relationships
  //   if (msg.userId === userId && msg.toUserId === toUserId) {
  //     this.msgList.push(msg);
  //   } else if (msg.toUserId === userId && msg.userId === toUserId) {
  //     this.msgList.push(msg);
  //   }
  //   this.scrollToBottom();
  // }

  getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.messageId === id);
  }


  getUser() {
    this.service.getVendor().subscribe((Response: any) => {



      const result = Response.data;
      result.sort((a, b): any => {
        const date1 = new Date(a.createdAt);
        const date2 = new Date(b.createdAt);
        return date2.getTime() - date1.getTime();

      });



      this.vendorList = result;

      for (let index = 0; index < result.length; index++) {
        const element = result[index];


      }

    });
  }

}
