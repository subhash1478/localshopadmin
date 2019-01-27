import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { NgxEditorModule } from 'ngx-editor';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RatingModule } from 'primeng/rating';
import {ToolbarModule} from 'primeng/toolbar';
import {CalendarModule} from 'primeng/calendar';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
@NgModule({
  imports: [TableModule, ButtonModule, CalendarModule, RatingModule, ToolbarModule, TooltipModule, DropdownModule, KeyFilterModule,
    CommonModule, RouterModule, ToggleButtonModule, MessagesModule, MessageModule],
  declarations: [SidemenuComponent],
  exports: [TableModule, SidemenuComponent, CalendarModule,
    ToolbarModule, MessagesModule, MessageModule, RatingModule, KeyFilterModule, ToggleButtonModule,
    DropdownModule, TooltipModule, NgxEditorModule, ButtonModule, FormsModule, MaterialModule]
})
export class SharedModule { }
