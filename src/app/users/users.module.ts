import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [SharedModule,
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
