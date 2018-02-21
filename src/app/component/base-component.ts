import {OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Notification} from '../model/notification';
import {StompClientService} from '../service/stomp-client.service';

export class BaseComponent implements OnInit {

  constructor(protected stompClient: StompClientService, protected snackBar: MatSnackBar) {
  }

  protected baseOnInit() {
    console.log('Base onInit');
    this.stompClient.subscribeNotification((notification: Notification) => {
      this.snackBar.open(notification.message, notification.action, {duration: 3000});
    });
  }

}
