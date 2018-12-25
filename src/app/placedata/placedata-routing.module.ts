import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlacedataComponent } from './placedata.component';

const routes: Routes = [{
  path: '', component: PlacedataComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacedataRoutingModule { }
