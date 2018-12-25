 import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  selectedFile: File;
  filedata: FormData;
  cat: any = {};
  crud: string;
  driverList: any = [];
  constructor(public _services: DataService, public toastr: ToastrService ,  vcr: ViewContainerRef) {
      console.log('message');
  }
  ngOnInit() {
    this._services.getDriver().subscribe((Response: any) => {
      this.driverList = Response.response.data;
      console.log(Response);
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

      this._services.addDriver(this.cat, this.crud).subscribe((Response: any) => {
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
}
