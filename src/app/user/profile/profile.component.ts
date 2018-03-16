import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/user.model';
import {UserService} from '../shared/user.service';
import {Subscription} from 'rxjs/Subscription';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSnackBar} from '@angular/material';
import {FileService} from '../../shared/files/file.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [trigger('imageHover', [
    state('hoveringImage', style({
      opacity: 0.3
    })),
    state('notHoveringImage', style({
      opacity: 1
    })),
    transition('hoveringImage <=> notHoveringImage',
      animate('200ms ease-in'))
  ])]
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileForm: FormGroup;
  user: User;
  userSubscription: Subscription;
  isHovering: boolean;
  img: string;
  srcLoaded: boolean;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private snack: MatSnackBar,
              private fileService: FileService) {
    this.profileForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstName: '',
      middleName: '',
      lastName: ''
    });
  }

  ngOnInit() {
    this.userSubscription = this.userService.getUserWithProfileUrl()
      .subscribe(user => {
        this.user = user;
        if (this.user.img) {
          this.img = user.profileImgUrl;
        } else {
          this.img = 'assets/unknownProfile.png';
        }
        this.profileForm.patchValue(user);
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  hovering(isHovering: boolean) {
    this.isHovering = isHovering;
  }

  uploadNewImage(fileList: FileList) {
    if (fileList &&
      fileList.length === 1 &&
      ['image/jpeg', 'image/png'].indexOf(fileList.item(0).type) > -1) {
      this.srcLoaded = false;
      const file = fileList.item(0);
      const path = `profile-images/${this.user.uid}`;
      this.fileService.upload(path, file).downloadUrl.subscribe(url => {
        this.img = url;
        this.user.img = true;
        this.save();
        this.hovering(false);
      });
    } else {
      this.snack.open('You need to drop a single png or jpeg image', null, {
        duration: 4000
      });
      this.hovering(false);
    }
  }

  save() {
    const updatedUserModel = this.profileForm.value as User;
    updatedUserModel.uid = this.user.uid;
    updatedUserModel.img = this.user.img;
    this.userService.updateUser(updatedUserModel)
      .then(() => {
        this.snack.open('User Saved', null, {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['snack-color-success']
        });
      })
      .catch(error => {
        this.snack.open(error, null, {
          duration: 4000,
          panelClass: ['snack-color-failure']
        });
      });
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

  unchanged(): boolean {
    const model = this.profileForm.value as User;
    return model.username === this.user.username &&
      model.firstName === this.user.firstName &&
      model.middleName === this.user.middleName &&
      model.lastName === this.user.lastName;
  }
}

