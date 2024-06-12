import { Component ,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  categoryList: any [] = [];
  subCategoryList: any [] = [];
  constructor(private productSrv: ProductService){

  }
  onMouseEnter(event: MouseEvent ,categoryId: number) {
    const hoveredElement = event.target as HTMLElement;
    this.subCategoryList = this.categoryList.filter(cater => cater.parentCategoryId === categoryId);
    console.log(this.subCategoryList);
  }
  ngOnInit(): void {
    
      this.getAllCategory();
 
  }
  getAllCategory(){
    this.productSrv.getCategory().subscribe((res:any)=>{
      this.categoryList = res.data;
    })
  }
}
