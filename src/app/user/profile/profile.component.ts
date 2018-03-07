import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth/shared/auth.service';
import {User} from '../shared/user.model';
import {UserService} from '../shared/user.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileForm: FormGroup;
  user: User;
  userSubscription: Subscription;

  constructor(private userService: UserService,
              private fb: FormBuilder) {
    this.profileForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstName: '',
      middleName: '',
      lastName: ''
    });
  }

  ngOnInit() {
    this.userSubscription = this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        this.profileForm.patchValue(user);
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  save() {
    const updatedUserModel = this.profileForm.value as User;
    updatedUserModel.uid = this.user.uid;
    this.userService.updateUser(updatedUserModel)
      .then(() => console.log('Saved'))
      .catch(error => console.log(error));
  }

  fcErr(fc: string, ec: string, pre?: string[]): boolean {
    if (pre && pre.length > 0) {
      for (let i = 0; i < pre.length; i++) {
        if (this.profileForm.get(fc).hasError(pre[i])) {
          return false;
        }
      }
    }
    return this.profileForm.get(fc).hasError(ec);
  }

}

