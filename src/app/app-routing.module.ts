import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AlbumsListComponent} from './albums/albums-list/albums-list.component';
import {AuthModule} from './auth/auth.module';
import {LoginComponent} from './auth/login/login.component';

const routes: Routes = [
  {
    path: 'albums',
    component: AlbumsListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AuthModule
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
