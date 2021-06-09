import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { AboutComponent } from './components/about/about.component';
import { TranslateModule } from '@ngx-translate/core';
import { HistoricComponent } from './components/historic/historic.component';
import { EditProfileComponent } from './dialogs/edit-profile/edit-profile.component';

const routes = [
  {
    path: '',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [ProfileComponent, AboutComponent, HistoricComponent, EditProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTabsModule,
    TranslateModule,
    FuseSharedModule,

    MatCheckboxModule,
    MatFormFieldModule,

    MatInputModule,

    MatSelectModule,
    MatDialogModule
  ],
  entryComponents: [EditProfileComponent]
})
export class ProfileModule {}
