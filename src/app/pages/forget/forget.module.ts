import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetComponent } from './forget.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const routes = [
  {
    path: '',
    component: ForgetComponent
  }
];
@NgModule({
  declarations: [ForgetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    TranslateModule,
    FuseSharedModule
  ]
})
export class ForgetModule {}
