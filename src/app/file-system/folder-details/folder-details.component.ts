import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Folder } from '../shared/folder';
import { File } from '../shared/file';

@Component({
  selector: 'app-folder-details',
  templateUrl: './folder-details.component.html',
  styleUrls: ['./folder-details.component.css']
})
export class FolderDetailsComponent implements OnInit {

  @Input()
  main: Folder;
  @Input()
  displayName: string;
  @Output()
  clickedFolder = new EventEmitter<Folder>();
  @Output()
  deleteFolder = new EventEmitter<Folder>();
  @Output()
  addFolder = new EventEmitter<Folder>();
  @Output()
  uploadFileToFolder = new EventEmitter<Folder>();
  @Output()
  clickedFile = new EventEmitter<File>();
  folders: Folder[];
  files: File[];
  constructor() { }

  ngOnInit() {
    this.folders = this.main.subFolders;
    this.files = this.main.files;
  }

}
