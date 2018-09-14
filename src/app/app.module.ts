import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotTableModule } from "@handsontable/angular";
import { StompConfig, StompService } from '@stomp/ng2-stompjs';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AlertDialogComponent } from './component/alert-dialog/alert-dialog.component';
import { ExecutionTableComponent } from './component/execution-table/execution-table.component';
import { InstrumentsComponent } from './component/instruments/instruments.component';
import { MarketWatcherComponent } from './component/market-watcher/market-watcher.component';
import { ParametersComponent } from './component/parameters/parameters.component';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { TradingExecutionComponent } from './component/trading-execution/trading-execution.component';
import { TradingOperationDetailComponent } from './component/trading-operation-detail/trading-operation-detail.component';
import { TradingOperationListComponent } from './component/trading-operation-list/trading-operation-list.component';
import { TradingSessionComponent } from './component/trading-session/trading-session.component';
import { TradingStateComponent } from './component/trading-state/trading-state.component';
import { TradingStrategyDetailComponent } from './component/trading-strategy-detail/trading-strategy-detail.component';
import { TradingStrategyListComponent } from './component/trading-strategy-list/trading-strategy-list.component';
import { TradingStrategyViewComponent } from './component/trading-strategy-view/trading-strategy-view.component';
import { AppRoutingModule } from './module/app-routing.module';
import { MaterialModule } from './module/material.module';

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
    BrowserModule,
    BrowserAnimationsModule,
    HotTableModule,
    AppRoutingModule,
    MaterialModule
  ],
  declarations: [
    AlertDialogComponent,
    AppComponent,
    ExecutionTableComponent,
    InstrumentsComponent,
    MarketWatcherComponent,
    ParametersComponent,
    SideNavComponent,
    TradingExecutionComponent,
    TradingOperationDetailComponent,
    TradingOperationListComponent,
    TradingSessionComponent,
    TradingStateComponent,
    TradingStrategyDetailComponent,
    TradingStrategyListComponent,
    TradingStrategyViewComponent
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
