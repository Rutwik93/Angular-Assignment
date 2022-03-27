import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string="";
  password:string="";
  hide = true;

  constructor(public auth:AuthService,public router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('User ID') && localStorage.getItem('Token'))
    {
      this.router.navigate(['/'])
    }
   }

  signIn()
  {
    this.auth.SignIn(this.email,this.password);
  }

}
