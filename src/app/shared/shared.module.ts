import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,RouterModule   ],
  declarations: [SidemenuComponent],
  exports:      [ SidemenuComponent ,FormsModule,MaterialModule]
})
export class SharedModule { }
