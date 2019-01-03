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
  filteredVendors: any = [];
  private _searchTerm: any;
  category: any = [];

  get searchTerm(){
    return this._searchTerm;
  }

  set searchTerm(value){
    this._searchTerm = value;

    this.filteredVendors = this.filterVendors(value);
    
    
  }

  filterVendors(searchString){
    return this.vendorList.filter((vendor : any) => {
      if (vendor.firstname && vendor.lastname && vendor.phone && vendor.email) {
          
          if(
            vendor.firstname.toLowerCase().includes(searchString.toLowerCase())
            ||
            vendor.lastname.toLowerCase().includes(searchString.toLowerCase()) 
            || 
            vendor.phone.toLowerCase().includes(searchString.toLowerCase())
            ||
            vendor.email.toLowerCase().includes(searchString.toLowerCase())
          ){
  
            return vendor;
          }
          
        }
      
      
    })
  }

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
      this.filteredVendors = result;
  

      for (let index = 0; index < result.length; index++) {
        const element = result[index];
      }
    });
    this._services.getCategory().subscribe((Response: any) => {
      this.category = Response.data;
    });
  }

  change_type(type,email,_id){
    let type_obj ={
      _id: _id,
      email: email,
      type: type 
    }
    
    this._services.updateVendorType(type_obj).subscribe((Response: any) => {
      if (Response.success === false) {
        if (Response.message.message) {
          this.toastr.error(Response.message.message, 'Alert!');
        }
        this.toastr.error(Response.message, 'Alert!');
      } else {

        this.user = {};
        this.toastr.success(Response.message, 'Success!');
       
      }
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
