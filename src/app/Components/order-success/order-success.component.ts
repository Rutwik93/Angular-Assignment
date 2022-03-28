import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  orderID:string|null="";

  constructor(private router:Router, private route:ActivatedRoute) {
    this.orderID=this.route.snapshot.paramMap.get('orderID');
  }

  ngOnInit(): void {
  }

  viewOrders()
  {
    this.router.navigate(['orders']);
  }

}
