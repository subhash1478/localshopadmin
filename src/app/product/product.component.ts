import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  selectedFile: any;
  filedata: FormData;
  cat: any = {};
  crud: string;
  Product: any = [];
  categoryid: any;
  constructor(public _services: DataService, public toastr: ToastrService, private route: ActivatedRoute, vcr: ViewContainerRef) {


    this.categoryid = this.route.snapshot.params.id;


  }
  ngOnInit() {

    const obj = {
      id: this.categoryid
    };
    this._services.getProduct(obj).subscribe((Response: any) => {


      this.Product = Response.response.data;

    });
  }
  addCategory() {

this.cat.category = this.categoryid;

    this._services.addProduct(this.cat).subscribe((Response: any) => {
      this.toastr.success(Response.response.message, 'Success!');
      this.ngOnInit();
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
    this.crud = 'edit';
    this.cat = item;
    this._services.getTags(this.cat._id).subscribe((Response) => {
    });
  }
  action(type) {
    this.cat = {};
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
  addImage(event, item) {
    const uploadData = new FormData();
    this.selectedFile = event.target.files;
    for (let i = 0; i < this.selectedFile.length; i++) {
      uploadData.append('product_image', this.selectedFile[i], this.selectedFile[i]['name']);
    }
    this._services.addProductImage(uploadData, item).subscribe((Response: any) => {
      if (Response.success === false) {
        this.toastr.error(Response.message.message, 'Alert!');
      } else {
        this.toastr.success(Response.message, 'Success!');
        this.ngOnInit();
      }
    }, (Error) => {
    });
  }
}
