import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Instrument} from '../model/instrument';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  constructor(private httpClient: HttpClient) {
  }

  private instrumentsUrl = '/api/instrument';

  public getAllInstruments(): Observable<Instrument[]> {
    return this.httpClient.get<Instrument[]>(this.instrumentsUrl + '/all');
  }

  public getInstruments(exchange: string): Observable<Instrument[]> {
    return this.httpClient.get<Instrument[]>(this.instrumentsUrl + '/' + exchange);
  }

  public hideInstrument(symbol: string): Observable<Instrument> {
    return this.httpClient.patch<Instrument>(this.instrumentsUrl + '/' + symbol + '/hide', null);
  }

  public unhideInstrument(symbol: string): Observable<Instrument> {
    return this.httpClient.patch<Instrument>(this.instrumentsUrl + '/' + symbol + '/unhide', null);
  }

}
