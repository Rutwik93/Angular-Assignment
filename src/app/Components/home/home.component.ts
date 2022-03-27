import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
    else if(this.currentPath==="clothing")
    {
      this.products.getProducts("Clothing").subscribe(data => {
        data.forEach(val => {
          let obj=val.data();
          this.prodArray.push({ID:val.id,...(obj as any)});
        })
        this.loaded=true;
      })
    }
    else
    {
      this.products.getProducts().subscribe(data => {
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

  viewDetails(productID:string)
  {
    this.router.navigate(['details/'+productID])
  }
}
