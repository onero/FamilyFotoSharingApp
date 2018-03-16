import {Injectable} from '@angular/core';
import {AngularFireStorage} from 'angularfire2/storage';
import {UploadTask} from './upload-task';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FileService {

  constructor(private afStorage: AngularFireStorage) {
  }

  upload(path: string, file: File): UploadTask {
    const task = this.afStorage.upload(path, file);
    return {
      downloadUrl: task.downloadURL()
    };
  }

  downloadUrlProfile(uid: string): Observable<any> {
    return this.afStorage.ref(`profile-images/${uid}`).getDownloadURL();
  }

}
