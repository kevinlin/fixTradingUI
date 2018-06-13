import {HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {InstrumentsComponent} from './component/instruments/instruments.component';
import {ParametersComponent} from './component/parameters/parameters.component';
import {TradingSessionComponent} from './component/trading-session/trading-session.component';
import {TradingStateComponent} from './component/trading-state/trading-state.component';

import {AppRoutingModule} from './module/app-routing.module';
import {MaterialModule} from './module/material.module';

import {GlobalErrorHandler} from './service/global-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    InstrumentsComponent,
    ParametersComponent,
    TradingSessionComponent,
    TradingStateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    // InstrumentService,
    // ParametersService,
    // StompClientService,
    // StompService,
    // TradingSessionService,
    // TradingStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
