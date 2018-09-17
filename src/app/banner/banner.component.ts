import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit  {
  selectedFile: File[];
  filedata: FormData;
  cat: any = {};
  crud: string;
  category: any = [];
  constructor(public _services: DataService, public toastr: ToastrService, private _http: HttpClient, vcr: ViewContainerRef) {
     console.log('message');
  }

  ngOnInit(){

    this._services.getBanner().subscribe((Response: any) => {
      this.category = Response.response.data;
      console.log(Response);
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
}
