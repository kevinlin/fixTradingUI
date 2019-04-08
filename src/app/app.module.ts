import {LayoutModule} from '@angular/cdk/layout';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HotTableModule} from '@handsontable-pro/angular';
import {StompConfig, StompService} from '@stomp/ng2-stompjs';

import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {AlertDialogComponent} from './component/alert-dialog/alert-dialog.component';
import {ExecutionTableComponent} from './component/execution-table/execution-table.component';
import {IntradayTradingParameterDetailComponent} from './component/intraday-trading-parameter-detail/intraday-trading-parameter-detail.component';
import {LoginComponent} from './component/login/login.component';
import {MarketWatcherComponent} from './component/market-watcher/market-watcher.component';
import {TradingOperationDetailComponent} from './component/trading-operation-detail/trading-operation-detail.component';
import {TradingStrategyDetailComponent} from './component/trading-strategy-detail/trading-strategy-detail.component';
import {TradingStrategyViewComponent} from './component/trading-strategy-view/trading-strategy-view.component';
import {AppRoutingModule} from './module/app-routing.module';
import {MaterialModule} from './module/material.module';
import {InstrumentsComponent} from './page-component/instruments/instruments.component';
import {IntradayTradingParameterListComponent} from './page-component/intraday-trading-parameter-list/intraday-trading-parameter-list.component';
import {NotificationCenterComponent} from './page-component/notification-center/notification-center.component';
import {OrderBlotterComponent} from './page-component/order-blotter/order-blotter.component';
import {ParametersComponent} from './page-component/parameters/parameters.component';
import {PriceLevelDerivativeHistoryComponent} from './page-component/price-level-derivative-history/price-level-derivative-history.component';
import {PriceLevelHistoryComponent} from './page-component/price-level-history/price-level-history.component';
import {TradingExecutionComponent} from './page-component/trading-execution/trading-execution.component';
import {TradingOperationListComponent} from './page-component/trading-operation-list/trading-operation-list.component';
import {TradingSessionComponent} from './page-component/trading-session/trading-session.component';
import {TradingStateComponent} from './page-component/trading-state/trading-state.component';
import {TradingStrategyListComponent} from './page-component/trading-strategy-list/trading-strategy-list.component';
import {ToastModule} from './toast/toast-module';

const stompConfig: StompConfig = {
  // Which server?
  // url: 'ws://127.0.0.1:15674/ws',
  url: environment.stompUrl,
  // url: () => {
  //   return new SockJS('/stomp');
  // },

  // Headers
  // Typical keys: login, passcode, host
  headers: {
    login: 'guest',
    passcode: 'guest'
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 5000 (5 seconds)
  reconnect_delay: 5000,

  // Will log diagnostics on console
  debug: !environment.production
};

@NgModule({
  imports: [
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HotTableModule,
    AppRoutingModule,
    HotTableModule.forRoot(),
    MaterialModule,
    ToastModule.forRoot(),
  ],
  declarations: [
    AlertDialogComponent,
    AppComponent,
    ExecutionTableComponent,
    InstrumentsComponent,
    IntradayTradingParameterDetailComponent,
    IntradayTradingParameterListComponent,
    LoginComponent,
    MarketWatcherComponent,
    NotificationCenterComponent,
    OrderBlotterComponent,
    ParametersComponent,
    PriceLevelDerivativeHistoryComponent,
    PriceLevelHistoryComponent,
    TradingExecutionComponent,
    TradingOperationDetailComponent,
    TradingOperationListComponent,
    TradingSessionComponent,
    TradingStateComponent,
    TradingStrategyDetailComponent,
    TradingStrategyListComponent,
    TradingStrategyViewComponent,
  ],
  entryComponents: [
    AlertDialogComponent
  ],
  providers: [
    // {
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandler
    // },
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
