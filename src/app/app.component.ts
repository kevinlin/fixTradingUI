import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as LogRocket from 'logrocket';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  navLinks = [
    { path: '/instruments', label: 'Instruments' },
    { path: '/strategies', label: 'Trading Strategies' },
    { path: '/operations', label: 'Trading Operations' },
    { path: '/executions', label: 'Trading Executions' },
    // { path: '/parameters', label: 'Trading Parameters' },
    // { path: '/tradingSession', label: 'Trading Session' },
    // { path: '/tradingState', label: 'Trading State' }
    { path: '/login', label: 'Logout' }
  ];
  title: string;
  currentUser: User;

  private static capitalize(string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, public viewRef: ViewContainerRef) {
    if (environment.production) {
      LogRocket.init('rsvpaj/fixtrading');
    }

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd) {
          // console.log(event);
          this.title = AppComponent.capitalize(event.url.slice(1));
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
      }
    );
  }

}
