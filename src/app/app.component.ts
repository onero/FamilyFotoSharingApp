import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navBarOpen = true;

  toggleNav() {
    this.navBarOpen = !this.navBarOpen;
  }
}
