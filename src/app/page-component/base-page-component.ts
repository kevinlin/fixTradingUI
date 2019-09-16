import {ApplicationRef, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Message} from '@stomp/stompjs';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import {takeUntil} from 'rxjs/operators';

import {AppComponent} from '../app.component';
import {AlertDialogComponent} from '../component/alert-dialog/alert-dialog.component';
import {Notification} from '../model/notification';
import {StompClientService} from '../service/stomp-client.service';
import {ToastsManager} from '../toast/toasts-manager.service';

export class BasePageComponent implements OnDestroy {
  public loading: boolean;

  constructor(protected stompClient: StompClientService, protected toastr: ToastsManager, protected appRef: ApplicationRef, protected dialog: MatDialog) {
    this.toastr.setRootViewContainerRef((appRef.components[0].instance as AppComponent).viewRef);
  }

  ngOnDestroy(): void {
  }

  protected baseOnInit() {
    try {
      this.stompClient.notificationObservable.pipe(takeUntil(componentDestroyed(this))).subscribe((message: Message) => {
        const notification: Notification = JSON.parse(message.body);
        this.toastr.info(notification.message, notification.action);
      });
    } catch (err) {
      console.log('baseOnInit()->', err);
    }
    try {
      this.stompClient.warningObservable.pipe(takeUntil(componentDestroyed(this))).subscribe((message: Message) => {
        const notification: Notification = JSON.parse(message.body);
        this.toastr.warning(notification.message, notification.action);
      });
    } catch (err) {
      console.log('baseOnInit()->', err);
    }
    try {
      this.stompClient.alertObservable.pipe(takeUntil(componentDestroyed(this))).subscribe((message: Message) => {
        const notification: Notification = JSON.parse(message.body);
        this.toastr.error(notification.message, notification.action);
        const dialogRef = this.dialog.open(AlertDialogComponent, {
          data: notification
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog is closed with result: ${result}`);
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
