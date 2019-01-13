import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Message} from '@stomp/stompjs';
import {BehaviorSubject, Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {Order} from '../model/order';
import {StompClientService} from './stomp-client.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public todayOrdersSubject = new BehaviorSubject<Order[]>([]);
  public historyOrderSubject = new BehaviorSubject<Order[]>([]);

  private orderUrl = '/api/order';

  constructor(private httpClient: HttpClient, private stompClientService: StompClientService) {
    stompClientService.todayOrdersDataObservable
      .subscribe((message: Message) => {
        const todayOrders = JSON.parse(message.body);
        console.log('OrderService.todayOrders[...]->', todayOrders);
        this.todayOrdersSubject.next(todayOrders);
      });
  }

  public getTodayOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.orderUrl + '/today').pipe(shareReplay(1));
  }

  public refreshTodayOrders() {
    this.getTodayOrders().subscribe(result => {
      this.todayOrdersSubject.next(result);
    });
  }

  public queryOrdersByDate(date: Date): Observable<Order[]> {
    const observable = this.httpClient.get<Order[]>(this.orderUrl + '/' + date).pipe(shareReplay());
    observable.subscribe(orders => this.historyOrderSubject.next(orders));

    return observable;
  }

}
