import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E-Commerce';
  email:string="";
  password:string="";

  constructor()
  {
    console.log("Loaded")
  }

  viewData()
  {
    console.log(this.email+" "+this.password)
  }
}
