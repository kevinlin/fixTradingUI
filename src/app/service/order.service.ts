import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { Order } from '../model/order';
import { StompClientService } from './stomp-client.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public todayOrdersSubject = new BehaviorSubject<Order[]>([]);

  private orderUrl = '/api/order';

  constructor(private httpClient: HttpClient, private stompClientService: StompClientService) {
    stompClientService.subscribeTodayOrders()
      .subscribe((message: Message) => {
        const orders = JSON.parse(message.body);
        console.log(orders);
        this.todayOrdersSubject.next(orders);
      });
  }

  public getTodayOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.orderUrl + '/today');
  }

  public refreshTodayOrders() {
    this.getTodayOrders().subscribe(result => {
      console.log(result);
      this.todayOrdersSubject.next(result);
    });
  }

}
