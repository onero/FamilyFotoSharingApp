import { Component, OnInit } from '@angular/core';
import { FolderColumn } from '../../file-system/shared/folder-column';
import { FileColumn } from '../../file-system/shared/file-column';
import { Column } from '../../file-system/shared/column';
import { Folder } from '../../file-system/shared/folder';
import { UserService } from '../../user/shared/user.service';
import { FolderService } from '../../shared/db/folder.service';
import 'rxjs/add/operator/first';
import { File } from '../../file-system/shared/file';
import { FileService } from '../../shared/db/file.service';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {
  columns: Column[] = [];

  constructor(private userService: UserService,
              private folderService: FolderService,
              private fileService: FileService) { }

  ngOnInit() {
    this.userService.getUser().switchMap(user => {
        return this.folderService.getFolder(user.rootFolder);
      }
    ).first().subscribe(folder => {
      this.addFolder(folder);
    });
  }

  folderClicked(folder: Folder) {
    this.folderService.getFolder(folder.uid)
      .first().subscribe(folderDb => {
      this.addFolder(folderDb);
    });
  }

   addFolder(folder: Folder) {
    if (folder) {
      /*
      When we click a folder we should only see the child of the subfolder and no subchildren
      Example:
      -root
      --Folder1
      ---SubFolder1

      User clicks root will result in:
      -root
      --Folder1

      Subfolder 1 is no longer shown!
       */
      const index = this.columns.findIndex(column => (column as FolderColumn).main.uid === folder.uid);
      if (index !== -1) {
        this.columns.splice(index);
      }
      const folderColumn: FolderColumn = {
        displayName: folder.name,
        main: folder
      };
      this.columns.push(folderColumn);
    }

  }

  fileClicked(file: File) {
    if (file) {
      this.fileService.getFile(file.uid)
        .first().subscribe(fileDb => {
        const fileColumn: FileColumn = {
          displayName: fileDb.displayName,
          file: fileDb,
          url: 'http://i.imgur.com/YbL08jU.jpg'
        };
        this.columns.push(fileColumn);
      });
    }

  }
}
