import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
 import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit  {
    myControl: any;
  options: string[] = [];
  filteredOptions: any = [];
  filteredOptionsData: any = [];
  selectedFile: File[];
  filedata: FormData;
  cat: any = {};
  crud: string;
  category: any = [];
  constructor(public _services: DataService, public toastr: ToastrService, private _http: HttpClient, vcr: ViewContainerRef) {
     console.log('message');
  }
  ngOnInit() {
    this.getBanner();
    this.getPost();
  }
  getBanner() {
    this._services.getBanner().subscribe((Response: any) => {
      this.category = Response.response.data;
      console.log(Response);
    });
  }
  getPost() {
    const obj = {
      id: undefined,
    };
    this._services.getPost(obj).subscribe((Response: any) => {
      this.filteredOptions = Response.data;
      this.filteredOptionsData = Response.data;
    });
  }
  private _filter(value: any) {
    if (value === undefined) {
      return false;
    }
    const filterValue = value.toLowerCase();
    this.filteredOptionsData = this.filteredOptions.filter((options) => {
      return options.title.toLowerCase().indexOf(filterValue) > -1;
    });
  }
  addImage(event, item) {
    console.log(event, item);
    const uploadData = new FormData();
      this.selectedFile = event.target.files;
      console.log(this.selectedFile);
      for (let i = 0; i < this.selectedFile.length; i++) {
        uploadData.append('banner_image', this.selectedFile[i], this.selectedFile[i]['name']);
      }
      this._services.addBannerimage(uploadData, item).subscribe((Response: any) => {
        if (Response.success === false) {
          this.toastr.error(Response.message.message, 'Alert!');
        } else {
          this.toastr.success(Response.message, 'Success!');
        }
      }, (Error) => {
      });
  }
  delete(item) {
    const confirmAlert = confirm('Are you sure want to this item ?');
    if (confirmAlert === true) {
       const obj = {
        id: item.id
      };
      this._services.deleteBanner(obj).subscribe((response: any) => {
        if (response.success === false) {
          this.toastr.error(response.message, 'Alert!');
        } else {
          this.toastr.success(response.message, 'Success!');
          this.ngOnInit();
        }
      });
    }
  }
  showoption(objdata, item) {
console.log( this.myControl);
    const obj = {
      linkto: objdata._id,
      id: item.id
    };
    this._services.linkTo(obj).subscribe((Response) => {
console.log(Response);
this.getBanner();
    });
  }
}
