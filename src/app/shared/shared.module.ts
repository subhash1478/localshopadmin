import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule, RouterModule   ],
  declarations: [SidemenuComponent],
  exports:      [ SidemenuComponent , NgxEditorModule, SelectDropDownModule, FormsModule, MaterialModule]
})
export class SharedModule { }
