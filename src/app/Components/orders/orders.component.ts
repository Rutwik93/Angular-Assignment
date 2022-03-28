import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity', 'uprice', 'tprice'];
  orderItems:any[]=[];
  loaded:boolean=false;

  constructor(private order:OrdersService) { }

  ngOnInit(): void {
    this.getUserOrders();
  }

  getUserOrders()
  {
    let orders=this.order.getOrders();

    orders.subscribe(resp => {
      this.loaded=true;
      resp.forEach(order => {
        let data:any=order.data();

        let productData:any[]=[];

        data.Items.forEach((item:any) => {
          productData.push({name: item.Name, quantity: item.quantity, uprice: item.Price, tprice: item.Price*item.quantity})
        })

        this.orderItems.push({ID:order.id,...data,dataSource:productData});
      })
    })
  }
}