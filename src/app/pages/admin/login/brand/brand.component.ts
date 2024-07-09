import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { BrandService } from '../../../../services/brand/brand.service';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { PaginationComponent } from '../../../common/pagination/pagination.component';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule , PaginationComponent],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit {
  allBrandList: any[] = [];
  pageDetails: any = {
    "totalPages": 1,
    "size": 10,
    "currentPage": 0
  };
  brandObj: any = {
    "name": null,
    "imageRef": null
  };
  name: string = "";
  constructor(private brandSrv: BrandService , private renderer: Renderer2) { }

  @ViewChild('addBrandButton', { static: false }) addBrandButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('form') form!: ElementRef<HTMLElement>;
  // @ViewChild('formEdit') formEdit!: ElementRef<HTMLElement>;
  @ViewChild('addbtn') addbtn!: ElementRef<HTMLButtonElement>
  @ViewChild('cancelbtn') cancelbtn!: ElementRef<HTMLButtonElement>
  @ViewChild('cancelbtn2') cancelbtn2!: ElementRef<HTMLButtonElement>
  @ViewChild('searchImp') searchImp!: ElementRef<HTMLButtonElement>





  ngOnInit(): void {
    this.getAllBrands(this.name, this.pageDetails.currentPage, this.pageDetails.size);
    console.log(this.allBrandList)
    
  }
  
  

  getAllBrands(name: string, page: number, size: number): void {
    this.brandSrv.getAllBrand(true, page, size, name).subscribe({
      next: (res: any) => {
        this.allBrandList = res.content;
        this.pageDetails.totalPages = res.totalPages;
      },
      error: (error) => {
        console.error('Error fetching Brands:', error);
      },
      complete: () => {
        console.log('All Brand fetching completed');
      }

    });
    
  }

  onCancel() {
    this.form.nativeElement.classList.remove('active');
    // this.formEdit.nativeElement.classList.remove('active');
    this.addbtn.nativeElement.classList.remove('hide');
    this.cancelbtn.nativeElement.classList.remove('active');
    this.getAllBrands(this.name, this.pageDetails.currentPage, this.pageDetails.size);
  }

  onSave() {
    this.brandSrv.saveBrand(this.brandObj).subscribe({
      next: (res: any) => {
        this.getAllBrands(this.name, this.pageDetails.currentPage, this.pageDetails.size);     
        this.form.nativeElement.classList.remove('active');
        this.addbtn.nativeElement.classList.remove('hide');
        this.cancelbtn.nativeElement.classList.remove('active');

        this.brandObj = { parentId: null, imageRef: null };
        alert("Brand Created Successfully");


      },
      error: (error: any) => {
        alert(`Create Brand Failed: ${error.error.message}`);
        // console.error('Error creating category:', error);
      }
    });
  }
  onAddBrand() {
    this.form.nativeElement.classList.add('active');
    this.addbtn.nativeElement.classList.add('hide')
    
  }
  onSearch(searchTerm: string) {

    if (searchTerm === null) {
      this.name = "";
    } else {
      this.name = searchTerm;
    }
    this.pageDetails.currentPage = 0;
    this.getAllBrands(this.name, this.pageDetails.currentPage, this.pageDetails.size);

  }
  onPageChange(newPage: number) {
    this.pageDetails.currentPage = newPage;
    this.getAllBrands(this.name, this.pageDetails.currentPage, this.pageDetails.size);
    

  }
  onPageSizeChange(event:Event){
    const selectElement = event.target as HTMLSelectElement;
    this.pageDetails.size = Number(selectElement.value);

    this.pageDetails.currentPage = 0;
    this.getAllBrands(this.name, this.pageDetails.currentPage, this.pageDetails.size);
  }
  onDelete(categoryId: string) {
    this.brandSrv.deleteBrand(categoryId).subscribe({
      next: (res: any) => {
        this.getAllBrands(this.name, this.pageDetails.currentPage, this.pageDetails.size);
        alert("Brand deleted Successfully");

        this.brandObj = { parentId: null, name: '' };
      },
      error: (error: any) => {
        alert(`Delete Failed: ${error.error.message}`);

      }
    });
  }

}
