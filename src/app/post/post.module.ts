import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { SharedModule } from '../shared/shared.module';
import { SearchPipe } from '../search';
@NgModule({
  imports: [
    CommonModule, SharedModule,
    PostRoutingModule
  ],
  declarations: [PostComponent, SearchPipe],
  exports:      [ SearchPipe ]
})
export class PostModule { }
