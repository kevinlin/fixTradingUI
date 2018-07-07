import { OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Message } from '@stomp/stompjs';
import { componentDestroyed } from 'ng2-rx-componentdestroyed';
import { takeUntil } from 'rxjs/operators';

import { Notification } from '../model/notification';
import { StompClientService } from '../service/stomp-client.service';

export class BaseComponent implements OnDestroy {

  public loading: boolean;

  constructor(protected stompClient: StompClientService, protected snackBar: MatSnackBar) {
  }

  ngOnDestroy(): void {
  }

  protected baseOnInit() {
    const observable = this.stompClient.subscribeNotification();
    if (observable) {
      observable.pipe(takeUntil(componentDestroyed(this)))
        .subscribe((message: Message) => {
          const notification: Notification = JSON.parse(message.body);
          this.snackBar.open(notification.message, notification.action, { duration: 3000 });
        });
    }
  }

  protected handleHttpError(error) {
    console.log(error);
    const message = error.error ? error.error.message : error.message;
    this.snackBar.open('Error occurred', message, { duration: 3000 });
    this.loading = false;
  }

}
