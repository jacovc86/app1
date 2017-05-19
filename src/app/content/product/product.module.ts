import { SharedModule } from './../../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitComponent } from './submit/submit.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [SubmitComponent],
  exports: [
    SubmitComponent
  ]
})
export class ProductModule { }
