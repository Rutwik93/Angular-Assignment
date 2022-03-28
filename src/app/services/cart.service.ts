import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems:any[]=[];
  grandTotal:number=0;

  constructor(private notifier: NotifierService) { }

  addProductToCart(productObj:any,qty:number=1)
  {
    let flag:boolean=false;

    this.cartItems.forEach((product,i) => {
      if(product.ID===productObj.ID)
      {
        flag=true;
        this.cartItems[i].quantity+=qty;
        this.grandTotal+=productObj.Price*qty;
      }
    })

    if(flag==false)
    {
      this.cartItems.push({...productObj,quantity:qty})
      this.grandTotal+=productObj.Price*qty;
    }
    this.notifier.notify('success', 'Item was added to Cart!'); 
    return this.cartItems;
  }

  getAllProducts()
  {
    return this.cartItems;
  }

  removeProduct(productID:any)
  {
    this.cartItems=this.cartItems.filter(product => {
      if(productID.ID==product.ID)
      {
        console.log("Product to be removed found")
        this.grandTotal-=(product.Price*product.quantity)
        console.log("After Deduction Total is: "+this.grandTotal);
      }
      return product.ID!=productID.ID
    });
    return this.cartItems;
  }

  emptyCart()
  {
    this.cartItems=[];
    this.grandTotal=0;
    return this.cartItems;
  }
  
}
