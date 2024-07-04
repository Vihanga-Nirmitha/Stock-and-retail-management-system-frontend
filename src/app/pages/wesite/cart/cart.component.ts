import { Component ,Input,ViewChild, ElementRef,AfterViewInit, OnInit} from '@angular/core';
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

export class CartComponent implements OnInit , AfterViewInit {
  @ViewChild('codRadio') codRadio!: ElementRef<HTMLInputElement>;
  @ViewChild('paynowRadio') paynowRadio!: ElementRef<HTMLInputElement>;
  @ViewChild('checkoutBtn') checkoutBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('confirmBtn') confirmBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('expand-button') expandbtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('close') closeBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('expand') expand!: ElementRef<HTMLElement>;
  @ViewChild('summery') summery!: ElementRef<HTMLElement>;
  cartList: any [] = [];
  expanded: boolean = true;
  constructor(private cartSrv: CartService){

  }
  ngOnInit(): void {
      this.getAllCart();
      
      
  }
  ngAfterViewInit(): void {
    if (this.codRadio && this.paynowRadio && this.checkoutBtn && this.confirmBtn) {
      this.toggleButtons();
    }
    this.toggleExpand();
  
  }
  getAllCart(){
    this.cartSrv.getAllCart().subscribe((res:any)=>{
      this.cartList = res.data;
    })
  }
  
  toggleButtons(): void {
    if (this.codRadio.nativeElement.checked) {
      
      this.checkoutBtn.nativeElement.classList.remove('active');
      this.confirmBtn.nativeElement.classList.add('active');
    } else if (this.paynowRadio.nativeElement.checked) {
      this.checkoutBtn.nativeElement.classList.add('active');
      this.confirmBtn.nativeElement.classList.remove('active');
    }
  }
  toggleExpand():void{
    if(this.expanded){
      this.expand.nativeElement.classList.add('active');
      this.summery.nativeElement.classList.remove('resize')
      // this.expandbtn.nativeElement.classList.remove('active');
    }else{
      this.expand.nativeElement.classList.remove('active');
      this.summery.nativeElement.classList.add('resize')
      // this.expandbtn.nativeElement.classList.add('active');
    }
  }
  onExpand():void{
    this.expanded= true;
    this.toggleExpand();
  }
  onClose():void{
    this.expanded= false;
    this.toggleExpand();
    
  }
 
}
