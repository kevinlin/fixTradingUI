import {ApplicationRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {StompClientService} from '../../service/stomp-client.service';
import {ToastsManager} from '../../toast/toasts-manager.service';
import {BasePageComponent} from '../base-page-component';

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.css']
})
export class NotificationCenterComponent extends BasePageComponent implements OnInit, OnDestroy {
  constructor(protected stompClient: StompClientService, public toastr: ToastsManager, protected appRef: ApplicationRef, protected dialog: MatDialog) {
    super(stompClient, toastr, appRef, dialog);
  }

  ngOnInit() {
    this.baseOnInit();
  }

  getToastStyle(type: string) {
    switch (type) {
      case 'success':
        return 'table-success';
      case 'info':
        return 'table-info';
      case 'warning':
        return 'table-warning';
      case 'error':
        return 'table-danger';
      default:
        return '';
    }
  }

}
