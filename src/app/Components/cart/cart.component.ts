import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems:any[]=[];
  total:number=0;

  constructor(private cart:CartService) { }

  ngOnInit(): void {
    this.cartItems=this.cart.getAllProducts();
    this.total=this.cart.grandTotal;
  }

  deleteItem(productID:any)
  {
    this.cartItems=this.cart.removeProduct(productID);
    this.total=this.cart.grandTotal;
  }

  clearCart()
  {
    this.cartItems=[];
    this.cart.emptyCart();
  }

}
