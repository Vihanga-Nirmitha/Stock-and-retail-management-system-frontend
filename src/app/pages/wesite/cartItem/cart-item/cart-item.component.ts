import { Component ,Input,Output,EventEmitter,OnInit} from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent implements OnInit{
  constructor(private productSrv: ProductService){}

  @Input() cart: any;
  product:any;
  variations: any [] = [];
  total: number | undefined ;
  min: number = 0;
  max: number = 100;
  price: number | undefined ;
  value: number = 0;
  @Output() valueChange = new EventEmitter<number>();


  ngOnInit(): void {
   this.product =  this.cart.product;
   this.variations = this.product.variation;   
     this.variations.forEach(variation =>{
      if(variation.id == this.cart.variationId){
        this.price =  variation.price;
        this.max = variation.stock;
        this.total = this.value * variation.price;
      }
     })
    
  }
  
  increase() {
    if (this.value < this.max) {
      this.value++;
      this.valueChange.emit(this.value);
    }
  }

  decrease() {
    if (this.value > this.min) {
      this.value--;
      this.valueChange.emit(this.value);
    }
  }

  onInputChange(event: any) {
    let inputValue = parseInt(event.target.value, 10);
    if (isNaN(inputValue)) {
      inputValue = this.min;
    } else if (inputValue > this.max) {
      inputValue = this.max;
    } else if (inputValue < this.min) {
      inputValue = this.min;
    }
    this.value = inputValue;
    this.valueChange.emit(this.value);
    
  }

}
