import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { ChatService } from 'app/pages/chat/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ChatComponent implements OnInit, OnDestroy {
  selectedChat: any;

  private _unsubscribeAll: Subject<any>;

  constructor(private _chatService: ChatService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._chatService.onChatSelected.pipe(takeUntil(this._unsubscribeAll)).subscribe((chatData) => {
      this.selectedChat = chatData;
    });
    this._chatService.connect();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
