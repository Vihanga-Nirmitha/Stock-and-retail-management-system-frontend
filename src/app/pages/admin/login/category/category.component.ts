import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit,AfterViewInit {
  categoryList: any [] = [];
  allCategoryList: any [] = [];
  categoryObj: any ={
    "name" : null,
    "parentId":null
  }
  @ViewChild('addCategoryButton', { static: false }) addCategoryButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('parentSelect') parentSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('form') form!: ElementRef<HTMLElement>;
  @ViewChild('addbtn') addbtn!: ElementRef<HTMLButtonElement>
  @ViewChild('cancelbtn') cancelbtn!: ElementRef<HTMLButtonElement>
  

  constructor(private productSrv: ProductService){}
  ngOnInit(): void {
    this.getAllCategory();
  }
  ngAfterViewInit(): void {
  
  }

  getAllCategory(): void {
    this.productSrv.getCategory(true).subscribe({
      next: (res: any) => {
        this.categoryList = res.content;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
      complete: () => {
        console.log('Parent category fetching completed');

      }
    });
    this.productSrv.getCategory(false).subscribe({
      next: (res: any) => {
        this.allCategoryList = res.content;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
      complete: () => {
        console.log('All Categories fetching completed');
      }
    });
  }
  onCancel(){
    this.form.nativeElement.classList.remove('active');
    this.addbtn.nativeElement.classList.remove('hide');
    this.cancelbtn.nativeElement.classList.remove('active');
  }

  onSave() {
    this.productSrv.saveCategory(this.categoryObj).subscribe({
      next: (res: any) => {
        this.getAllCategory(); 
        this.form.nativeElement.classList.remove('active');
        this.addbtn.nativeElement.classList.remove('hide');
        this.cancelbtn.nativeElement.classList.remove('active');

        this.categoryObj = { parentId: null, name: '' }; 
        alert("Category Created Successfully");
        
        
      },
      error: (error: any) => {
        alert(`Create Category Failed: ${error.error.message}`);
        // console.error('Error creating category:', error);
      }
    });
  }
  onAddCategory(){
    this.form.nativeElement.classList.add('active');
    this.addbtn.nativeElement.classList.add('hide')
    this.cancelbtn.nativeElement.classList.add('active');
  }
  onDelete(categoryId: string){
    this.productSrv.deleteCategory(categoryId).subscribe({
      next: (res: any) => {
        this.getAllCategory(); 
        alert("Category deleted Successfully");
        
        this.categoryObj = { parentId: null, name: '' }; 
      },
      error: (error: any) => {
        alert(`Delete Failed: ${error.error.message}`);
        
      }
    });
  }
}
