import { Injectable } from '@angular/core';
import { Constant } from '../constant/constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  
  getAllCart(){
      
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_CART)
  }
}
