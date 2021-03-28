import {ApplicationRef, Component, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Message} from '@stomp/stompjs';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AppComponent} from '../app.component';
import {AlertDialogComponent} from '../component/alert-dialog/alert-dialog.component';
import {Notification} from '../model/notification';
import {StompClientService} from '../service/stomp-client.service';
import {ToastsManager} from '../toast/toasts-manager.service';

@Component({
  selector: `app-base-page-component`,
  template: '<div></div>'
})
export class BasePageComponent implements OnDestroy {
  protected unsubscribe$ = new Subject<void>();
  public loading: boolean;

  constructor(protected stompClient: StompClientService, protected toastr: ToastsManager, protected appRef: ApplicationRef, protected dialog: MatDialog) {
    this.toastr.setRootViewContainerRef((appRef.components[0].instance as AppComponent).viewRef);
  }

  ngOnDestroy(): void {
    console.log('BasePageComponent.ngOnDestroy()->');
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  protected baseOnInit() {
    try {
      this.stompClient.notificationObservable.pipe(takeUntil(this.unsubscribe$))
        .subscribe((message: Message) => {
          const notification: Notification = JSON.parse(message.body);
          this.toastr.info(notification.message, notification.action);
        });
      this.stompClient.warningObservable.pipe(takeUntil(this.unsubscribe$))
        .subscribe((message: Message) => {
          const notification: Notification = JSON.parse(message.body);
          this.toastr.warning(notification.message, notification.action);
        });
      this.stompClient.alertObservable.pipe(takeUntil(this.unsubscribe$))
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
