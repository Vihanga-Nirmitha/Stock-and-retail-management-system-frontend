import { Component } from '@angular/core';
import { ProductService } from '../../../../../services/product/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  productObj: any = {
    "productId": 0,
    "categoryId": 0,
    "images": { "image1": null, "image2": null, "image3": null, "image4": null, "image5": null }, // Added images object
    "name": "",
    "description": "",
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
    this.productSrv.getCategory().subscribe((res:any)=>{
      this.categoryList = res.data;
    })
  }
  onFileChange(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.productObj.images[field] = input.files[0];
    }
  }

  onSave(){
    this.productSrv.saveProduct(this.productObj).subscribe((res: any)=>{
      if(res.result){
        alert("Product Created")
        this.getAllProduct();
      }else{
        alert(res.message)
      }
    })
  }
  onReset() {
    this.productObj = {
      "productId": 0,
      "categoryId": 0,
      "images": { "image1": null, "image2": null, "image3": null, "image4": null, "image5": null },
      "name": "",
      "description": "",
      "price": 0,
      "stock": 0,
      "listedDate": new Date()
    };
  }
 
}
