import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { ChatService } from 'app/pages/chat/chat.service';

@Component({
  selector: 'app-chat-right-sidenav',
  templateUrl: './chat-right-sidenav.component.html',
  styleUrls: ['./chat-right-sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ChatRightSidenavComponent implements OnInit, OnDestroy {
  view: string;

  private _unsubscribeAll: Subject<any>;

  constructor(private _chatService: ChatService) {
    // Set the defaults
    this.view = 'contact';

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._chatService.onRightSidenavViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe((view) => {
      this.view = view;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
