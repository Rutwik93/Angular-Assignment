import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userID:string="";

  constructor(public auth:AuthService,public router:Router) { }

  ngOnInit(): void {
    this.auth.userData.subscribe((user:firebase.default.User | null) => {
      if(user)
        this.userID=user.uid;
    })
  }

  logOut()
  {
    this.auth.LogOut();
    this.userID="";
    console.log("Logged Out Successfully!")
  }

}
