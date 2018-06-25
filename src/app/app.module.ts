import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { InstrumentsComponent } from './component/instruments/instruments.component';
import { ParametersComponent } from './component/parameters/parameters.component';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { TradingExecutionDetailComponent } from './component/trading-execution-detail/trading-execution-detail.component';
import { TradingExecutionListComponent } from './component/trading-execution-list/trading-execution-list.component';
import { TradingSessionComponent } from './component/trading-session/trading-session.component';
import { TradingStateComponent } from './component/trading-state/trading-state.component';
import { TradingStrategyDetailComponent } from './component/trading-strategy-detail/trading-strategy-detail.component';
import { TradingStrategyListComponent } from './component/trading-strategy-list/trading-strategy-list.component';
import { TradingStrategyViewComponent } from './component/trading-strategy-view/trading-strategy-view.component';
import { AppRoutingModule } from './module/app-routing.module';
import { MaterialModule } from './module/material.module';
import { GlobalErrorHandler } from './service/global-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    InstrumentsComponent,
    ParametersComponent,
    SideNavComponent,
    TradingExecutionListComponent,
    TradingExecutionDetailComponent,
    TradingSessionComponent,
    TradingStateComponent,
    TradingStrategyDetailComponent,
    TradingStrategyListComponent,
    TradingStrategyViewComponent
  ],
  imports: [
    LayoutModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
