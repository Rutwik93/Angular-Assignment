import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Observable<firebase.default.User | null>;
  loginStatus:boolean=false;

  constructor(private angularFireAuth: AngularFireAuth, private router:Router, private notifier: NotifierService) { 
    this.userData = angularFireAuth.authState;
  }
  
  RegisterUser(email: string, password: string, fname:string, lname:string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(async res => {
      if(res.user)
      {
        await res.user.updateProfile({displayName:fname+" "+lname});
        localStorage.setItem('User ID',res.user.uid);
        localStorage.setItem('Token',res.user.refreshToken);

        if(res.user.displayName!==null)
          localStorage.setItem('User Name',res.user.displayName);

        this.notifier.notify('success', 'Registration Was Successful! Welcome, '+res.user.displayName+'!'); 
        this.router.navigate(['/']);
      }
    })
    .catch(error => {
      if(error.code === "auth/email-already-in-use")
        this.notifier.notify('error', "Error, User With Specified E-Mail Address Already Exists!"); 
      else
        this.notifier.notify('error', "Something went wrong!");
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
          
        this.notifier.notify('success', 'Welcome Back, '+res.user.displayName+'!');        
        this.router.navigate(['/']);
        
      }
    }).catch(error => {
      if(error.code==="auth/wrong-password")
        this.notifier.notify('error', "Error, Invalid Password!");
      else if(error.code==="auth/too-many-requests")
        this.notifier.notify('error', "Too many requests, Please wait for sometime!");
      else
        this.notifier.notify('error', "Something went wrong!");
    });
  }

  LogOut() {
    this.angularFireAuth.signOut();
    localStorage.clear();
    window.location.reload();
  }
}
