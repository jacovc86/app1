import { APP_ROUTES } from './app.routes';
import { CovalentCoreModule } from '@covalent/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from './../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { HeaderModule } from './header/header.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdInputModule, MdCardModule, MdTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdTabsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CovalentCoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],

  exports: [
    CommonModule,
    BrowserModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdTabsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CovalentCoreModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  declarations: []
})
export class SharedModule { }
