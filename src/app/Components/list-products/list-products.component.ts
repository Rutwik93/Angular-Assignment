import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  currentPath:string|null="";
  prodArray:any[]=[];
  
  constructor(private router:Router, private route:ActivatedRoute, private products:ProductsService) { 
    this.currentPath=this.route.snapshot.paramMap.get('category');
    
    if(this.currentPath==="electronics")
    {
      this.products.getProducts("Electronics").subscribe(data => {
        data.forEach(val => {
          this.prodArray.push(val.data())
        })
      })
    }
    else
    {
      this.products.getProducts("Clothing").subscribe(data => {
        data.forEach(val => {
          this.prodArray.push(val.data())
        })
      })
    }
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
  }



}
