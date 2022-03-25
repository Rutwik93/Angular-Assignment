import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

  myfun()
  {
    // this.notifier.notify('success', 'You are awesome! I mean it!');
    // this.notifier.notify('info', 'You are awesome! I mean it!');
    // this.notifier.notify('warning', 'You are awesome! I mean it!');
    // this.notifier.notify('error', 'You are awesome! I mean it!');
  }
}
