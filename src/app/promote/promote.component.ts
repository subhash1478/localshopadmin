import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-promote',
  templateUrl: './promote.component.html',
  styleUrls: ['./promote.component.css']
})
export class PromoteComponent implements OnInit {
  selectedFile: any;
  filedata: FormData;
  cat: any = {};
  crud: string;
  category: any = [];
  newlocation: any;
  promoteLocationList: any = [];
  constructor( public _services: DataService, public toastr: ToastrService,  vcr: ViewContainerRef) {
  }
  ngOnInit() {
    this._services.getpromoter().subscribe((Response: any) => {
      this.category = Response.data;
    });
    this.getPromoteLocation();
  }
  //
  // ──────────────────────────────────────────────────────────────── I ──────────
  //   :::::: A D D   P R O M O T E R : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  addCategory() {
    const uploadData = new FormData();
    uploadData.append('promoterimage', this.selectedFile, this.selectedFile.name );
    uploadData.append('param', JSON.stringify(this.cat) );
    // this._http.post('http://localhost:3001/api/add-category', uploadData, {
    //     reportProgress: true,
    //     observe: 'events'
    //   })
    //     .subscribe(event => {
    //     });
    this._services.addpromoter(uploadData, this.crud).subscribe(( Response: any) => {
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
    this.crud = 'edit';
    this.cat = item;
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
      const tbl = 'promoter';
      const obj = {
        id: item._id
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
  getPromoteLocation() {
    this._services.getpromotelocation().subscribe((Response: any) => {
      this.promoteLocationList = Response.response.data;
    });
  }
addLocation() {
  const obj = {
    location: this.newlocation
  };
  this._services.addLocation(obj).subscribe((response) => {
this.toastr.success();
this.newlocation = '';
this.getPromoteLocation();
  }, (error) => {
  });
}
addImage(event, item) {
  const uploadData = new FormData();
    this.selectedFile = event.target.files;
    console.log(this.selectedFile);
    for (let i = 0; i < this.selectedFile.length; i++) {
      uploadData.append('promoter_image', this.selectedFile[i], this.selectedFile[i]['name']);
 
    }
    this._services.addpromoterImage(uploadData, item).subscribe((Response: any) => {
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
