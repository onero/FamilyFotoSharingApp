import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Column } from '../shared/column';
import { FolderColumn } from '../shared/folder-column';
import { FileColumn } from '../shared/file-column';
import { Folder } from '../shared/folder';

@Component({
  selector: 'app-file-system-column',
  templateUrl: './file-system-column.component.html',
  styleUrls: ['./file-system-column.component.css']
})
export class FileSystemColumnComponent implements OnInit {
  // If Folder
  @Input()
  column: Column;
  @Output()
  clickedFolder = new EventEmitter<Folder>();
  @Output()
  clickedFile = new EventEmitter<File>();
  folderColumn: FolderColumn;
  fileColumn: FileColumn;

  constructor() { }

  ngOnInit() {
    if ((this.column as FileColumn).url || (this.column as FileColumn).file) {
      this.fileColumn = this.column as FileColumn;
    } else {
      this.folderColumn = this.column as FolderColumn;
    }
  }

}
