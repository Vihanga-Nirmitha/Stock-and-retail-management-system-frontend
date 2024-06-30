import { Component ,Input,Output,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from '../cartItem/cart-item/cart-item.component';
import { CartService } from '../../../services/cart/cart.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent,CommonModule,FormsModule],

  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'

  
})

export class CartComponent {
  cartList: any [] = [];
 
  constructor(private cartSrv: CartService){

  }
  ngOnInit(): void {
      this.getAllCart();
  }
  getAllCart(){
    this.cartSrv.getAllCart().subscribe((res:any)=>{
      this.cartList = res.data;
    })
  }
 
}
