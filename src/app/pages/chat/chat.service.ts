import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';
//import { Socket } from 'ngx-socket-io';
//import { map } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { environment } from 'environments/environment';
import { TokenService } from 'app/services/token.service';
import { UploadService } from 'app/services/upload.service';

@Injectable()
export class ChatService implements Resolve<any> {
  contacts: any[] = [];
  chats: any[];
  user: any = {};
  onChatSelected: BehaviorSubject<any>;
  onContactSelected: BehaviorSubject<any>;
  onChatsUpdated: Subject<any>;
  onUserUpdated: Subject<any>;
  onLeftSidenavViewChanged: Subject<any>;
  onRightSidenavViewChanged: Subject<any>;
  onDataChanged: Subject<any> = new Subject<any>();
  socket: any;
  messages: Subject<any> = new Subject<any>();
  listMessages: any[];
  connectedUser: any;

  constructor(private _httpClient: HttpClient, private _tokenService: TokenService, private _uploadservice: UploadService) {
    this.connectedUser = this._tokenService.getUser().id;
    // Set the defaults
    this.onChatSelected = new BehaviorSubject(null);
    this.onContactSelected = new BehaviorSubject(null);
    this.onChatsUpdated = new Subject();
    this.onUserUpdated = new Subject();
    this.onLeftSidenavViewChanged = new Subject();
    this.onRightSidenavViewChanged = new Subject();
    Promise.all([this.getContacts(), this.getChats(), this.getUser(), this.getMessages()]).then(([contacts, chats, user, messages]) => {
      const userItem = contacts.find((e) => e.id === this.connectedUser);
      this.contacts = contacts;
      this.chats = chats;

      this.user = { ...userItem, chatList: [] };

      console.log('dddd', userItem, this.user);
      this.listMessages = messages.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
      this.onDataChanged.next();
    });
  }

  connect() {
    this.socket = io(environment.api_url);

    this.socket.on('message', (data) => {
      this.messages.next(data);
    });
  }
  sendMsg(msg) {
    this.socket.emit('message', msg);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([this.getContacts(), this.getChats(), this.getUser()]).then(([contacts, chats, user]) => {
        console.log(user);
        this.contacts = contacts;
        this.chats = chats;
        this.user = user;
        resolve;
      }, reject);
    });
  }

  getChat(contactId) {
    // const chatItem = this.user.chatList.find((item) => {
    //   return item.contactId === contactId;
    // });

    // // Create new chat, if it's not created yet.
    // if (!chatItem) {
    //   this.createNewChat(contactId).then((newChats) => {
    //     this.getChat(contactId);
    //   });
    //   return;
    // }

    const data = this.listMessages.filter(
      (m) =>
        (m.sender_id === contactId && m.receiver_id == this.connectedUser) ||
        (m.sender_id === this.connectedUser && m.receiver_id == contactId)
    );
    const dialog = data
      .map((d) => {
        return {
          who: d.sender_id,
          message: d.content,
          time: d.createdAt
        };
      })
      .sort((a, b) => (a.time > b.time ? 1 : -1));

    const chatContact = this.contacts.find((contact) => {
      return contact.id === contactId;
    });

    const chatData = {
      chatId: contactId,
      dialog: dialog,
      contact: chatContact
    };

    this.onChatSelected.next({ ...chatData });
    // {
    //   id: '1725a680b3249760ea21de52',
    //   dialog: [
    //     {
    //       who: '5725a680b3249760ea21de52',
    //       message: 'Hello',
    //       time: '2017-03-22T08:54:28.299Z'
    //     },

    //   ]
    // },

    // return new Promise((resolve, reject) => {
    //   this._httpClient.get('api/chat-chats/' + chatItem.id).subscribe((response: any) => {
    //     const chat = response;

    //     const chatContact = this.contacts.find((contact) => {
    //       return contact.id === contactId;
    //     });

    //     const chatData = {
    //       chatId: chat.id,
    //       dialog: chat.dialog,
    //       contact: chatContact
    //     };

    //     this.onChatSelected.next({ ...chatData });
    //   }, reject);
    // });
  }

  addMessage(msg) {
    this.listMessages.push(msg);
  }

  createNewChat(contactId): Promise<any> {
    return new Promise((resolve, reject) => {
      const contact = this.contacts.find((item) => {
        return item.id === contactId;
      });

      const chatId = FuseUtils.generateGUID();

      const chat = {
        id: chatId,
        dialog: []
      };

      const chatListItem = {
        contactId: contactId,
        id: chatId,
        lastMessageTime: '2017-02-18T10:30:18.931Z',
        name: contact.name,
        unread: null
      };

      // Add new chat list item to the user's chat list
      this.user.chatList.push(chatListItem);

      // Post the created chat
      this._httpClient.post('api/chat-chats', { ...chat }).subscribe((response: any) => {
        // Post the new the user data
        this._httpClient.post('api/chat-user/' + this.user.id, this.user).subscribe((newUserData) => {
          // Update the user data from server
          this.getUser().then((updatedUser) => {
            this.onUserUpdated.next(updatedUser);
            resolve(updatedUser);
          });
        });
      }, reject);
    });
  }

  selectContact(contact): void {
    this.onContactSelected.next(contact);
  }

  setUserStatus(status): void {
    this.user.status = status;
  }

  updateUserData(userData): void {
    this._httpClient.post('api/chat-user/' + this.user.id, userData).subscribe((response: any) => {
      this.user = userData;
    });
  }

  updateDialog(chatId, dialog): Promise<any> {
    return new Promise((resolve, reject) => {
      const newData = {
        id: chatId,
        dialog: dialog
      };

      this._httpClient.post('api/chat-chats/' + chatId, newData).subscribe((updatedChat) => {
        resolve(updatedChat);
      }, reject);
    });
  }

  getContacts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(environment.api_url + 'user').subscribe((response: any) => {
        const listContacts = response.map((e) => {
          return {
            avatar: e.photo ? this._uploadservice.getUrl(e.photo) : '',
            id: e.id,
            mood: '',
            name: e.lastname + ' ' + e.firstname,
            status: 'offline'
          };
        });
        resolve(listContacts);
      }, reject);
    });
  }

  getChats(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/chat-chats').subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }

  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/chat-user').subscribe((response: any) => {
        resolve(response[0]);
      }, reject);
    });
  }

  getMessages(): Promise<any> {
    //
    return new Promise((resolve, reject) => {
      this._httpClient.get(environment.api_url + 'chat/getMessages').subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }
}
