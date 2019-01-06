import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { config } from '../config';
@Component({
  selector: 'app-placedata',
  templateUrl: './placedata.component.html',
  styleUrls: ['./placedata.component.css']
})
export class PlacedataComponent implements OnInit {
  selectedItem: any;
  selected: boolean;
  photoslistimage: any = [];
  photoslist: any = [];
  q: string;
  placelist: any = [];
  selectedFile: Array<File>;
  selectedtags: any = [];
  filedata: FormData;
  cat: any = {};
  crud: string;
  category: any = [];
  user: any = [];
  post: any = [];
  tag: any = [];
  tagval: any = {};
  private sub: any;
  id: any;
  region: any = [];
  constructor(public toastr: ToastrService, public _services: DataService, vcr: ViewContainerRef) {
  }
  ngOnInit() {
    const obj = {
      id: '',
     };
    this._services.getPost(obj).subscribe((Response: any) => {
      this.post = Response.data;
      console.log(this.post);
    });
    this._services.getCategory().subscribe((Response: any) => {
      this.category = Response.data;
      console.log(Response);
    });
    this._services.getVendor().subscribe((Response: any) => {
      this.user = Response.data;
    });
    this.getRegion();
  }
  search() {
    const query = this.q.replace(' ', '+');
    console.log(query);
    this._services.getPlaces(query).subscribe((response: any) => {
      console.log('response', response);
      if (response.status === 'OK') {
        this.placelist = response.results;
      } else {
        this.toastr.error(response.error_message, 'Alert!');
      }
    }, (error) => {
      console.log('error', error);
    });
  }
  photos() {
    this.photoslistimage = [];
    const img = [];
    for (let index = 0; index < this.photoslist.length; index++) {
      const refence = this.photoslist[index].photo_reference;
      img.push(config.GOOGLE_URL + 'photo?maxwidth=400&photoreference=' + refence + '&' + config.GOOGLE_API_KEY);
    }
    this.photoslistimage = img;
    console.log(img);
  }
  action(item) {
    this.crud = 'add';
    console.log(item.place_id);
    this._services.getPlacesDetails(item.place_id).subscribe((Response: any) => {
      console.log(Response);
      if (Response.status === 'OK') {
        const res = Response.result;
        this.cat.title = res.name;
        this.cat.phone = res.international_phone_number;
        this.cat.address = res.formatted_address;
        this.cat.timing = res.opening_hours.weekday_text;
        this.cat.rating = res.rating;
        this.cat.location = res.geometry.location;
        this.cat.website = res.website;
        this.photoslist = res.photos;
        this.photos();
      } else {
        this.toastr.error(Response.error_message, 'Alert!');
      }
    });
  }
  getRegion() {
    this._services.getRegion().subscribe((response: any) => {
      console.log('====================================');
      console.log(response);
      this.region = response.data;
       console.log('====================================');
    });
  }
  addPost() {
    console.log('crash', this.cat);
    if (this.cat.category === '' || this.cat.category === undefined) {
      this.toastr.error('select category', 'Alert!');
      return false;
    }
    if (this.cat.userid === '' || this.cat.userid === undefined) {
      this.toastr.error('select user', 'Alert!');
      return false;
    }
    this.cat.photo = this.photoslistimage;
    this._services.addpostgoogleapi(this.cat).subscribe((Response: any) => {
      if (Response.success === false) {
        this.toastr.error(Response.message.message, 'Alert!');
      } else {
        this.cat = {};
        this.toastr.success(Response.message, 'Success!');
      }
    });
  }
}
