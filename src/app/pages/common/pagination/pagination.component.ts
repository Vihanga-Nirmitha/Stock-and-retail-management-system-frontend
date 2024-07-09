import { CommonModule } from '@angular/common';
import { SimpleChanges, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit , OnChanges{
 
  
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 10; 
  @Output() pageChanged = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalPages']) {
      this.generatePagesArray();
    }
  }
  ngOnInit(): void {
    this.generatePagesArray();
  }
  
  onSetPageNumber(pageNumber:number){
      this.currentPage = pageNumber -1;
      this.pageChanged.emit(this.currentPage);
  }
  pagesArray: number[] = [];
  
 
  generatePagesArray(): void {
    this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i+1);
  }
  changePage(newPage: number) {
    if (newPage >= 0 && newPage <= this.totalPages) {
      
      this.pageChanged.emit(newPage);
      
    }
  }

}
