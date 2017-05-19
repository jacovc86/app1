import { Subscription } from 'rxjs/Subscription';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { TdLoadingService } from '@covalent/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-page',
  template: `
    <div *ngIf="user">
      <md-list *tdLoading="'loadingMessages'; mode:'indeterminate'; type:'linear'; strategy:'replace'; color:'primary'">
        <md-list-item class="mat-elevation-z1" *ngFor="let message of messages$ | async">
          <a md-line>{{message.text}}</a>
          <button md-icon-button (click)="removeMessage (message)">
            <md-icon>remove_circle</md-icon>          
          </button>
        </md-list-item>
        <md-list-item class="pad-lg">
          <form (ngSubmit)="addMessage(newMessage.value); newMessage.value = ''; newMessage.focus()">
            <md-input-container>
              <input mdInput type="text" #newMessage autocomplete="off" placeholder="Add New Message">  
            </md-input-container>
            <button type="submit" md-icon-button color="primary">
              <md-icon>add_circle</md-icon>
            </button>
          </form>
        </md-list-item>
      </md-list>
    </div>
  `,
  styles: [
    `
    `
  ]
})
export class PageComponent implements OnInit {

  user: firebase.User;
  messages$: FirebaseListObservable<any>;
  messageSubscription: Subscription;

  constructor(private _db: AngularFireDatabase, private _userService: UserService, private _loadingService: TdLoadingService) { }

  ngOnInit() {
    this._userService.getCurrentUser().subscribe((user: firebase.User) => {
      this.user = user;
      this._loadingService.register('loadingMessages');
      if (user) {
        this.messages$ = this._db.list('/messages', {
          query: {
            orderByChild: 'user',
            equalTo: user.uid
          }
        });
        this.messageSubscription = this.messages$.subscribe(() => this._loadingService.resolve('loadingMessages'));
        this._userService.addUserSubscription(this.messageSubscription);
      } else if (this.messageSubscription) {
        this.messageSubscription.unsubscribe();
      }
    });
  }

  removeMessage(message) {
    this.messages$.remove(message.$key);
  }

  addMessage(text: string) {
    if (text.length > 0) {
      this.messages$.push({
        text: text,
        user: this.user.uid
      });
    }
  }

}
