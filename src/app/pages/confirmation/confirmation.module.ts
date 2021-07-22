import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './confirmation.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: ':id/:token',
    component: ConfirmationComponent
  }
];

@NgModule({
  declarations: [ConfirmationComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ConfirmationModule {}
