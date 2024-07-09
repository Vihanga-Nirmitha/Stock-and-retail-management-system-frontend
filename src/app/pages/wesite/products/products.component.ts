import { CommonModule, getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  isSidepanelVisible: boolean = false;
  productObj: any = {
    "productId":0,
    "categoryId":0,
    "image1":0,
    "image2":0,
    "image3":0,
    "image4":0,
    "image5":0,
    "name":"",
    "description":"",
    "price": 0,
    "stock": 0,
    "listedDate": new Date()

  };
  categoryList: any [] = [];
  productList: any [] = [];
  constructor(private productSrv: ProductService){

  }
  ngOnInit(): void {
    this.getAllProduct();
      this.getAllCategory();
  }
  getAllProduct(){
    this.productSrv.getAllProduct().subscribe((res:any)=>{
      this.productList = res.data;
    })
  }
  getAllCategory(){
    this.productSrv.getParentCategory(false).subscribe((res:any)=>{
      this.categoryList = res.data;
    })
  }

  
  openSidePanel() {
    this.isSidepanelVisible = true;
  }
  closeSidePanel() {
    this.isSidepanelVisible = false;
  }
}
