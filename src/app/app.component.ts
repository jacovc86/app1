import { Component } from '@angular/core';

import { User, UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  template: `
    <app-login (loggedIn)="login($event)" (loggedOut)="logout()"></app-login>
  `,
  styles: []
})
export class AppComponent {

  constructor(private _userService: UserService) {}

  login(username: string) {
    const user = new User(username);
    this._userService.setUser(user);
  }

  logout(): void {
    this._userService.setUser(null);
  }
}
