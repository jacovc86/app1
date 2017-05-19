import { Component } from '@angular/core';

import { User, UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <md-toolbar>
      <md-tab-group>
          <md-tab>
            <ng-template md-tab-label>
              <a class="block" routerLink="">Home</a>
            </ng-template>
          </md-tab>
          <md-tab label="New Product">
            <ng-template md-tab-label>
              <a class="block" routerLink="/product-submit">New Product</a>
            </ng-template>
          </md-tab>
      </md-tab-group>
    </md-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {

  constructor(private _userService: UserService) {}

}
