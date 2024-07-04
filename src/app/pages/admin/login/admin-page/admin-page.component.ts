import { Component,OnInit, ViewChild  ,ElementRef, AfterViewInit,} from '@angular/core';
import { AddItemComponent } from '../addItem/add-item/add-item.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [AddItemComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements AfterViewInit{
  

  @ViewChild('additem') additem!: ElementRef<HTMLElement>;
  @ViewChild('edititem') edititem!: ElementRef<HTMLElement>;
  @ViewChild('addstock') addstock!: ElementRef<HTMLElement>;
  @ViewChild('navadditem') navadditem!: ElementRef<HTMLElement>;
  @ViewChild('navedititem') navedititem!: ElementRef<HTMLElement>;
  @ViewChild('navaddstock') navaddstock!: ElementRef<HTMLElement>;
    
    isAddItem : Boolean = true;
    isEditItem : Boolean = false;
    isAddStock : Boolean = false;
    ngAfterViewInit(): void {
    
      this.showNavElm();
    }

   
    onAddItem(){

      this.isAddItem = true;
      this.isEditItem =false;
      this.isAddStock = false;
      this.showNavElm();
    }
    onEditItem(){
      this.isAddItem = false;
      this.isEditItem =true;
      this.isAddStock = false;
      this.showNavElm();
    }
    onAddStock(){
      this.isAddItem = false;
      this.isEditItem =false;
      this.isAddStock = true;
      this.showNavElm();
    }
    showNavElm(){

      if(this.isAddItem){
        this.allRemove();
        this.additem.nativeElement.classList.add('active');
        this.navadditem.nativeElement.classList.add('selected-elm');
      }
      if(this.isEditItem){
        this.allRemove();
        this.edititem.nativeElement.classList.add('active');
        this.navedititem.nativeElement.classList.add('selected-elm');
        
      }
      if(this.isAddStock){
        this.allRemove();
        this.addstock.nativeElement.classList.add('active');
        this.navaddstock.nativeElement.classList.add('selected-elm');
        
      }
    }
    allRemove(){
      this.additem.nativeElement.classList.remove('active');
      this.edititem.nativeElement.classList.remove('active');
      this.addstock.nativeElement.classList.remove('active');
      this.navadditem.nativeElement.classList.remove('selected-elm');
      this.navedititem.nativeElement.classList.remove('selected-elm');
      this.navaddstock.nativeElement.classList.remove('selected-elm');
    }
}
