import {ApplicationRef} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Message} from '@stomp/stompjs';

import {AppComponent} from '../app.component';
import {AlertDialogComponent} from '../component/alert-dialog/alert-dialog.component';
import {Notification} from '../model/notification';
import {StompClientService} from '../service/stomp-client.service';
import {ToastsManager} from '../toast/toasts-manager.service';

export class BasePageComponent {
  public loading: boolean;

  constructor(protected stompClient: StompClientService, protected toastr: ToastsManager, protected appRef: ApplicationRef, protected dialog: MatDialog) {
    this.toastr.setRootViewContainerRef((appRef.components[0].instance as AppComponent).viewRef);
  }

  protected baseOnInit() {
    try {
      this.stompClient.notificationObservable.subscribe((message: Message) => {
        const notification: Notification = JSON.parse(message.body);
        this.toastr.info(notification.message, notification.action);
      });
      this.stompClient.warningObservable.subscribe((message: Message) => {
        const notification: Notification = JSON.parse(message.body);
        this.toastr.warning(notification.message, notification.action);
      });
      this.stompClient.alertObservable.subscribe((message: Message) => {
        const notification: Notification = JSON.parse(message.body);
        this.toastr.error(notification.message, notification.action);
        this.dialog.open(AlertDialogComponent, {
          data: notification
        });
      });
    } catch (err) {
      console.log('baseOnInit()->', err);
    }
  }

  protected handleHttpError(error) {
    console.log(error);
    const message = error.error ? error.error.message : error.message;
    this.toastr.error(message, 'HTTP Error');
    this.loading = false;
  }

}
