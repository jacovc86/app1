import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TdLoadingService, TdDialogService, LoadingMode, LoadingType } from '@covalent/core';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

import { UserService, User } from '../../services/user.service';


@Component({
  selector: 'app-login',
  template: `
    <md-card *ngIf="currentUser">
      <md-card-header>
        <img md-card-avatar *ngIf="currentUser.photoURL" [src]="currentUser.photoURL">
        <md-card-title color="primary">{{currentUser.displayName || currentUser.providerData[0]?.displayName}}</md-card-title>
        <md-card-subtitle>
          <button type="button" md-raised-button (click)="logout()" color="warn">
          <i class="material-icons">exit_to_app</i> Logout</button>
        </md-card-subtitle>
      </md-card-header>
    </md-card>
    <md-card *ngIf="currentUser === null">
      <md-card-content>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <md-input-container>
            <input type="email" mdInput formControlName="email" placeholder="Email">
          </md-input-container>
          <md-input-container>
            <input type="password" mdInput formControlName="password" placeholder="Password">
          </md-input-container>
          <button type="submit" md-raised-button color="accent">Submit</button>
        </form>
      </md-card-content>
      <md-card-footer>
        <button type="button" md-button *ngFor="let providerName of providers" 
                (click)="providerLogin(providerName)">{{providerName}}</button>
      </md-card-footer>
    </md-card>
  `,
  styles: [`
    md-card {
      border: 1px #C1C1C1 solid;
    }
    [md-card-avatar] {
      border: 1px #C1C1C1 solid;
      border-radius: 50%;
    }
  `]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  currentUser: firebase.User;
  providers = ['Google', 'Facebook', 'Twitter'];

  constructor(private _formBuilder: FormBuilder,
              private _userService: UserService,
              private _loadingService: TdLoadingService,
              private _dialogService: TdDialogService) {
    this._loadingService.create({
      name: 'login',
      mode: LoadingMode.Indeterminate,
      type: LoadingType.Linear,
      color: 'accent'
    });
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.currentUser !== null) {
        this._loadingService.register('login');
      }
    });
    this._userService.getCurrentUser()
                     .subscribe((user: firebase.User) => {
                        this.currentUser = user;
                        this._loadingService.resolve('login');
                      });

    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });


  }

  onSubmit() {

    if (this.loginForm.valid) {
      this._loadingService.register('login');
      this._userService.loginWithCredentials(<User>this.loginForm.value);
    }

  }

  providerLogin(providerName: string) {
    this._loadingService.register('login');
    this._userService.signInWithPopup(providerName)
        .then(() => this._loadingService.resolve('login'))
        .catch((error: firebase.FirebaseError) => {
          this._loadingService.resolve('login');
          this._dialogService.openAlert({
            title: 'Login Error',
            message: error.message
          });
        });
  }

  logout() {
    this._userService.logout();
  }

}
