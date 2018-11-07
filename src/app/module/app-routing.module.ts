import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {InstrumentsComponent} from '../component/instruments/instruments.component';
import {LoginComponent} from '../component/login/login.component';
import {ParametersComponent} from '../component/parameters/parameters.component';
import {TradingExecutionComponent} from '../component/trading-execution/trading-execution.component';
import {TradingOperationListComponent} from '../component/trading-operation-list/trading-operation-list.component';
import {TradingSessionComponent} from '../component/trading-session/trading-session.component';
import {TradingStateComponent} from '../component/trading-state/trading-state.component';
import {TradingStrategyListComponent} from '../component/trading-strategy-list/trading-strategy-list.component';
import {AuthGuard} from '../guard/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/instruments' },
  { path: 'instruments', component: InstrumentsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'parameters', component: ParametersComponent, canActivate: [AuthGuard] },
  { path: 'tradingSession', component: TradingSessionComponent, canActivate: [AuthGuard] },
  { path: 'tradingState', component: TradingStateComponent, canActivate: [AuthGuard] },
  { path: 'strategies', component: TradingStrategyListComponent, canActivate: [AuthGuard] },
  { path: 'operations', component: TradingOperationListComponent, canActivate: [AuthGuard] },
  { path: 'executions', component: TradingExecutionComponent, canActivate: [AuthGuard] }
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
