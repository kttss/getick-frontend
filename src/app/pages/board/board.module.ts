import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { BoardListComponent } from './components/board-list/board-list.component';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { CardComponent } from './components/dialogs/card/card.component';
import { LabelSelectorComponent } from './components/dialogs/card/label-selector/label-selector.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FuseMaterialColorPickerModule } from '@fuse/components';
import { ScrumboardService } from './scrumboard.service';
import { FormsModule } from '@angular/forms';
import { AddCardComponent } from './components/add-card/add-card.component';
import { AddListComponent } from './components/add-list/add-list.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

const routes = [
  {
    path: '',
    component: BoardComponent
  }
];
@NgModule({
  declarations: [
    BoardComponent,
    BoardListComponent,
    BoardCardComponent,
    CardComponent,
    LabelSelectorComponent,
    AddCardComponent,
    AddListComponent
    //  FuseConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    NgxDnDModule,
    MatMenuModule,
    MatDialogModule,
    FuseSharedModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatChipsModule,
    MatProgressBarModule,
    FuseMaterialColorPickerModule,
    FormsModule,
    MatInputModule,
    TranslateModule
  ],
  entryComponents: [
    CardComponent
    // FuseConfirmDialogComponent
  ],
  providers: [ScrumboardService]
})
export class BoardModule {}
