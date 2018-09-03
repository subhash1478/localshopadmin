import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-promote',
  templateUrl: './promote.component.html',
  styleUrls: ['./promote.component.css']
})
export class PromoteComponent implements OnInit {
  selectedFile: File;
  filedata: FormData;
  cat:any={}
  crud: string;
  category: any=[];
  newlocation: any;
  promoteLocationList: any=[];
  constructor( public _services:DataService,public toastr: ToastrService,  vcr: ViewContainerRef) {
  }
  ngOnInit() {
    this._services.getpromoter().subscribe((Response:any)=>{
      this.category=Response.data
      console.log(Response)
    })


    this.getPromoteLocation()
  }



  addCategory(){
    const uploadData = new FormData();
    uploadData.append('promoterimage', this.selectedFile,this.selectedFile.name );
    uploadData.append('param', JSON.stringify(this.cat) );
    // this._http.post('http://localhost:3001/api/add-category', uploadData, {
    //     reportProgress: true,
    //     observe: 'events'
    //   })
    //     .subscribe(event => {
    //       console.log(event); // handle event here
    //     });
    this._services.addpromoter(uploadData,this.crud).subscribe(( Response:any)=>{
      if(Response.success==false){
        this.toastr.error(Response.message.message, 'Alert!');
      }else{
        this.cat={}
        this.toastr.success(Response.message, 'Success!');
        this.ngOnInit()
      }
    })
  }
  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('sampleFile', file, file.name);
      this.filedata=formData
    }
  }
  edit(item){
    console.log(item)
    this.crud='edit'
    this.cat=item
  }
  action(type){
    this.cat={}
    console.log(type)
    this.crud=type
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }
  delete(item){
    const confirmAlert=confirm("Are you sure want to this item ?");
    if(confirmAlert==true){
      const tbl='promoter';
      let obj={
        id:item._id
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

  getPromoteLocation(){
    this._services.getpromotelocation().subscribe((Response:any)=>{
      console.log(Response);

      this.promoteLocationList=Response.response.data
    })
  }

addLocation(){

  let obj={
    location:this.newlocation
  }

  this._services.addLocation(obj).subscribe((response)=>{

console.log(response);
this.toastr.success()
this.newlocation=''
this.getPromoteLocation()
  },(error)=>{

  })

}

}
