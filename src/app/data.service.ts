import { Injectable } from '@angular/core';
import {  HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import { config } from './config';
@Injectable()
export class DataService {
  constructor(private _http: HttpClient) { }
  doLogin(data) {
    return this._http.post(`${config.API_ENDPOINT}/login`, data);
  }

  AgentLogin(data) {
    return this._http.post(`${config.API_ENDPOINT}/api/login`, data);

  }
  addUser(data, action) {
    if (action === 'add') {
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

  updateVendorType(data) {
    return this._http.post(`${config.API_ENDPOINT}/api/update-vendor-type`, data);
  }

  addCategory(data, action) {
    if (action === 'add') {
      return this._http.post(`${config.API_ENDPOINT}/api/add-category`, data);
    } else {
      return this._http.post(`${config.API_ENDPOINT}/api/update-category`, data);
    }
  }
  addpromoter(data, action) {
    if (action === 'add') {
      return this._http.post(`${config.API_ENDPOINT}/api/add-promoter`, data);
    } else {
      return this._http.post(`${config.API_ENDPOINT}/api/update-promoter`, data);
    }
  }
  getpromoter() {
    return this._http.get(`${config.API_ENDPOINT }/api/get-promoter`);
  }
  addPost(data, action) {
    if (action === 'add') {
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
    return this._http.get(`${config.GOOGLE_URL}textsearch/json?${config.GOOGLE_API_KEY}&query=${data}`);
  }
  getPlacesDetails(data) {
    return this._http.get(`${config.GOOGLE_URL}details/json?placeid=${data}&${config.GOOGLE_API_KEY}`);
  }
  addpostgoogleapi(data) {
    return this._http.post(`${config.API_ENDPOINT}/api/add-post-googleapi`, data);
  }
  delete(tbl, data) {
    return this._http.post(`${config.API_ENDPOINT}/api/delete-${tbl}`, data);
  }
  editCategory(data) {
    return this._http.post(`${config.API_ENDPOINT}/api/update-category-data`, data);
  }
  getProductCategory (data) {
    return this._http.get(`${config.SAILS_API}/api/get-product-category?shopid=${data.shopid}`);
  }
  getProduct (data) {
    return this._http.get(`${config.SAILS_API}/api/get-product?id=${data.id}`);
  }
  addProduct(data) {
    return this._http.post(`${config.SAILS_API}/api/add-product`, data);
  }
  addproductcategory(data, type) {
    return this._http.post(`${config.SAILS_API}/api/add-product-category`, data);
  }
  addDriver(data, type) {
    return this._http.post(`${config.SAILS_API}/api/add-driver`, data);
  }
  getDriver() {
    return this._http.get(`${config.SAILS_API}/api/get-driver`);
  }
  getOrder() {
    return this._http.get(`${config.SAILS_API}/api/get-order`);
  }
  getOrderById(id) {
    return this._http.get(`${config.SAILS_API}/api/get-order?id=${id}`);
  }
  getDriverList() {
    return this._http.get(`${config.SAILS_API}/api/get-driver`);
  }
  assignDriver(data) {
    return this._http.post(`${config.SAILS_API}/api/assign-driver`, data);
  }

  getpromotelocation() {
    return this._http.get(`${config.SAILS_API}/api/get-promoter-location`);

  }

  addLocation(data) {
    return this._http.post(`${config.SAILS_API}/api/add-promoter-location`, data);

  }
  addpromoterImage(formdata, id) {
       return this._http.post(`${config.SAILS_API }/api/add-promoter-image?id=${id}`, formdata);
    }
    addBannerimage (formdata, id) {
      return this._http.post(`${config.SAILS_API }/api/add-banner-image?id=${id}`, formdata);
   }

   getBanner() {
    return this._http.get(`${config.SAILS_API }/api/get-banner`);

   }
   deleteBanner(data) {
    return this._http.post(`${config.SAILS_API }/api/delete-banner-image`, data);

   }

   linkTo(data) {
    return this._http.post(`${config.SAILS_API }/api/link-banner`, data);

   }

   getpromoteimage(data) {
    return this._http.get(`${config.SAILS_API }/api/get-promoter-image?id=${data}`);

   }

   deletePromoterImage(data) {
    return this._http.post(`${config.SAILS_API }/api/delete-promoter-image`, data);

   }

   addProductImage(formdata, id) {

    return this._http.post(`${config.SAILS_API }/api/upload-product-image?id=${id}`, formdata);


   }
   getChatHistory(obj) {
const token = localStorage.getItem('token');
    return this._http.get(`${config.API_ENDPOINT}/api/chatHistory?token=${token}&remoteUserId=${obj.remoteuserid}&page=${obj.page}`);


  }

  getRegion() {
    return this._http.get(`${config.API_ENDPOINT}/api/get-region`);
  }
}
