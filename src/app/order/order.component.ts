import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  selectedFile: File;
  filedata: FormData;
  cat: any = {}
  crud: string;
   orderList: any=[];
  constructor(public _services: DataService, public toastr: ToastrService, private _http: HttpClient, vcr: ViewContainerRef) {
     console.log('message');
  }
  ngOnInit() {
    this._services.getOrder().subscribe((Response: any) => {
      this.orderList = Response.response.data
      console.log(Response)
    })
  }
  addCategory() {

    if( this.crud==='edit' ){
      this._services.editCategory(this.cat).subscribe((Response: any) => {
        if (Response.success == false) {
          this.toastr.error(Response.message.message, 'Alert!');
        } else {
          this.cat = {}
          this.toastr.success(Response.message, 'Success!');
          this.ngOnInit()
        }
      })
    }else{
      const uploadData = new FormData();
      uploadData.append('category_image', this.selectedFile, this.selectedFile.name);
      uploadData.append('param', JSON.stringify(this.cat));
      // this._http.post('http://localhost:3001/api/add-category', uploadData, {
      //     reportProgress: true,
      //     observe: 'events'
      //   })
      //     .subscribe(event => {
      //       console.log(event); // handle event here
      //     });
      this._services.addCategory(uploadData, this.crud).subscribe((Response: any) => {
        if (Response.success == false) {
          this.toastr.error(Response.message.message, 'Alert!');
        } else {
          this.cat = {}
          this.toastr.success(Response.message, 'Success!');
          this.ngOnInit()
        }
      })
    }

 
   
  }
  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('sampleFile', file, file.name);
      this.filedata = formData
    }
  }
  edit(item) {
    console.log(item)
    this.crud = 'edit'
    this.cat = item
    this._services.getTags(this.cat._id).subscribe((Response) => {
      console.log(Response)
    })
  }
  action(type) {
    this.cat = {}
    console.log(type)
    this.crud = type
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }
  delete(item){
    const confirmAlert=confirm("Are you sure want to this item ?");
    if(confirmAlert==true){
      const tbl='category';
      let obj={
        catid:item._id
      }
      this._services.delete(tbl,obj).subscribe((response:any)=>{
        if (response.success == false) {
          this.toastr.error(response.message, 'Alert!');
        } else {
          this.toastr.success(response.message, 'Success!');
          this.ngOnInit()
        }
      });
    }
  }
}
