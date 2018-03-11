import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatListModule, MatSidenavModule, MatTooltipModule} from '@angular/material';
import {AppRoutingModule} from './app-routing.module';
import {AlbumsModule} from './albums/albums.module';
import {SharedModule} from './shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FileSystemModule } from './file-system/file-system.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    AlbumsModule,
    MatSidenavModule,
    SharedModule,
    MatListModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    UserModule,
    FileSystemModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
