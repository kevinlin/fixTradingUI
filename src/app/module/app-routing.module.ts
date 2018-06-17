import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstrumentsComponent } from '../component/instruments/instruments.component';
import { ParametersComponent } from '../component/parameters/parameters.component';
import { TradingSessionComponent } from '../component/trading-session/trading-session.component';
import { TradingStateComponent } from '../component/trading-state/trading-state.component';
import { TradingStrategyListComponent } from '../component/trading-strategy-list/trading-strategy-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/tradingSession' },
  { path: 'instruments', component: InstrumentsComponent },
  { path: 'parameters', component: ParametersComponent },
  { path: 'tradingSession', component: TradingSessionComponent },
  { path: 'tradingState', component: TradingStateComponent },
  { path: 'strategies', component: TradingStrategyListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
