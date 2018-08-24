import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any = {}
  constructor(public router:Router, public service:DataService,public toastr: ToastrService, vcr: ViewContainerRef) {
  }
  ngOnInit() {
  }
  doLogin(loginForm: NgForm) {
    console.log(loginForm.valid, loginForm.value);
    this.service.doLogin(loginForm.value).subscribe((Response:any) => {
      console.log(Response);
      if(Response.sucess){
        const result=Response.data
        sessionStorage.setItem('token',result.token)
        this.router.navigateByUrl("dashboard")
        this.toastr.success(Response.message, 'success!');

      }else{
        this.toastr.error(Response.message, 'Alert!');
        sessionStorage.clear()
      }
    }, (Error) => {
      console.log(Error);
    });
  }
}
