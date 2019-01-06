import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  selectedFile: File;
  filedata: FormData;
  cat: any = {};
  crud: string;
  category: any = [];
  cols: { field: string; header: string; }[];
  constructor(public _services: DataService, public toastr: ToastrService, private _http: HttpClient, vcr: ViewContainerRef) {
  }
  ngOnInit() {
    this.cols = [
      { field: 'title', header: 'title' },
      { field: 'image', header: 'image' },
    ];
    this._services.getCategory().subscribe((Response: any) => {
      this.category = Response.data;
    });
  }
  addCategory() {

    if ( this.crud === 'edit' ) {
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
      const uploadData = new FormData();
      uploadData.append('category_image', this.selectedFile, this.selectedFile.name);
      uploadData.append('param', JSON.stringify(this.cat));
      // this._http.post('http://localhost:3001/api/add-category', uploadData, {
      //     reportProgress: true,
      //     observe: 'events'
      //   })
      //     .subscribe(event => {
      //     });
      this._services.addCategory(uploadData, this.crud).subscribe((Response: any) => {
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
}
