import { Component, OnInit, ViewContainerRef   } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';
 @Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public options = {type : 'address', componentRestrictions: { country: 'IN' }};
  categorysearch: any = '';
  private _regionSearch: any = '';
  postFilterByRegion: any = [];
  regionFlag = 0;
  searchpost: any;
  selectedFile: Array<File>;
  selectedtags: any = [];
  filedata: FormData;
  cat: any = {};
  crud: string;
  category: any = [];
  user: any = [];
  post = [];
  tag: any = [];
  tagval: any = {};
  private sub: any;
  id: any;
  region: any = [];
  timing:  any = [{
    date: 'Monday', fullDay: false, starttime: '', endtime: ''
  }, {
    date: 'Tuesday', fullDay: false, starttime: '', endtime: ''
  }, {
    date: 'Wednesday', fullDay: false, starttime: '', endtime: ''
  }, {
    date: 'Thursday', fullDay: false, starttime: '', endtime: ''
  }, {
    date: 'Friday', fullDay: false, starttime: '', endtime: ''
  }, {
    date: 'Saturday', fullDay: false, starttime: '', endtime: '',
  }, {
    date: 'Sunday', fullDay: false, starttime: '', endtime: ''
  }];
  constructor(public _services: DataService, public toastr: ToastrService, private activeRoute: ActivatedRoute, vcr: ViewContainerRef) {
  }
  get regionSearch() {
    return this._regionSearch;
  }
  set regionSearch(value) {
    this._regionSearch = value;
    this.postFilterByRegion = this.filterByRegion(value);
  }
  ngOnInit() {
    if (this.activeRoute.firstChild != null) {
      this.activeRoute.firstChild.params.subscribe(params => {
        if (params != null) {
          this.categorysearch =  params.id;
        }
      });
    }
    const obj: object = {};
    if (this.categorysearch) {
      obj['id'] = this.categorysearch;
    }
    this._services.getPost(obj).subscribe((Response: any) => {
      const result = Response.data;
      result.sort((a, b): any => {
        const date1 = new Date(a.createdAt);
        const date2 = new Date(b.createdAt);
        return date2.getTime() -  date1.getTime();
      });
     this.post = result;
     this.postFilterByRegion = result;
    });
    this._services.getCategory().subscribe((Response: any) => {
      this.category = Response.data;
    });
    this._services.getVendor().subscribe((Response: any) => {
      this.user = Response.data;
    });
    this.getRegion();
  }
  setAllTime() {
    this.timing.forEach(element => {
      element.starttime = this.timing[0].starttime;
      element.endtime = this.timing[0].endtime;
      if (this.timing[0].starttime === '00:01' && this.timing[0].endtime === '23:59') {
        element.fullDay = true;
      }
    });
  }
  resetAllTime() {
    this.timing.forEach(element => {
      element.starttime = '';
      element.endtime = '';
      element.fullDay = false;
    });
  }
  deleteTime(item) {
    item.starttime = '';
    item.endtime = '';
    this.checkFullDay(item);
  }
  fullDayTime(item) {
    item.starttime = '00:01';
    item.endtime = '23:59';
  }
  checkFullDay(item) {
    if (item.starttime !== '00:01' || item.endtime !== '23:59') {
      item.fullDay = false;
    }
  }
  filterByRegion(searchString) {
    return this.post.filter((result: any) => {
      if (result.region) {
        return result.region.toLowerCase().includes(searchString.toLowerCase());
      }
    });
  }
getRegion() {
  this._services.getRegion().subscribe((response: any) => {
    this.region = response.data;
  });
}
addPost() {
    this.cat.timing = this.timing;
    this._services.addPost(this.cat, this.crud).subscribe((Response: any) => {
      if (Response.success === false) {
        this.toastr.error(Response.message.message, 'Alert!');
      } else {
        this.cat = {};
        this.toastr.success(Response.message, 'Success!');
        this.ngOnInit();
      }
    });
  }
  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('sampleFile', file, file.name);
      this.filedata = formData;
    }
  }
  edit(item) {
    this.getRegion();
    this.crud = 'edit';
    this.cat = item;
    this.cat.category = item.category._id;
    this.cat.userid = item.userid._id;
    this.timing = item.timing;
  }
  openTag(item) {
    this.crud = 'edit';
    this.cat = item;
    this.selectedtags = item.tags;
    this._services.getTags(this.cat.category._id).subscribe((Response: any) => {
      this.tag = Response.data;
    });
  }
  action(type) {
    this.getRegion();
    this.cat = {};
    this.crud = type;
  }
  onFileChanged(event) {
    const uploadData = new FormData();
    this.selectedFile = event.target.files;
    for (let i = 0; i < this.selectedFile.length; i++) {
      uploadData.append('uploads', this.selectedFile[i], this.selectedFile[i]['name']);
    }
    uploadData.append('id', this.cat._id);
    this._services.updatePostImage(uploadData).subscribe((Response: any) => {
      if (Response.success === false) {
        this.toastr.error(Response.message.message, 'Alert!');
      } else {
        this.toastr.success(Response.message, 'Success!');
        this.ngOnInit();
      }
    }, (Error) => {
    });
  }
  addTag() {
    // this
    if (this.tagval.title === '' || this.tagval.title === undefined) {
      return false;
    }
    const obj = {
      tagname: this.tagval.title,
      id: this.cat._id
    };
    this._services.addTag(obj).subscribe((Response: any) => {
      this.selectedtags.push(this.tagval.title);
      if (Response.success === false) {
        this.toastr.error(Response.message.message, 'Alert!');
      } else {
        this.tagval = {};
        this.toastr.success(Response.message, 'Success!');
      }
    });
  }
  selectTag(item) {
    const obj = {
      tagname: item,
      id: this.cat._id
    };
    this._services.addTag(obj).subscribe((Response: any) => {
      if (Response.success === false) {
        this.toastr.error(Response.message.message, 'Alert!');
      } else {
        this.toastr.success(Response.message, 'Success!');
      }
    });
  }
  deleteTag(item, index) {
    const obj = {
      tagname: item,
      id: this.cat._id
    };
    const result = confirm('Want to delete?');
    if (result === true) {
      this._services.deletePostTag(obj).subscribe((Response) => {
      });
    }
  }
  delete(item) {
    const confirmAlert = confirm('Are you sure want to this item ?');
    if (confirmAlert === true) {
      const tbl = 'post';
      const obj = {
        postid: item._id
      };
      this._services.delete(tbl, obj).subscribe((response: any) => {
        if (response.success === false) {
          this.toastr.error(response.message, 'Alert!');
        } else {
          this.toastr.success(response.message, 'Success!');
          this.ngOnInit();
        }
      });
    }
  }
  onChange(event) {
    this.regionFlag = 1;
    if (this.regionFlag === 1) {
      this._regionSearch = '';
    }
    if (this.categorysearch === '') {
      this.ngOnInit();
      return false;
    }
    const obj: object = {};
    if (this.categorysearch) {
      obj['id'] = this.categorysearch;
    }
    this._services.getPost(obj).subscribe((Response: any) => {
      const result = Response.data;
      result.sort((a, b): any => {
        const date1 = new Date(a.createdAt);
        const date2 = new Date(b.createdAt);
        return date2.getTime() -  date1.getTime();
      });
      this.post = result;
      this.postFilterByRegion = result;
      this.regionFlag = 0;
    });
  }
}
