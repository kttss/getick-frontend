import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseMatSidenavHelperService } from '@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';

import { ChatService } from 'app/pages/chat/chat.service';
import { MessagesService } from 'app/services/messages.service';
import { UserService } from 'app/services/user.service';
import { TokenService } from 'app/services/token.service';
import { AlertService } from 'app/services/alert.service';
@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ChatsComponent implements OnInit, OnDestroy {
  chats: any[];
  chatSearch: any;
  contacts: any[] = [];
  searchText: string;
  user: any = { chatList: [] };
  messages: any[];

  users: any[];
  selectedContact: any;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _chatService: ChatService,
    private _fuseMatSidenavHelperService: FuseMatSidenavHelperService,
    public _mediaObserver: MediaObserver,
    private _userSercvice: UserService,
    private _alertService: AlertService
  ) {
    this.chatSearch = {
      name: ''
    };
    this.searchText = '';

    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    // this.user = this._chatService.user;

    this._chatService.messages.subscribe((data) => {
      //   this._alertService.success('<b>message :</b>' + data.content);
      this._chatService.addMessage(data);
      if (this.selectedContact === data.sender_id) {
        this.getChat(this.selectedContact);
      }

      const index = this.user.chatList.findIndex((e) => e.contactId === data.sender_id);
      if (index !== -1) {
        this.user.chatList[index].lastMessage = data.content;
        this.user.chatList[index].lastMessageTime = data.createdAt;
        this.user.chatList[index].unread = this.user.chatList[index].unread + 1;
      }

      const indexSender = this.user.chatList.findIndex((e) => e.contactId === this.selectedContact);
      if (indexSender !== -1) {
        this.user.chatList[indexSender].lastMessage = data.content;
        this.user.chatList[indexSender].lastMessageTime = data.createdAt;
        this.user.chatList[indexSender].unread = 0;
      }
    });

    this.chats = this._chatService.chats;
    this.contacts = this._chatService.contacts;
    this._chatService.onDataChanged.subscribe((r) => {
      console.log('changed');
      console.log(this._chatService.user);
      this.user = this._chatService.user;
      this.contacts = this._chatService.contacts;
      this.messages = this._chatService.listMessages;

      const messages: any[] = this.messages.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
      const contactIds = [];
      const chatList = [];
      const myId = this._chatService.connectedUser;
      messages.forEach((item) => {
        if (item.sender_id == myId && !contactIds.some((id) => id == item.receiver_id)) {
          contactIds.push(item.receiver_id);
        }
        if (item.receiver_id == myId && !contactIds.some((id) => id == item.sender_id)) {
          contactIds.push(item.sender_id);
        }
      });
      contactIds
        .filter((a) => a !== this._chatService.connectedUser)
        .forEach((id) => {
          const currentUser = this.contacts.find((usr) => usr.id == id);
          if (currentUser) {
            const msg = messages.find(
              (m) => (m.sender_id === id && m.receiver_id == myId) || (m.sender_id === myId && m.receiver_id == id)
            );
            chatList.push({
              lastMessage: msg.content,
              lastMessageTime: msg.createdAt,
              contactId: id,
              name: currentUser.firstname + ' ' + currentUser.lastname,
              unread: messages.filter((m) => m.sender_id !== myId && m.isSeen == false).length
            });
          }
        });
      this.user.chatList = chatList;
    });
    // forkJoin([this._userSercvice.getAllUsers(), this.messages.getAllMessages()]).subscribe((data: any) => {
    //   this.users = data[0];
    //   const messages: any[] = data[1].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
    //   const contactIds = [];
    //   const chatList = [];
    //   const myId = '60cf295f06ec2b19bbff61ea';
    //   messages.forEach((item) => {
    //     if (item.sender_id == myId && !contactIds.some((id) => id == item.receiver_id)) {
    //       contactIds.push(item.receiver_id);
    //     }
    //     if (item.receiver_id == myId && !contactIds.some((id) => id == item.sender_id)) {
    //       contactIds.push(item.sender_id);
    //     }
    //   });

    //   console.log('dd', contactIds);
    //   contactIds.forEach((id) => {
    //     const currentUser = this.users.find((usr) => usr.id == id);
    //     console.log(currentUser, id);
    //     const msg = messages.find((m) => (m.sender_id === id && m.receiver_id == myId) || (m.sender_id === myId && m.receiver_id == id));
    //     chatList.push({
    //       lastMessage: msg.content,
    //       lastMessageTime: msg.createdAt,
    //       contactId: id,
    //       name: currentUser.firstname + ' ' + currentUser.lastname,
    //       unread: 8
    //     });
    //   });
    //   this.user.chatList = chatList;

    //   console.log('sds', chatList);

    //   //       contactId: "5725a680b3249760ea21de52"
    //   // id: "1725a680b3249760ea21de52"
    //   // lastMessage: "I wanna ask you please!"
    //   // lastMessageTime: "2017-06-12T02:10:18.931Z"
    //   // name: "Alice Freeman"
    //   // unread: 1
    // });

    this._chatService.onChatsUpdated.pipe(takeUntil(this._unsubscribeAll)).subscribe((updatedChats) => {
      this.chats = updatedChats;
    });

    this._chatService.onUserUpdated.pipe(takeUntil(this._unsubscribeAll)).subscribe((updatedUser) => {
      this.user = updatedUser;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getChat(contact): void {
    this._chatService.getChat(contact);
    this.selectedContact = contact;
    console.log(this.user.chatList);
    this.user.chatList.forEach((element) => {
      if (element.contactId === contact) {
        element.unread = 0;
      }
    });

    // if (!this._mediaObserver.isActive('gt-md')) {
    //   this._fuseMatSidenavHelperService.getSidenav('app-chat-right-sidenav').toggle();
    // }
  }

  setUserStatus(status): void {
    this._chatService.setUserStatus(status);
  }

  changeLeftSidenavView(view): void {
    this._chatService.onLeftSidenavViewChanged.next(view);
  }

  logout(): void {
    console.log('logout triggered');
  }
}
