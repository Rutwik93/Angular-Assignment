import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private firestore: AngularFirestore) { }

  placeOrder(orderObj:any)
  {
    return this.firestore.collection('Orders').add(orderObj);
  }

  getOrders()
  {
    return this.firestore.collection('Orders', ref => ref.where("UID", "==", localStorage.getItem('User ID'))).get();
  }
}
