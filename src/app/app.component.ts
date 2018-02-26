import {Component, OnDestroy} from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{

  navBarOpen = true;
  mode = 'side';

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
      route: '/login',
      title: 'Login',
      icon: 'input'
    }
  ];
  watcher: Subscription;

  constructor(media: ObservableMedia) {
    this.watcher = media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.loadMobileContent();
      } else {
        this.loadDashBoardContent();
      }
    });
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

  loadMobileContent() {
    this.navBarOpen = false;
    this.mode = 'over';
  }

  loadDashBoardContent() {
    this.navBarOpen = true;
    this.mode = 'side';
  }

  toggleNav() {
    this.navBarOpen = !this.navBarOpen;
  }
}
