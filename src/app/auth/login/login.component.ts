import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fireAuth: AngularFireAuth) { }

  ngOnInit() {
    // this.fireAuth.auth.createUserWithEmailAndPassword('test@test.dk', '123456')
    //   .then(user => console.log(user));
  }

}
