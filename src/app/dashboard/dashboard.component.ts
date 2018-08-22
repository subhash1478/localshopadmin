import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
interface  user{
  firstname:String,
  lastname:String,
  location:String,
  address:String,
  category:String,
  phone:String,
  email:String,
  password:String,
  state:String,
  city:String,
  zip:String,
  country:String,
  rating:Number,
  shopname:String,
  online:String,
  profile_image:String,
  type:String,
  facebook_id:String,
  about:String,
  birthday:String,
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  crud: string;
  user:any={}
  vendorList: any=[];
  category: any=[];

  constructor( public _services:DataService,public toastr: ToastrService, vcr: ViewContainerRef) {
 
  }

  ngOnInit() {
    this._services.getVendor().subscribe((Response:any)=>{
      this.vendorList=Response.data
      console.log(Response)
    })

    this._services.getCategory().subscribe((Response:any)=>{
      this.category=Response.data
    })
  }

  addUser(){

    console.log(this.crud)
    this.user.type='vendor'

    this._services.addUser(this.user,this.crud).subscribe(( Response:any)=>{
      console.log(Response)
      if(Response.success==false){
        if(Response.message.message){
          this.toastr.error(Response.message.message, 'Alert!');

        }

        this.toastr.error(Response.message, 'Alert!');

      }else{
        this.user={}
        this.toastr.success(Response.message, 'Success!');
        this.ngOnInit()

      }


    })
  }
  edit(item){
    console.log(item)
    this.crud='edit'

    this.user=item
  }
  action(type){
    this.user={}
    console.log(type)
    this.crud=type
  }
}
