import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems:any[]=[];
  total:number=0;

  constructor(private router:Router, private cart:CartService, private order:OrdersService, private notifier: NotifierService) { }

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

  handleOrder()
  {
    var dt=new Date();
    let currentDate=dt.getDate()+"-"+(dt.getMonth()+1)+"-"+dt.getFullYear();
    let ItemsArray:any[]=[];
    this.cartItems.forEach(item => {
      ItemsArray.push(item);
    })

    this.order.placeOrder({Items:ItemsArray,OrderTotal:this.total,UID:localStorage.getItem('User ID'),Date:currentDate}).then(resp => {
      this.clearCart();
      this.router.navigate(['success/'+resp.id]);
    }).catch(error => {
      this.notifier.notify('error',"Something went wrong, Order wasn't placed."+error);
    })
  }
}
