import {Component, OnDestroy, OnInit} from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  navBarOpen = false;
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

  constructor(media: ObservableMedia,
              private authService: AuthService) {
    this.watcher = media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.loadMobileContent();
      } else {
        this.loadDashBoardContent();
      }
    });
  }

  ngOnInit() {
    this.authService.isAuthenticated()
      .subscribe(userLoggedIn => {
      this.navBarOpen = userLoggedIn;
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
