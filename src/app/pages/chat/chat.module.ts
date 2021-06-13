import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { ChatService } from './chat.service';
import { ChatLeftSidenavComponent } from './components/chat-left-sidenav/chat-left-sidenav.component';
import { ChatsComponent } from './components/chats/chats.component';
import { FormsModule } from '@angular/forms';
import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { ChatStartComponent } from './components/chat-start/chat-start.component';
import { ChatRightSidenavComponent } from './components/chat-right-sidenav/chat-right-sidenav.component';
import { FuseDirectivesModule } from '@fuse/directives/directives';
import { ChatViewComponent } from './components/chat-view/chat-view.component';

const routes = [
  {
    path: '',
    component: ChatComponent
  }
];

@NgModule({
  declarations: [ChatComponent, ChatLeftSidenavComponent, ChatsComponent, ChatStartComponent, ChatRightSidenavComponent, ChatViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatToolbarModule,
    FusePipesModule,
    FormsModule,
    FuseSharedModule,
    FuseDirectivesModule
  ],
  providers: [ChatService]
})
export class ChatModule {}
