import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {DropdownModule} from 'primeng/dropdown';
import {KeyFilterModule} from 'primeng/keyfilter';

import { NgxEditorModule } from 'ngx-editor';
@NgModule({
  imports: [TableModule, ButtonModule, TooltipModule, DropdownModule, KeyFilterModule,
    CommonModule, RouterModule],
  declarations: [SidemenuComponent],
  exports: [TableModule, SidemenuComponent, KeyFilterModule,
     DropdownModule, TooltipModule, NgxEditorModule, ButtonModule, FormsModule, MaterialModule]
})
export class SharedModule { }
