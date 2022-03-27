import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore) { }

  getSingleProduct(productID:string)
  {
    return this.firestore.collection('Products').doc(productID).get();
  }

  getProducts(category?:string) {
    if(category)
      return this.firestore.collection('Products', ref => ref.where("Category", "==", category)).get();
    else
      return this.firestore.collection('Products').get();
  }
}
