import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

import { LoginComponent } from './login.component';
import { TranslateModule } from '@ngx-translate/core';

const routes = [
  {
      path     : '',
      component: LoginComponent
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,

    RouterModule.forChild(routes),

    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    TranslateModule,
    FuseSharedModule
  ]
})
export class LoginModule { }
