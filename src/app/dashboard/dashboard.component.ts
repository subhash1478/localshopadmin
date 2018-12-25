import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'app';
  userId: string;
  username: string;
  crud: string;
  user: any = {};
  vendorList: any = [];
  category: any = [];
  constructor(
    public _services: DataService, public toastr: ToastrService, vcr: ViewContainerRef) {
  }
  ngOnInit() {
    this._services.getVendor().subscribe((Response: any) => {
      const result = Response.data;
      result.sort((a, b): any => {
        const date1 = new Date(a.createdAt);
        const date2 = new Date(b.createdAt);
        return date2.getTime() - date1.getTime();
      });
      this.vendorList = result;
      for (let index = 0; index < result.length; index++) {
        const element = result[index];
      }
    });
    this._services.getCategory().subscribe((Response: any) => {
      this.category = Response.data;
    });
  }
  addUser() {
    this.user.type = 'vendor';
    this._services.addUser(this.user, this.crud).subscribe((Response: any) => {
      if (Response.success === false) {
        if (Response.message.message) {
          this.toastr.error(Response.message.message, 'Alert!');
        }
        this.toastr.error(Response.message, 'Alert!');
      } else {
        this.user = {};
        this.toastr.success(Response.message, 'Success!');
        this.ngOnInit();
      }
    });
  }
  edit(item) {
    this.crud = 'edit';
    this.user = item;
  }
  action(type) {
    this.user = {};
    this.crud = type;
  }
}
