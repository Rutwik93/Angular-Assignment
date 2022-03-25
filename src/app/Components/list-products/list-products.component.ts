import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  currentPath:string|null="";
  prodArray:any[]=[];
  loaded:boolean=false;
  
  constructor(private router:Router, private route:ActivatedRoute, private products:ProductsService, private cart:CartService) { 
    this.currentPath=this.route.snapshot.paramMap.get('category');
    
    if(this.currentPath==="electronics")
    {
      this.products.getProducts("Electronics").subscribe(data => {
        data.forEach(val => {
          let obj=val.data();
          this.prodArray.push({ID:val.id,...(obj as any)});
        })
        this.loaded=true;
      })
    }
    else
    {
      this.products.getProducts("Clothing").subscribe(data => {
        data.forEach(val => {
          let obj=val.data();
          this.prodArray.push({ID:val.id,...(obj as any)});
        })
        this.loaded=true;
      })
    }
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
  }
  
  addToCart(productObj:any,qty:number=1)
  {
    this.cart.addProductToCart(productObj,qty);
    
  }



}
