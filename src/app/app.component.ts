import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public hasToken: boolean;
  title = 'tasks';
  constructor() {
    this.hasToken = !!localStorage.getItem('token');
  }
}
