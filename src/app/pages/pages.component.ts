import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-page-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-page-layout>
  `,
})

export class PagesComponent {
  menu = MENU_ITEMS;
}
