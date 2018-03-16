import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FileDetailsComponent } from './file-details/file-details.component';
import { FileSystemContainerComponent } from './file-system-container/file-system-container.component';
import {MatButtonModule, MatCard, MatCardModule, MatIconModule, MatListModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule
  ],
  declarations: [FileDetailsComponent, FileSystemContainerComponent],
  providers: [],
  exports: [FileSystemContainerComponent]
})
export class FileSystemModule { }
