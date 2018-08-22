import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import { config } from './config';
@Injectable()
export class DataService {
  constructor(private _http: HttpClient) { }
  doLogin(data) {
    return this._http.post(`${config.API_ENDPOINT}/login`, data);
  }
  addUser(data, action) {
    if (action == 'add') {
      return this._http.post(`${config.API_ENDPOINT }/api/register`, data);
    } else {
      return this._http.post(`${config.API_ENDPOINT}/api/updateuser`, data);
    }
  }
  getCategory() {
    return this._http.get(`${config.API_ENDPOINT}/api/get-category`);
  }
  getVendor() {
    return this._http.get(`${config.API_ENDPOINT}/api/get-vendor`);
  }
  addCategory(data, action) {
    if (action == 'add') {
      return this._http.post(`${config.API_ENDPOINT}/api/add-category`, data);
    } else {
      return this._http.post(`${config.API_ENDPOINT}/api/update-category`, data);
    }
  }
  addpromoter(data, action) {
    if (action == 'add') {
      return this._http.post(`{config.API_ENDPOINT}/api/add-promoter`, data);
    } else {
      return this._http.post(`${config.API_ENDPOINT}/api/update-promoter`, data);
    }
  }
  getpromoter() {
    return this._http.get(`${config.API_ENDPOINT }/api/get-promoter`);
  }
  addPost(data, action) {
    if (action == 'add') {
      return this._http.post(`${config.API_ENDPOINT}/api/add-post`, data);
    } else {
      return this._http.post(`${config.API_ENDPOINT }/api/update-post`, data);
    }
  }
  getPost(data) {
    return this._http.get(`${config.API_ENDPOINT}/api/get-post?catid=${data.id}`);
  }
 
  updatePostImage(formdata) {
    return this._http.post(`${config.API_ENDPOINT }/api/update-postimage`, formdata);
  }
  getTags(id) {
    return this._http.get(`${config.API_ENDPOINT}/api/get-tag?id=${id}`);
  }
  addTag(data) {
    return this._http.post(`${config.API_ENDPOINT}/api/update-post-tag`, data);
  }
  deletePostTag(data) {
    return this._http.post(`${config.API_ENDPOINT}/api/delete-post-tag`, data);
  }
  getPlaces(data) {
    return this._http.get(`${config.GOOGLE_URL}textsearch/json?${config.GOOGLE_API_KEY}&query=${data}`)
  }
  getPlacesDetails(data) {
    return this._http.get(`${config.GOOGLE_URL}details/json?placeid=${data}&${config.GOOGLE_API_KEY}`)
  }
  addpostgoogleapi(data){
    return this._http.post(`${config.API_ENDPOINT}/api/add-post-googleapi`, data);
  }

  delete(tbl,data){
    return this._http.post(`${config.API_ENDPOINT}/api/delete-${tbl}`,data);
  }


  editCategory(data){
    return this._http.post(`${config.API_ENDPOINT}/api/update-category-data`,data);
 
  }

  getProductCategory (data){
    return this._http.get(`${config.SAILS_API}/api/get-product-category?shopid=${data.shopid}`);
 
  }

  getProduct (data){
    return this._http.get(`${config.SAILS_API}/api/get-product?id=${data.id}`);
 
  }
  addProduct(data){
    return this._http.post(`${config.SAILS_API}/api/add-product`,data);
 
  }
  addproductcategory(data,type){
    return this._http.post(`${config.SAILS_API}/api/add-product-category`,data);
 
  }

  addDriver(data,type){
    return this._http.post(`${config.SAILS_API}/api/add-driver`,data);
 
  }
  getDriver(){
    return this._http.get(`${config.SAILS_API}/api/get-driver`);
 
  }

  getOrder(){
    return this._http.get(`${config.SAILS_API}/api/get-order`);

  } 
  
  getOrderById(id){
    return this._http.get(`${config.SAILS_API}/api/get-order?id=${id}`);

  }

  getDriverList(){
    return this._http.get(`${config.SAILS_API}/api/get-driver`);

  }
  assignDriver(data){
    return this._http.post(`${config.SAILS_API}/api/assign-driver`,data);

  }
}
