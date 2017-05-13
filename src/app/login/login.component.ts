import { UserService, User } from './../services/user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'app-login',
  template: `
    <form *ngIf="!currentUser" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <label>Username: <input type="text" formControlName="username"></label>
      <label>Password: <input type="password" formControlName="password"></label>
      <button type="submit">Submit</button>
    </form>
    <span *ngIf="currentUser">{{currentUser.name}}</span>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  currentUser: User;

  @Output() loggedIn = new EventEmitter();

  @Output() loggedOut = new EventEmitter();

  constructor(private _fireAuth: AngularFireAuth, private _formBuilder: FormBuilder, private _userService: UserService) { }

  ngOnInit() {
    this.currentUser = this._userService.getCurrentUser();
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.loginForm.valueChanges.filter(value => this.loginForm.valid).subscribe(value => {
      console.log(value);
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loggedIn.emit(this.loginForm.value.username);
      this.currentUser = this._userService.getCurrentUser();
    }
  }

  logout() {
    this.loggedOut.emit();
  }

}
