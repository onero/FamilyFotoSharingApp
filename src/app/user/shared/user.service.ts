import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from './user.model';
import {AuthService} from '../../auth/shared/auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
import 'rxjs/add/operator/first';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import {FileService} from '../../shared/files/file.service';

@Injectable()
export class UserService {

  constructor(private authService: AuthService,
              private afs: AngularFirestore,
              private fileService: FileService) {
  }

  getUser(): Observable<User> {
    // Get the AuthUser
    return this.authService.getAuthUser()
      .first()
      .switchMap(authUser => {
        if (!authUser) {
          return new EmptyObservable();
        }
        // Get the DBUser
        return this.afs.doc<User>('users/' + authUser.uid).valueChanges()
          .map(dbUser => {
            if (dbUser) {
              authUser.username = dbUser.username;
              authUser.firstName = dbUser.firstName;
              authUser.middleName = dbUser.middleName;
              authUser.lastName = dbUser.lastName;
              authUser.img = dbUser.img;
            }
            return authUser;
          });
      });
  }

  updateUser(user: User): Promise<any> {
    return this.afs.doc('users/' + user.uid)
      .set(user);
  }

  getUserWithProfileUrl(): Observable<User> {
    return this.getUser()
      .switchMap(user => {
        if (!user || !user.img) {
          return Observable.create(obs => {
          obs.next(user);
        });
        }
        return this.fileService.downloadUrlProfile(user.uid)
          .map(url => {
            user.profileImgUrl = url;
            return user;
          });
      });
  }

}
