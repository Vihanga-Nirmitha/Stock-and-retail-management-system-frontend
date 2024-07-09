import { AfterViewInit, Component,Renderer2, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../common/pagination/pagination.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, CommonModule, PaginationComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryList: any[] = [];
  allCategoryList: any[] = [];
  pageDetails: any = {
    "totalPages": 1,
    "size": 10,
    "currentPage": 0
  };
  categoryObj: any = {
    "name": null,
    "parentId": null
  };
  editCategoryObj: any ={
    "name": "",
    "parentId": null,
  }
  editSelectedCategory : string = "";
   
  isParent: boolean = false;
  name: string = "";
  @ViewChild('addCategoryButton', { static: false }) addCategoryButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('parentSelect') parentSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('form') form!: ElementRef<HTMLElement>;
  @ViewChild('formEdit') formEdit!: ElementRef<HTMLElement>;
  @ViewChild('addbtn') addbtn!: ElementRef<HTMLButtonElement>
  @ViewChild('cancelbtn') cancelbtn!: ElementRef<HTMLButtonElement>
  @ViewChild('cancelbtn2') cancelbtn2!: ElementRef<HTMLButtonElement>
  @ViewChild('searchImp') searchImp!: ElementRef<HTMLButtonElement>
  @ViewChildren('parentOption') parentOptions!: QueryList<ElementRef<HTMLOptionElement>>;
  @ViewChild('editParentSelect') editParentSelect!: ElementRef<HTMLSelectElement>;
  


  constructor(private productSrv: ProductService , private renderer: Renderer2) { }
  ngOnInit(): void {
    this.getAllCategory(this.name, this.pageDetails.currentPage, this.pageDetails.size);
    this.getParentCategory();

  }
  


  getAllCategory(name: string, page: number, size: number): void {
    this.productSrv.getCategory(false, true, page, size, name).subscribe({
      next: (res: any) => {
        this.allCategoryList = res.content;
        this.pageDetails.totalPages = res.totalPages;

      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
      complete: () => {
        console.log('All Categories fetching completed');
      }

    });
    
  }
  getParentCategory(): void {
    this.productSrv.getParentCategory(true).subscribe({
      next: (res: any) => {
        this.categoryList = res.content;

      },
      error: (error) => {
        console.error('Error fetching parent categories:', error);
      },
      complete: () => {
        console.log('Parent category fetching completed');

      }
    });

  }
  onCancel() {
    this.form.nativeElement.classList.remove('active');
    this.formEdit.nativeElement.classList.remove('active');
    this.addbtn.nativeElement.classList.remove('hide');
    this.cancelbtn.nativeElement.classList.remove('active');
    this.getAllCategory(this.name, this.pageDetails.currentPage, this.pageDetails.size);
  }

  onSave() {
    this.productSrv.saveCategory(this.categoryObj).subscribe({
      next: (res: any) => {
        this.getAllCategory(this.name, this.pageDetails.currentPage, this.pageDetails.size);
        this.getParentCategory();
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
  onAddCategory() {
    this.form.nativeElement.classList.add('active');
    this.addbtn.nativeElement.classList.add('hide')
    // this.cancelbtn.nativeElement.classList.add('active');
  }
  onDelete(categoryId: string) {
    this.productSrv.deleteCategory(categoryId).subscribe({
      next: (res: any) => {
        this.getAllCategory(this.name, this.pageDetails.currentPage, this.pageDetails.size);
        alert("Category deleted Successfully");

        this.categoryObj = { parentId: null, name: '' };
      },
      error: (error: any) => {
        alert(`Delete Failed: ${error.error.message}`);

      }
    });
  }
  onSearch(searchTerm: string) {

    if (searchTerm === null) {
      this.name = "";
    } else {
      this.name = searchTerm;
    }
    this.pageDetails.currentPage = 0;
    this.getAllCategory(this.name, this.pageDetails.currentPage, this.pageDetails.size);

  }

  onPageChange(newPage: number) {
    this.pageDetails.currentPage = newPage;
    this.getAllCategory(this.name, this.pageDetails.currentPage, this.pageDetails.size);
   

  }
  onPageSizeChange(event:Event){
    const selectElement = event.target as HTMLSelectElement;
    this.pageDetails.size = Number(selectElement.value);

    this.pageDetails.currentPage = 0;
    this.getAllCategory(this.name, this.pageDetails.currentPage, this.pageDetails.size);
  }
  onEditIcon(category: any): void {
    
    this.formEdit.nativeElement.classList.add("active");
    this.editCategoryObj.name = category.name;
    this.editSelectedCategory = category.id;
  
    let isParent  = false 
    let flag = false;
    this.allCategoryList.forEach((allCategory , index) =>{
      
      if(category.id === allCategory.parentId){
        isParent = true;
        this.renderer.setAttribute(this.editParentSelect.nativeElement,'disabled' , 'true');
      }
      if(isParent===false){this.renderer.removeAttribute(this.editParentSelect.nativeElement,'disabled');}
    })

  
    
    this.parentOptions.forEach((option, index) => {
      
      if(option.nativeElement.id === category.parentId){
        flag = true;
        console.log("bbb")
        this.renderer.setAttribute(option.nativeElement,'selected','true')
        this.editCategoryObj.parentId = category.parentId;
      }
      if(flag===false){
        this.renderer.removeAttribute(option.nativeElement,'selected'); 
                console.log(option.nativeElement);
                this.editParentSelect.nativeElement.selectedIndex = 0;

        }
    });
    
    category.parentId = null;
    category.id = null;
      
}

  onEdit(){
    this.productSrv.editCategory(this.editCategoryObj ,this.editSelectedCategory ).subscribe({
    next: (res: any) => {
      this.getAllCategory(this.name, this.pageDetails.currentPage, this.pageDetails.size);
      this.getParentCategory();
      this.formEdit.nativeElement.classList.remove('active');
    

      this.categoryObj = { parentId: null, name: '' };
      alert("Category updated Successfully");
      this.getAllCategory(this.name, this.pageDetails.currentPage, this.pageDetails.size);


    },
    error: (error: any) => {
      alert(`Update Category Failed: ${error.error.message}`);
    }
  });
  }
  


}
