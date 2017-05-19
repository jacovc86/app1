import { HomeModule } from './home/home.module';
import { ProductModule } from './product/product.module';
import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeModule,
    ProductModule
  ],
  declarations: [],
  exports: [
    HomeModule, ProductModule
  ]
})
export class ContentModule { }
