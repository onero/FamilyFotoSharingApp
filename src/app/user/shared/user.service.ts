import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from './user.model';
import {AuthService} from '../../auth/shared/auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
import 'rxjs/add/operator/first';

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
        // Get the DBUser
        return this.afs.doc<User>('users/' + authUser.uid).valueChanges()
          .first()
          .map(dbUser => {
            // Merge information from AuthUser+DBUser
            dbUser.uid = authUser.uid;
            dbUser.email = authUser.email;
            return dbUser;
          });
      });
  }

  updateUser(user: User): Promise<any> {
    return this.afs.doc('users/' + user.uid)
      .set(user);
  }

}
