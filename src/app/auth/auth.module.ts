import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule
  ],
  declarations: [LoginComponent],
  providers: [AuthService]
})
export class AuthModule { }
