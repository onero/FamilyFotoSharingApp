import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Folder } from '../../file-system/shared/folder';

@Injectable()
export class FolderService {

  constructor(private afs: AngularFirestore) { }

  getFolder(uid: string): Observable<Folder> {
    return this.afs.doc<Folder>('folders/' + uid).valueChanges()
      .map(folder => {
        if (folder) {
          folder.uid = uid;
        }
        return folder;
      });
  }

}
