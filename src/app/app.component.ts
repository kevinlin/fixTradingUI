import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, ViewContainerRef} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import * as LogRocket from 'logrocket';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {AuthenticationService} from './service/authentication.service';

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
  showMenu: Observable<boolean>;

  navLinks = [
    { path: '/instruments', label: '可交易合约' },
    { path: '/strategies', label: '交易策略' },
    { path: '/operations', label: '交易计划' },
    { path: '/executions', label: '交易执行' },
    { path: '/orderBlotter', label: '委托单历史纪录' },
    { path: '/priceLevelHistory', label: '价差历史纪录' },
    { path: '/priceLevelDerivativeHistory', label: '价差二阶参数历史' },
    { path: '/intradayTradingParameter', label: '日间自动交易参数' },
    { path: '/notificationCenter', label: '消息中心' },
    // { path: '/parameters', label: '交易参数' },
    // { path: '/tradingSession', label: '交易时段' },
    // { path: '/tradingState', label: '交易状态' }
    { path: '/login', label: '登出' }
  ];
  title: string;

  private static capitalize(string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, public authenticationService: AuthenticationService, public viewRef: ViewContainerRef) {
    if (environment.production) {
      LogRocket.init('rsvpaj/fixtrading');
    }

    this.showMenu = combineLatest([this.authenticationService.loginStatus, this.isHandset$]).pipe(
      map((values) => values[0] && !values[1])
    );

    router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd) {
          // console.log(event);
          this.title = AppComponent.capitalize(event.url.slice(1));
        }
      }
    );
  }

}
