import { SharedModule } from './../../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [PageComponent],
  exports: [
    PageComponent
  ]
})
export class HomeModule { }
