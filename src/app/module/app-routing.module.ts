import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from '../component/login/login.component';
import {AuthGuard} from '../guard/auth.guard';
import {InstrumentsComponent} from '../page-component/instruments/instruments.component';
import {NotificationCenterComponent} from '../page-component/notification-center/notification-center.component';
import {OrderBlotterComponent} from '../page-component/order-blotter/order-blotter.component';
import {ParametersComponent} from '../page-component/parameters/parameters.component';
import {TradingExecutionComponent} from '../page-component/trading-execution/trading-execution.component';
import {TradingOperationListComponent} from '../page-component/trading-operation-list/trading-operation-list.component';
import {TradingSessionComponent} from '../page-component/trading-session/trading-session.component';
import {TradingStateComponent} from '../page-component/trading-state/trading-state.component';
import {TradingStrategyListComponent} from '../page-component/trading-strategy-list/trading-strategy-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/instruments' },
  { path: 'executions', component: TradingExecutionComponent, canActivate: [AuthGuard] },
  { path: 'instruments', component: InstrumentsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'notificationCenter', component: NotificationCenterComponent, canActivate: [AuthGuard] },
  { path: 'operations', component: TradingOperationListComponent, canActivate: [AuthGuard] },
  { path: 'orderBlotter', component: OrderBlotterComponent, canActivate: [AuthGuard] },
  { path: 'parameters', component: ParametersComponent, canActivate: [AuthGuard] },
  { path: 'strategies', component: TradingStrategyListComponent, canActivate: [AuthGuard] },
  { path: 'tradingSession', component: TradingSessionComponent, canActivate: [AuthGuard] },
  { path: 'tradingState', component: TradingStateComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    useHash: true,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
