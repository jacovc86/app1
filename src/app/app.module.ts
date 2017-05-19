import { APP_ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { ContentModule } from './content/content.module';
import { SharedModule } from './shared.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(APP_ROUTES),
    HeaderModule,
    ContentModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
