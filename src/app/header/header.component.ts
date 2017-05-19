import { Component, OnChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <app-login></app-login>
  `,
  styles: [
    `
      :host {
        width: 100%;
        display: block;
      }
    `
  ]
})
export class HeaderComponent implements OnChanges {
  constructor() { }

  ngOnChanges(changes) {
    console.log('ngOnChanges - propertyName = ' + changes['searchInputTerm'].currentValue);
  }

  search(searchTerm: string) {
    console.log(searchTerm);
  }
}
