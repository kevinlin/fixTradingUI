import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from './material.module';

import {AppComponent} from './app.component';
import {InstrumentsComponent} from './instruments/instruments.component';
import {ParametersComponent} from './parameters/parameters.component';
import {TradingSessionComponent} from './trading-session/trading-session.component';

import {GlobalErrorHandler} from './service/global-error-handler';
import {InstrumentService} from './service/instrument.service';
import {ParametersService} from './service/parameters.service';
import {TradingSessionService} from './service/trading-session.service';

@NgModule({
  declarations: [
    AppComponent,
    InstrumentsComponent,
    ParametersComponent,
    TradingSessionComponent
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
