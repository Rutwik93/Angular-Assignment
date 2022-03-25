import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore) { }

  getProducts(category:string) {
    return this.firestore.collection('Products', ref => ref.where("Category", "==", category)).get();
  }
}
