import {Component, OnInit} from '@angular/core';
import {FolderColumn} from '../../file-system/shared/folder-column';
import {FileColumn} from '../../file-system/shared/file-column';
import {Column} from '../../file-system/shared/column';
import {Folder} from '../../file-system/shared/folder';
import {UserService} from '../../user/shared/user.service';
import {FolderService} from '../../shared/db/folder.service';
import 'rxjs/add/operator/first';
import {File} from '../../file-system/shared/file';
import {FileService} from '../../shared/db/file.service';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {
  columns: Column[] = [];

  constructor(private userService: UserService,
              private folderService: FolderService,
              private fileService: FileService) {
  }

  ngOnInit() {
    // Initialize user with root folder
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

  folderDeleted(folder: Folder) {
    debugger;
  }

  addFolderToFolder(folder: Folder) {
    debugger;
  }

  uploadFileToFolder(uploadInfo: any) {
    const file = uploadInfo.fileEvent.target.files[0];
    //Upload to firebase
    //-------------- Option one ----------------
    //upload file - Observable/SwitchMap
    //Upload meta data for file
    //Upload folder information

    //Firebase Functions generate a Thumbnail
    debugger;
  }

  /***
   * When we click a folder we should only see the child of the subfolder and no subchildren
   Example:
   -root
   --Folder1
   ---SubFolder1

   User clicks root will result in:
   -root
   --Folder1

   Subfolder 1 is no longer shown!
   * @param {string} uid
   */
  rebuildFolders(uid: string) {
    const index = this.columns.findIndex(column => {
      if (column instanceof FolderColumn) {
        const folderColumn = column as FolderColumn;
        if (folderColumn.main.subFolders) {
          const folderFound = folderColumn.main.subFolders.find(folder => folder.uid === uid);
          if (folderFound) {
            return true;
          }
        }
        if (folderColumn.main.files) {
          const fileFound = folderColumn.main.files.find(file => file.uid === uid);
          if (fileFound) {
            return true;
          }
        }
      }
    });
    if (index !== -1) {
      this.columns.splice(index + 1);
    }
  }

  addFolder(folder: Folder) {
    if (folder) {
      this.rebuildFolders(folder.uid);
      const folderColumn = new FolderColumn(folder);
      this.columns.push(folderColumn);
    }

  }

  fileClicked(file: File) {
    if (file) {
      this.fileService.getFile(file.uid)
        .first().subscribe(fileDb => {
        this.rebuildFolders(fileDb.uid);
        const fileColumn = new FileColumn(
          fileDb.displayName,
          fileDb,
          'http://i.imgur.com/YbL08jU.jpg'
        );
        this.columns.push(fileColumn);
      });
    }

  }
}
