import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  isLoggedIn: boolean;

  @Output()
  navToggle = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthenticated()
      .subscribe(userLoggedIn => {
        this.isLoggedIn = userLoggedIn;
      });
  }

  toggleNav() {
    this.navToggle.emit();
  }

  logout() {
    this.authService.logout();
  }

}
