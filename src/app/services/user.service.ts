import { AngularFireDatabase } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { User } from './user.class';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  private _currentUser: Observable<firebase.User>;
  private _subscriptions: Subscription[] = new Array();

  constructor(private _fireAuth: AngularFireAuth, private _db: AngularFireDatabase) {
    this._currentUser = this._fireAuth.authState;
  }

  getCurrentUser(): Observable<firebase.User> {
    return this._currentUser;
  }

  logout(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
    this._fireAuth.auth.signOut();
  }

  loginWithCredentials(credentials: User): firebase.Promise<any> {
    return this._login(credentials).catch((err: firebase.FirebaseError) => {
      if (err.code === 'auth/user-not-found') {
        return this._signUp(credentials);
      }
    });
  }

  signUpWithCredentials(credentials: User) {
    return this._signUp(credentials).catch((err: firebase.FirebaseError) => {
      if (err.code === 'auth/email-already-in-use') {
        return this._login(credentials);
      }
    });
  }

  signInWithPopup(providerName: string): firebase.Promise<any> {
    return this._fireAuth.auth.signInWithPopup(new firebase.auth[`${providerName}AuthProvider`]());
  }

  addUserSubscription(subscription: Subscription) {
    this._subscriptions.push(subscription);
  }

  private _login(credentials: User): firebase.Promise<any> {
    return this._fireAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  private _signUp(credentials): firebase.Promise<any> {
    return this._fireAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((user: firebase.User) => {
        this._db.list('users').push(user.uid);
      });
  }


}

export {User} from './user.class';
