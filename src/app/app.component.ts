import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, ViewContainerRef} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import * as LogRocket from 'logrocket';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {User} from './model/user';

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
    { path: '/instruments', label: '可交易合约' },
    { path: '/strategies', label: '交易策略' },
    { path: '/operations', label: '交易操作' },
    { path: '/executions', label: '交易计划' },
    { path: '/orderBlotter', label: '历史纪录' },
    { path: '/notificationCenter', label: '消息中心' },
    // { path: '/parameters', label: '交易参数' },
    // { path: '/tradingSession', label: '交易时段' },
    // { path: '/tradingState', label: '交易状态' }
    { path: '/login', label: '登出' }
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
    if (this.currentUser && environment.production) {
      LogRocket.identify(this.currentUser.username);
    }

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
