import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsListComponent } from './albums-list/albums-list.component';
import { SharedModule } from '../shared/shared.module';
import { FileSystemModule } from '../file-system/file-system.module';
import { UserModule } from '../user/user.module';

@NgModule({
  imports: [
    CommonModule,
    FileSystemModule,
    UserModule,
    SharedModule
  ],
  declarations: [AlbumsListComponent]
})
export class AlbumsModule { }
