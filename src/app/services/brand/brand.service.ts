import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }
  getAllBrand(ispaginated:boolean , page:number,size:number , name:string){
    const params = new HttpParams()
              .set('isPaginated', ispaginated.toString())
              .set('page', page.toString())
              .set('size', size.toString())
              .set('name', name.toString());
    

    return this.http.get(Constant.API_END_POINT + Constant.METHODS.BRAND, { params })
  }
  saveBrand(obj: any){
    return this.http.post(Constant.API_END_POINT + Constant.METHODS.BRAND,obj)
  }
  deleteBrand(btandId: String){
    return this.http.delete(Constant.API_END_POINT + Constant.METHODS.BRAND+'/'+btandId)
  }
}
