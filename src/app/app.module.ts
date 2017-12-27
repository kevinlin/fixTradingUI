import {ErrorHandler, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './module/app-routing.module';
import {MaterialModule} from './module/material.module';

import {AppComponent} from './app.component';
import {InstrumentsComponent} from './component/instruments/instruments.component';
import {ParametersComponent} from './component/parameters/parameters.component';
import {TradingSessionComponent} from './component/trading-session/trading-session.component';
import {TradingStateComponent} from './component/trading-state/trading-state.component';

import {GlobalErrorHandler} from './service/global-error-handler';
import {InstrumentService} from './service/instrument.service';
import {ParametersService} from './service/parameters.service';
import {TradingSessionService} from './service/trading-session.service';
import {TradingStateService} from './service/trading-state.service';

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
    InstrumentService,
    ParametersService,
    TradingSessionService,
    TradingStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
