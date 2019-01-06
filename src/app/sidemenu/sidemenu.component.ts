 import { Component, OnInit } from '@angular/core';
 import { Router } from '@angular/router';
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  constructor(public router: Router, ) { }
  ngOnInit() {
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
