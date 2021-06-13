import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatDatepicker,
  MatDatepickerModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { TranslateModule } from '@ngx-translate/core';
import { AddProjectsComponent } from './dialogs/add-projects/add-projects.component';

const routes = [
  {
    path: '',
    component: ProjectsComponent
  }
];

@NgModule({
  declarations: [ProjectsComponent, AddProjectsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule,
    FuseSharedModule,
    FuseSidebarModule,
    MatDialogModule,
    MatDatepickerModule
  ],
  entryComponents: [AddProjectsComponent]
})
export class ProjectsModule {}
