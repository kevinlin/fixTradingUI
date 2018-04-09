import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Instrument} from '../model/instrument';

@Injectable()
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

}
