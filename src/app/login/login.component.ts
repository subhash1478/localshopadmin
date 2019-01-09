import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: any = {};
  constructor(public router: Router, public service: DataService, public toastr: ToastrService, vcr: ViewContainerRef) {
  }
  doLogin(loginForm: NgForm) {
    this.service.doLogin(loginForm.value).subscribe((Response: any) => {
      if (Response.sucess) {
        const result = Response.data;
        sessionStorage.setItem('token', result.token);
        this.toastr.success(Response.message, 'success!');
        this.agentLogin();
      } else {
        this.toastr.error(Response.message, 'Alert!');
        sessionStorage.clear();
      }
    }, (Error) => {
    });
  }
  agentLogin() {
    const obj = {
      email: 'agent@gmail.com',
      password: 'agentboy'
    };
    this.service.AgentLogin(obj).subscribe((Response: any) => {
      localStorage.setItem('token', Response.data.token);
      localStorage.setItem('userdetails', JSON.stringify(Response.data.userDetails));
      this.router.navigateByUrl('dashboard');
    });
  }
}
