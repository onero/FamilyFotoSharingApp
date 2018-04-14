import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {File} from '../shared/file';
import {Folder} from '../shared/folder';
import {Column} from '../shared/column';
import {FolderColumn} from '../shared/folder-column';

@Component({
  selector: 'app-file-system-container',
  templateUrl: './file-system-container.component.html',
  styleUrls: ['./file-system-container.component.css']
})
export class FileSystemContainerComponent implements OnInit {
  @Input()
  columns: Column[] = [];
  @Output()
  clickedFolder = new EventEmitter<Folder>();
  @Output()
  deleteFolder = new EventEmitter<Folder>();
  @Output()
  uploadFileToFolder = new EventEmitter<Folder>();
  @Output()
  addFolder = new EventEmitter<Folder>();
  @Output()
  clickedFile = new EventEmitter<File>();
  constructor() {}

  ngOnInit() {
  }

  deleteImage() {
    console.log('delete the image');
  }
}
