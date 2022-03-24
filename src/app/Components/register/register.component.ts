import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email:string="";
  password:string="";
  fname:string="";
  lname:string="";


  constructor(public auth:AuthService,public router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('User ID') && localStorage.getItem('Token'))
    {
      this.router.navigate(['/'])
    }
  }

  registerUser()
  {
    this.auth.RegisterUser(this.email,this.password,this.fname,this.lname);
  }

}
