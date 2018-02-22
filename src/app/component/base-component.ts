import {MatSnackBar} from '@angular/material';
import {Notification} from '../model/notification';
import {StompClientService} from '../service/stomp-client.service';

export class BaseComponent {

  public loading: boolean;

  constructor(protected stompClient: StompClientService, protected snackBar: MatSnackBar) {
  }

  protected baseOnInit() {
    this.stompClient.subscribeNotification((notification: Notification) => {
      this.snackBar.open(notification.message, notification.action, {duration: 3000});
    });
  }

  protected baseOnDestroy() {
    this.stompClient.unsubscribeNotification();
  }

  protected handleHttpError(error) {
    console.log(error);
    const message = error.error ? error.error.message : error.message;
    this.snackBar.open('Error occurred', message, {duration: 3000});
    this.loading = false;
  }

}
