import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
})
export class OrderdetailsComponent implements OnInit {
  selectedFile: File;
  filedata: FormData;
  cat: any = {};
  crud: string;
  orderList: any = [];
  orderid: string;
  cart: any;
  driverList: any;
  constructor(public _services: DataService,
    public toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private _http: HttpClient, vcr: ViewContainerRef) {
  }
  ngOnInit() {

    this.orderid = this.activeRoute.snapshot.params.id;
    this._services.getOrderById(this.orderid).subscribe((Response: any) => {
      this.cart = Response.response.data[0].cart;
      this.orderList = Response.response.data[0].order;
    });
    this.getDriver();
  }
  getDriver() {
    this._services.getDriverList().subscribe((Response: any) => {
      this.driverList = Response.response.data;
    });
  }
  assignDriver(event) {
    const data = {
      id: this.orderid,
      driverid: event.target.value
    };
    this._services.assignDriver(data).subscribe((Response: any) => {

      this.toastr.success(Response.response.message, 'success!');


      this.ngOnInit();
    });
  }
}
