import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private navLinks = [
    {
      path: '/instruments',
      label: 'Instruments'
    },
    {
      path: '/parameters',
      label: 'Trading Parameters'
    },
    {
      path: '/tradingSession',
      label: 'Trading Session'
    }
  ];
  private title: string;

  constructor(private router: Router) {
    router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd) {
          // console.log(event);
          this.title = this.capitalize(event.url.slice(1));
        }
      }
    );
  }

  private capitalize(string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
