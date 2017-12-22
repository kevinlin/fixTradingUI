import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {InstrumentsComponent} from './instruments/instruments.component';
import {ParametersComponent} from './parameters/parameters.component';

import {MaterialModule} from './material.module';
import {InstrumentService} from './service/instrument.service';
import {ParametersService} from './service/parameters.service';

@NgModule({
  declarations: [
    AppComponent,
    InstrumentsComponent,
    ParametersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    InstrumentService,
    ParametersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
