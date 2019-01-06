import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.css']
})
export class ProductcategoryComponent implements OnInit {
  selectedFile: File;
  filedata: FormData;
  singleSelect: number;
  cat: any = {};
  crud: string;
  ProductCategory: any = [];
  categoryid: any;
  config = {
    displayKey: 'title', // if objects array passed which key to be displayed defaults to description
    search: true,
  };
  post: any = [];
  cols: { field: string; header: string; }[];
  constructor(public _services: DataService,
    public toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    vcr: ViewContainerRef, private router: Router) {
    console.log('message');
    this.categoryid = this.activeRoute.snapshot.params.id;
    if (this.activeRoute.firstChild != null) {
      this.activeRoute.firstChild.params.subscribe(params => {
        console.log(params);
        if (params != null) {
          this.categoryid = params.id;
        }
      });
    }
  }
  ngOnInit() {
    this.cols = [
      { field: 'title', header: 'title' },
      { field: 'shop', header: 'shop name' },
    ];
    const data = {
      id: this.categoryid,
    };
    this._services.getPost(data).subscribe((Response: any) => {
      this.post = Response.data;
      console.log(Response);
    });
    const obj = {
      shopid: this.categoryid
    };
    this._services.getProductCategory(obj).subscribe((Response: any) => {
      this.ProductCategory = Response.response.data;
      console.log(Response);
    });
  }
  addCategory() {
    this.cat.shopid = this.categoryid;
    if (this.crud === 'edit') {
      this._services.editCategory(this.cat).subscribe((Response: any) => {
        if (Response.success === false) {
          this.toastr.error(Response.message.message, 'Alert!');
        } else {
          this.cat = {};
          this.toastr.success(Response.message, 'Success!');
          this.ngOnInit();
        }
      });
    } else {
      this._services.addproductcategory(this.cat, this.crud).subscribe((Response: any) => {
        if (Response.success === false) {
          this.toastr.error(Response.message.message, 'Alert!');
        } else {
          this.cat = {};
          this.toastr.success(Response.message, 'Success!');
          this.ngOnInit();
        }
      });
    }
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
    console.log(item);
    this.crud = 'edit';
    this.cat = item;
    this._services.getTags(this.cat._id).subscribe((Response) => {
      console.log(Response);
    });
  }
  action(type) {
    this.cat = {};
    console.log(type);
    this.crud = type;
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  delete(item) {
    const confirmAlert = confirm('Are you sure want to this item ?');
    if (confirmAlert === true) {
      const tbl = 'category';
      const obj = {
        catid: item._id
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
  changeValue($event: any) {
    console.log($event.value[0]._id);
    this.router.navigate([`/product-category/category/${$event.value[0]._id}`]);
  }
}
