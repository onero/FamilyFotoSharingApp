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
    console.log('Small view');
    this.navBarOpen = false;
  }

  loadDashBoardContent() {
    console.log('Large view');
    this.navBarOpen = true;
  }

  toggleNav() {
    this.navBarOpen = !this.navBarOpen;
  }
}
