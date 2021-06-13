import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { ChatService } from 'app/pages/chat/chat.service';
@Component({
  selector: 'app-chat-left-sidenav',
  templateUrl: './chat-left-sidenav.component.html',
  styleUrls: ['./chat-left-sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ChatLeftSidenavComponent implements OnInit, OnDestroy {
  view: string;
  private _unsubscribeAll: Subject<any>;

  constructor(private _chatService: ChatService) {
    this.view = 'chats';
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._chatService.onLeftSidenavViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe((view) => {
      this.view = view;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
