import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productDetails:any={};
  productID:string|null="";
  loaded:boolean=false;
  quantity:number=1;

  constructor(private route:ActivatedRoute, private products:ProductsService, private cart:CartService) {
    this.productID=this.route.snapshot.paramMap.get('productID');
    
    this.products.getSingleProduct(this.productID!).subscribe(product => {
      let prod:any=product.data();
      this.productDetails={ID:this.productID,Price:prod.Price,Description:prod.Description,Category:prod.Category,URL:prod.URL,Name:prod.Name};
      this.loaded=true;
    })
   }

  ngOnInit(): void {
  }

  increaseQTY()
  {
    this.quantity++;
  }

  decreaseQTY()
  {
    if(this.quantity>1)
    this.quantity--;
  }

  addToCart()
  {
    this.cart.addProductToCart(this.productDetails,this.quantity)
  }
}
