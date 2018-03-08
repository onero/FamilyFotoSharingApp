import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from './user.model';
import {AuthService} from '../../auth/shared/auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
import 'rxjs/add/operator/first';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';

@Injectable()
export class UserService {

  constructor(private authService: AuthService,
              private afs: AngularFirestore) {
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
            }
            return authUser;
          });
      });
  }

  updateUser(user: User): Promise<any> {
    return this.afs.doc('users/' + user.uid)
      .set(user);
  }

}
