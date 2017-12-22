import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url = '';

  constructor(private router: Router) {
    router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd) {
          // console.log(event);
          this.url = event.url;
        }
      }
    );
  }
}
