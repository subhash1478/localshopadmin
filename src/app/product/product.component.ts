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
  selectedFile: File;
  filedata: FormData;
  cat: any = {}
  crud: string;
  Product : any = [];
  categoryid: any;
  constructor(public _services: DataService, public toastr: ToastrService, private route: ActivatedRoute, vcr: ViewContainerRef) {
     console.log('message', );
 

    this.categoryid=this.route.snapshot.params.id


  }
  ngOnInit() {
   
    let obj={
      id:this.categoryid
    }
    this._services.getProduct(obj).subscribe((Response: any) => {
 

      console.log(Response);
      this.Product = Response.response.data

    })
  }
  addCategory() {
console.log(this.cat);

this.cat.category=this.categoryid

    this._services.addProduct(this.cat).subscribe((Response: any) => {
      this.toastr.success(Response.response.message, 'Success!');
      this.ngOnInit()
    })
   
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
