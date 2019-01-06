import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-page-not-found',
  template: `
    <h1 style="text-align:center;">
      page-not-found!<hr/>
    </h1>
  `,
  styles: []
})
export class PageNotFoundComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
}
