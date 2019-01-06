import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { SharedModule } from '../shared/shared.module';
import { SearchPipe } from '../search';
import {EditorModule} from 'primeng/editor';

@NgModule({
  imports: [EditorModule,
    CommonModule, SharedModule,
    PostRoutingModule
  ],
  declarations: [PostComponent, SearchPipe],
  exports:      [ SearchPipe ]
})
export class PostModule { }
