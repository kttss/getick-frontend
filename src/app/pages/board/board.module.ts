import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDialogModule, MatIconModule, MatMenuModule, MatSidenavModule } from '@angular/material';
import { BoardListComponent } from './components/board-list/board-list.component';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { BoardCardComponent } from './components/board-card/board-card.component';

const routes = [
  {
    path: '',
    component: BoardComponent
  }
];
@NgModule({
  declarations: [BoardComponent, BoardListComponent, BoardCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    NgxDnDModule,
    MatMenuModule,
    MatDialogModule
  ]
})
export class BoardModule {}
