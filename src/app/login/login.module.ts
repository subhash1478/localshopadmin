import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,MaterialModule,
    LoginRoutingModule,FormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
