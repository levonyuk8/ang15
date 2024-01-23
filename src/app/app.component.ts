import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <app-toaster></app-toaster>`
})
export class AppComponent {
}
