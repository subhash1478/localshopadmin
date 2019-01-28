import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  rangeDates: string;
  view: boolean;
  orderList: any = [];
  cols: { field: string; header: string; }[];
  result: any;
  totalprice = 0;
  constructor(public _services: DataService, public toastr: ToastrService, private _http: HttpClient, vcr: ViewContainerRef) {
    this.cols = [
      { field: 'orderid', header: 'Order id' },
      { field: 'createdAt', header: 'Order date' },
      { field: 'status', header: 'Order status' },
      { field: 'driverUsername', header: 'Driver' },
      { field: 'username', header: 'User' },
      { field: 'shopname', header: 'Shop' },
      { field: 'totalprice', header: 'Total Price' }
    ];
  }
  ngOnInit() {
    this._services.getOrder().subscribe((Response: any) => {
      this.result = Response.response.data;
      this.setData();
    });
  }
  setData() {
    this.totalprice = 0;

    this.orderList = [];
    const order = this.result.map((item) => item.order);
    Object.keys(this.result).map((key) => {
      console.log('====================================');
      console.log(order[key].status );
      console.log('====================================');
      order[key].shopname = order[key].shopid.title;
      order[key].username = `${order[key].userid.firstname} ${order[key].userid.lastname}`;
      order[key].totalprice = order[key].totalprice;
      this.totalprice += order[key].totalprice;
      order[key].status = (order[key].status === 0) ? 'pending' : 'delivered';
      order[key].createdAt = moment(order[key].createdAt).format('lll');
      order[key].driverUsername = (order[key].driverid) ? `${order[key].driverid.driver_first_name}
        ${order[key].driverid.driver_last_name}` : '';
    });
    if (this.rangeDates) {
      this.totalprice = 0;

      const orderList = order.filter((item) => {

        const startDate = moment(item.createdAt).isSameOrAfter(this.rangeDates[0], 'day');
        const endDate = moment(item.createdAt).isSameOrBefore(this.rangeDates[1], 'day');
        if (startDate && endDate) {
          this.totalprice += item.totalprice;
          return true;
        }
      });
      this.createList(orderList);
    } else {
      this.createList(order);
    }
  }
  createList(order) {


    order.sort((a, b): any => {


      const date1 = new Date(a.createdAt);
      const date2 = new Date(b.createdAt);
      return date2.getTime() - date1.getTime();
    });
    this.orderList = order;
  }
}
