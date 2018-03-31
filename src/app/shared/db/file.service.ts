import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { File } from '../../file-system/shared/file';

@Injectable()
export class FileService {

  constructor(private afs: AngularFirestore) { }

  getFile(uid: string): Observable<File> {
    return this.afs.doc<File>('files/' + uid).valueChanges()
      .map(file => {
        if (file) {
          file.uid = uid;
        }
        return file;
      });
  }

}
