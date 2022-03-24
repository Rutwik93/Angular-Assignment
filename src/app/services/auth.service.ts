import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Observable<firebase.default.User | null>;
  loginStatus:boolean=false;

  constructor(private angularFireAuth: AngularFireAuth,private firestore: AngularFirestore, private router:Router) { 
    this.userData = angularFireAuth.authState;
  }

  RegisterUser(email: string, password: string, fname:string, lname:string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(async res => {
      console.log('You are Successfully signed up!', res);
      if(res.user)
      {
        await res.user.updateProfile({displayName:fname+" "+lname});
        localStorage.setItem('User ID',res.user.uid);
        localStorage.setItem('Token',res.user.refreshToken);

        if(res.user.displayName!==null)
          localStorage.setItem('User Name',res.user.displayName);

        this.router.navigate(['/']);
      }
    })
    .catch(error => {
    console.log('Something is wrong:', error.message);
    });
  }

  SignIn(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password).then(res => {
      if(res.user)
      {
        localStorage.setItem('User ID',res.user.uid);
        localStorage.setItem('Token',res.user.refreshToken);
        if(res.user.displayName!==null)
          localStorage.setItem('User Name',res.user.displayName);
        this.router.navigate(['/']);
      }
    }).catch(err => {
    console.log('Something went wrong:',err.message);
    });
  }

  LogOut() {
    this.angularFireAuth.signOut();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
