import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { NgxEditorModule } from 'ngx-editor';
import { Router, ActivatedRoute } from '@angular/router';
 
import * as _ from 'underscore';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
     

  public options = {type : 'address', componentRestrictions: { country: 'IN' }};
  categorysearch:any;
  searchpost:any
  selectedFile: Array<File>;
  selectedtags: any = [];
  filedata: FormData;
  cat: any = {}
  crud: string;
  category: any = [];
  user: any = [];
  post=[];
  tag: any = []
  tagval: any = {}
  private sub: any;
  id: any;
  timing :  any=[{
    date:'Monday',starttime:'',endtime:''
  },{
    date:'Tuesday',starttime:'',endtime:''

  },{
    date:'Wednesday',starttime:'',endtime:''

  },{
    date:'Thursday',starttime:'',endtime:''

  },{
    date:'Friday',starttime:'',endtime:''

  },{
    date:'Saturday',starttime:'',endtime:'',

  },{
    date:'Sunday',starttime:'',endtime:''

  }]
  constructor(public _services: DataService, public toastr: ToastrService, private activeRoute: ActivatedRoute, vcr: ViewContainerRef) {
 
  }
 
  ngOnInit() {

    console.log( this.activeRoute.firstChild);
    
if(this.activeRoute.firstChild!=null){
this.activeRoute.firstChild.params.subscribe(params => {
       
    console.log(params);
    if(params!=null){
      this.categorysearch=  params.id

    }
    
    });
}
    
 
    let obj={
      id:this.categorysearch,
     }
    this._services.getPost(obj).subscribe((Response: any) => {
      this.post = Response.data
      console.log(this.post)
    })
    this._services.getCategory().subscribe((Response: any) => {
      this.category = Response.data
      console.log(Response)
    })


    this._services.getVendor().subscribe((Response: any) => {

      this.user = Response.data
    })
  }
  addPost() {



    this.cat.timing= this.timing
    console.log("crash", this.cat);



    this._services.addPost(this.cat, this.crud).subscribe((Response: any) => {
      if (Response.success == false) {
        this.toastr.error(Response.message.message, 'Alert!');
      } else {
        this.cat = {}
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
      this.filedata = formData
    }
  }
  edit(item) {
    console.log(item)
    this.crud = 'edit'
    this.cat = item
    this.cat.category = item.category._id
    this.cat.userid = item.userid._id
    this.timing=item.timing


  }

  openTag(item) {
    console.log('post details');
    console.log(item)
    this.crud = 'edit'
    this.cat = item

    this.selectedtags = item.tags
    this._services.getTags(this.cat.category._id).subscribe((Response: any) => {
      this.tag = Response.data
      //  console.log(Response)
    })
  }
  action(type) {
    this.cat = {}
    console.log(type)
    this.crud = type
  }
  onFileChanged(event) {
    const uploadData = new FormData();
    this.selectedFile = event.target.files

    console.log("crash", this.selectedFile.length);
    for (let i = 0; i < this.selectedFile.length; i++) {
      console.log('loop', "uploads", this.selectedFile[i], this.selectedFile[i]['name']);
      uploadData.append("uploads", this.selectedFile[i], this.selectedFile[i]['name']);
    }
    uploadData.append("id", this.cat._id);
    console.log(uploadData)
    this._services.updatePostImage(uploadData).subscribe((Response: any) => {
      if (Response.success == false) {
        this.toastr.error(Response.message.message, 'Alert!');
      } else {
        this.toastr.success(Response.message, 'Success!');
        this.ngOnInit()
      }
    }, (Error) => {
    })
  }

  addTag() {
    //this

    if (this.tagval.title == "" || this.tagval.title == undefined) {
      return false
    }
    var obj = {
      tagname: this.tagval.title,
      id: this.cat._id
    }
    console.log('obj', obj)
    this._services.addTag(obj).subscribe((Response: any) => {

      this.selectedtags.push(this.tagval.title)
      console.log(Response)
      if (Response.success == false) {
        this.toastr.error(Response.message.message, 'Alert!');
      } else {
        this.tagval = {}
        this.toastr.success(Response.message, 'Success!');
      }
    })
  }


  selectTag(item) {

    var obj = {
      tagname: item,
      id: this.cat._id
    }
    console.log('obj', obj)
    this._services.addTag(obj).subscribe((Response: any) => {
      console.log(Response)
      if (Response.success == false) {
        this.toastr.error(Response.message.message, 'Alert!');
      } else {
        this.toastr.success(Response.message, 'Success!');
      }
    })
  }




  deleteTag(item, index) {

    var obj = {
      tagname: item,
      id: this.cat._id
    }

    var result = confirm("Want to delete?");
    if (result == true) {
      console.log(this.selectedtags.splice(index, 1));


      this._services.deletePostTag(obj).subscribe((Response) => {
        console.log(Response);



      })
    }
  }
  delete(item){
    const confirmAlert=confirm("Are you sure want to this item ?");
    if(confirmAlert==true){
      const tbl='post';
      let obj={
        postid:item._id
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
  
 
onChange(event){
  console.log(this.categorysearch);
 if(this.categorysearch==""){
   this.ngOnInit()
   return false
 }
  let obj={
    id:this.categorysearch,
   }
  this._services.getPost(obj).subscribe((Response: any) => {
    this.post = Response.data
    console.log(this.post)
  })
}
}
