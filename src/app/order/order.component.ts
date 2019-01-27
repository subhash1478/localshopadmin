import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {


  orderList: any = [];
  cols: { field: string; header: string; }[];
  constructor(public _services: DataService, public toastr: ToastrService, private _http: HttpClient, vcr: ViewContainerRef) {
  }
  ngOnInit() {

    this._services.getOrder().subscribe((Response: any) => {
      const result = Response.response.data;
      const order = result.map((item) => item.order);
      Object.keys(order).map((key) => {
        order[key].shopname = order[key].shopid.title;
        order[key].shopid = order[key].shopid.id;
        order[key].username = `${order[key].userid.firstname} ${order[key].userid.lastname}`;
        order[key].userid = order[key].userid.id;
        order[key].userid = order[key].userid.id;
        order[key].totalprice = order[key].totalprice;
        order[key].status = (order[key].status === 0) ? 'pending' : 'delivered';
        order[key].createdAt = moment(order[key].createdAt).format('lll');
        order[key].driverId = (order[key].driverid) ? order[key].driverid.id : '';
        order[key].driverUsername = (order[key].driverid) ? `${order[key].driverid.driver_first_name}
        ${order[key].driverid.driver_last_name}` : '';
      });
      order.sort((a, b): any => {
        const date1 = new Date(a.createdAt);
        const date2 = new Date(b.createdAt);
        return date2.getTime() - date1.getTime();
      });
      this.orderList = order;
      this.cols = [
        { field: 'orderid', header: 'Order id' },
        { field: 'createdAt', header: 'Order date' },
        { field: 'status', header: 'Order status' },
        { field: 'driverUsername', header: 'Driver' },
        { field: 'username', header: 'User' },
        { field: 'shopname', header: 'Shop' },
        { field: 'totalprice', header: 'Total Price' }
      ];
    });
  }


}
