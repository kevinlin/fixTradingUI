import { ApplicationRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Message } from '@stomp/stompjs';
import { componentDestroyed } from 'ng2-rx-componentdestroyed';
import { takeUntil } from 'rxjs/operators';

import { AppComponent } from '../app.component';
import { Notification } from '../model/notification';
import { StompClientService } from '../service/stomp-client.service';
import { ToastsManager } from '../toast/toasts-manager.service';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

export class BaseComponent implements OnDestroy {

  public loading: boolean;

  constructor(protected stompClient: StompClientService, protected toastr: ToastsManager, protected appRef: ApplicationRef, protected dialog: MatDialog) {
    this.toastr.setRootViewContainerRef((appRef.components[0].instance as AppComponent).viewRef);
  }

  ngOnDestroy(): void {
  }

  protected baseOnInit() {
    const notifiObservable = this.stompClient.subscribeNotification();
    if (notifiObservable) {
      notifiObservable.pipe(takeUntil(componentDestroyed(this)))
        .subscribe((message: Message) => {
          const notification: Notification = JSON.parse(message.body);
          // this.snackBar.open(notification.message, notification.action, { duration: 3000 });
          this.toastr.info(notification.message, notification.action);
        });
    }
    const alertObservable = this.stompClient.subscribeAlert();
    if (alertObservable) {
      alertObservable.pipe(takeUntil(componentDestroyed(this)))
        .subscribe((message: Message) => {
          const notification: Notification = JSON.parse(message.body);
          this.toastr.error(notification.message, notification.action);
          const dialogRef = this.dialog.open(AlertDialogComponent, {
            data: notification
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog is closed with result: ${result}`);
          });
        });
    }
  }

  protected handleHttpError(error) {
    console.log(error);
    const message = error.error ? error.error.message : error.message;
    // this.snackBar.open('Error occurred', message, { duration: 3000 });
    this.toastr.error(message, "HTTP Error");
    this.loading = false;
  }

}
