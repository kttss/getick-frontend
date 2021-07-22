import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';

import { ChatService } from 'app/pages/chat/chat.service';
import { MessagesService } from 'app/services/messages.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatViewComponent implements OnInit, OnDestroy, AfterViewInit {
  user: any;
  chat: any;
  dialog: any;
  contact: any;
  replyInput: any;
  selectedChat: any;

  @ViewChild(FusePerfectScrollbarDirective)
  directiveScroll: FusePerfectScrollbarDirective;

  @ViewChildren('replyInput')
  replyInputField;

  @ViewChild('replyForm')
  replyForm: NgForm;

  private _unsubscribeAll: Subject<any>;

  constructor(private _chatService: ChatService, private messageService: MessagesService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.user = this._chatService.user;
    this._chatService.onChatSelected.pipe(takeUntil(this._unsubscribeAll)).subscribe((chatData) => {
      if (chatData) {
        this.selectedChat = chatData;
        this.contact = chatData.contact;
        this.dialog = chatData.dialog;
        this.readyToReply();
      }
    });
  }

  ngAfterViewInit(): void {
    this.replyInput = this.replyInputField.first.nativeElement;
    this.readyToReply();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  shouldShowContactAvatar(message, i): boolean {
    return message.who === this.contact.id && ((this.dialog[i + 1] && this.dialog[i + 1].who !== this.contact.id) || !this.dialog[i + 1]);
  }

  isFirstMessageOfGroup(message, i): boolean {
    return i === 0 || (this.dialog[i - 1] && this.dialog[i - 1].who !== message.who);
  }

  isLastMessageOfGroup(message, i): boolean {
    return i === this.dialog.length - 1 || (this.dialog[i + 1] && this.dialog[i + 1].who !== message.who);
  }

  selectContact(): void {
    this._chatService.selectContact(this.contact);
  }

  readyToReply(): void {
    setTimeout(() => {
      this.focusReplyInput();
      this.scrollToBottom();
    });
  }

  focusReplyInput(): void {
    setTimeout(() => {
      this.replyInput.focus();
    });
  }

  scrollToBottom(speed?: number): void {
    speed = speed || 400;
    if (this.directiveScroll) {
      this.directiveScroll.update();

      setTimeout(() => {
        this.directiveScroll.scrollToBottom(0, speed);
      });
    }
  }

  reply(event): void {
    event.preventDefault();

    if (!this.replyForm.form.value.message) {
      return;
    }

    // Message
    const message = {
      who: this.user.id,
      message: this.replyForm.form.value.message,
      time: new Date().toISOString()
    };

    this.messageService.sendMessage({ content: this.replyForm.form.value.message, receiver_id: this.contact.id }).subscribe((data) => {
      console.log('ss', data);
    });

    // Add the message to the chat
    this.dialog.push(message);

    // Reset the reply form
    this.replyForm.reset();

    // Update the server
    this._chatService.updateDialog(this.selectedChat.chatId, this.dialog).then((response) => {
      this.readyToReply();
    });
  }
}
