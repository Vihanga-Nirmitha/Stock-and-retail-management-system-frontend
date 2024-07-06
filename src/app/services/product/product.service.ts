import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constant/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getCategory(isParent: boolean): Observable<any>{
    const params = new HttpParams().set('isParent', isParent.toString());

    return this.http.get(Constant.API_END_POINT + Constant.METHODS.CATEGORY, { params })
  }
  saveCategory(obj: any){
    return this.http.post(Constant.API_END_POINT + Constant.METHODS.CATEGORY,obj)
  }
  deleteCategory(categoryId: String){
    return this.http.delete(Constant.API_END_POINT + Constant.METHODS.CATEGORY+'/'+categoryId)
  }
  saveProduct(obj: any){
    return this.http.post(Constant.API_END_POINT + Constant.METHODS.CREATE_PRODUCT,obj)
  }
  getAllProduct(){
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_PRODUCTS)
  }
  getAllCart(){
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_CART)
  }
  getProductById(ID: number){
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_PRODUCTS+'/1')
  }
}

