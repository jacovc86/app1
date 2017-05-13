import { Injectable } from '@angular/core';
import { User } from './user.class';
import { CookieService as Cookie } from 'ngx-cookie';

@Injectable()
export class UserService {

  private _currentUser: User;

  constructor(private _cookie: Cookie) { }

  setUser(user: User) {
    this._cookie.putObject('_u', user);
    this._currentUser = user;
  }

  getCurrentUser(): User {
    const fromCookie = <User>this._cookie.getObject('_u');
    if (fromCookie && fromCookie.name) {
      return this._currentUser = new User(fromCookie.name);
    } else {
      return this._currentUser;
    }
  }

}

export {User} from './user.class';
