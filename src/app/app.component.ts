import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navBarOpen = true;

  routes = [
    {
      route: '/',
      title: 'Home',
      icon: 'home'
    },
    {
      route: '/albums',
      title: 'Albums',
      icon: 'folder'
    },
    {
      route: '/users',
      title: 'Users',
      icon: 'event'
    }
  ];

  toggleNav() {
    this.navBarOpen = !this.navBarOpen;
  }
}
