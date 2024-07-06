import { Component ,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';
import { CommonModule } from '@angular/common';
import  { FooterComponent } from '../footer/footer.component';



@Component({
    selector: 'app-layout',
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css',
    imports: [RouterOutlet, CommonModule, FooterComponent]
})
export class LayoutComponent implements OnInit {

  categoryList: any [] = [];
  subCategoryList: any [] = [];
  constructor(private productSrv: ProductService){

  }
  onMouseEnter(event: MouseEvent ,categoryId: number) {
    const hoveredElement = event.target as HTMLElement;
    this.subCategoryList = this.categoryList.filter(cater => cater.parentCategoryId === categoryId);

  }
  ngOnInit(): void {
    
      this.getAllCategory();
 
  }
  getAllCategory(){
    this.productSrv.getCategory(true).subscribe((res:any)=>{
      this.categoryList = res.data;
    })
  }
}
