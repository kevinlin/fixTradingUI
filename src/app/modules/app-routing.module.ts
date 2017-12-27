import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InstrumentsComponent} from '../instruments/instruments.component';
import {ParametersComponent} from '../parameters/parameters.component';
import {TradingSessionComponent} from '../trading-session/trading-session.component';

const routes: Routes = [
  {path: '', redirectTo: '/tradingSession', pathMatch: 'full'},
  {path: 'instruments', component: InstrumentsComponent},
  {path: 'parameters', component: ParametersComponent},
  {path: 'tradingSession', component: TradingSessionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
