import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdInputModule, MdCardModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared.module';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { UserService } from '../services/user.service';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [UserService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HeaderComponent, LoginComponent],
  exports: [HeaderComponent]
})
export class HeaderModule { }
