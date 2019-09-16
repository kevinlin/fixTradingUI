import {ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, NgZone, ViewContainerRef} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {Toast} from './toast';
import {ToastContainerComponent} from './toast-container/toast-container.component';
import {ToastOptions} from './toast-options';

@Injectable()
export class ToastsManager {
  public static KEY = 'ToastsManager.notifications';

  container: ComponentRef<any>;

  private index = 0;
  private toastClicked: Subject<Toast> = new Subject<Toast>();
  private _rootViewContainerRef: ViewContainerRef;
  public notifications: Toast[];
  public notificationsSubject = new BehaviorSubject<Toast[]>([]);

  private static sortByTimestamp = (t1, t2) => {
    if (typeof t1.timestamp === 'string') {
      t1.timestamp = new Date(t1.timestamp);
    }
    if (typeof t2.timestamp === 'string') {
      t2.timestamp = new Date(t2.timestamp);
    }
    return t2.timestamp.getTime() - t1.timestamp.getTime();
  };

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private ngZone: NgZone,
    private appRef: ApplicationRef,
    private options: ToastOptions
  ) {
    const saved = localStorage.getItem(ToastsManager.KEY);
    if (saved) {
      this.notifications = JSON.parse(saved);
      this.onNotificationsChanged();
    } else {
      this.notifications = [];
    }
  }

  private onNotificationsChanged() {
    const sorted = this.notifications.sort(ToastsManager.sortByTimestamp);
    this.notificationsSubject.next(sorted);
    this.notifications = sorted;
    localStorage.setItem(ToastsManager.KEY, JSON.stringify(this.notifications));
  }

  deleteSingleToast(toast: Toast) {
    const index = this.notifications.findIndex(t => t.timestamp === toast.timestamp);
    if (index > -1) {
      this.notifications.splice(index, 1);
      this.onNotificationsChanged();
    }
  }

  clearSavedNotifications() {
    for (let i = this.notifications.length - 1; i >= 0; i--) {
      if (!this.notifications[i].pinned) {
        this.notifications.splice(i, 1);
      }
    }
    this.onNotificationsChanged();
  }

  setRootViewContainerRef(vRef: ViewContainerRef) {
    this._rootViewContainerRef = vRef;
  }

  onClickToast(): Observable<Toast> {
    return this.toastClicked.asObservable();
  }

  show(toast: Toast, options?: Object): Promise<Toast> {
    this.notifications.push(toast);
    this.onNotificationsChanged();

    return new Promise((resolve, reject) => {
      if (!this.container) {
        // get app root view component ref
        if (!this._rootViewContainerRef) {
          try {
            this._rootViewContainerRef = this.appRef.components[0].instance;
          } catch (e) {
            reject(
              new Error(
                'Please set root ViewContainerRef using setRootViewContainerRef(vRef: ViewContainerRef) method.'
              )
            );
          }
        }

        // create and load ToastContainerComponent
        const toastFactory = this.componentFactoryResolver.resolveComponentFactory(
          ToastContainerComponent
        );
        const childInjector = Injector.create({
          providers: [{ provide: ToastOptions, useValue: this.options }],
          parent: this._rootViewContainerRef.parentInjector
        });
        this.container = this._rootViewContainerRef.createComponent(
          toastFactory,
          this._rootViewContainerRef.length,
          childInjector
        );
        this.container.instance.onToastClicked = (newToast: Toast) => {
          this._onToastClicked(newToast);
        };

        this.container.instance.onExit().subscribe(() => {
          this.dispose();
        });
      }

      resolve(this.setupToast(toast, options));
    });
  }

  createTimeout(toast: Toast): any {
    let task = 0;
    this.ngZone.runOutsideAngular(() => {
      task = setTimeout(
        () => this.ngZone.run(() => this.clearToast(toast)),
        toast.config.toastLife
      );
    });

    return task.toString();
  }

  setupToast(toast: Toast, options?: any): Toast {
    toast.id = ++this.index;

    if (options && options.hasOwnProperty('toastLife')) {
      options.dismiss = 'auto';
    }

    const customConfig: any = Object.assign({}, this.options, options || {});

    Object.keys(toast.config).forEach(k => {
      if (customConfig.hasOwnProperty(k)) {
        toast.config[k] = customConfig[k];
      }
    });

    if (toast.config.dismiss === 'auto') {
      toast.timeoutId = this.createTimeout(toast);
    }

    this.container.instance.addToast(toast);
    return toast;
  }

  private _onToastClicked(toast: Toast) {
    this.toastClicked.next(toast);
    if (toast.config.dismiss === 'click') {
      this.clearToast(toast);
    }
  }

  dismissToast(toast: Toast) {
    this.clearToast(toast);
  }

  clearToast(toast: Toast) {
    if (this.container) {
      const instance = this.container.instance;
      instance.removeToast(toast);
    }
  }

  clearAllToasts() {
    if (this.container) {
      const instance = this.container.instance;
      instance.removeAllToasts();
      this.dispose();
    }
  }

  dispose() {
    if (this.container) {
      this.container.destroy();
      this.container = null;
    }
  }

  error(message: string, title?: string, options?: any): Promise<Toast> {
    title = (title ? title : 'Error') + ' (' + (new Date()).toLocaleTimeString() + ')';
    const data = options && options.data ? options.data : null;
    if (!options) {
      options = { dismiss: 'click' };
    }
    const toast = new Toast('error', message, title, data);
    toast.pinned = true;
    return this.show(toast, options);
  }

  info(message: string, title?: string, options?: any): Promise<Toast> {
    title = (title ? title : 'Notification') + ' (' + (new Date()).toLocaleTimeString() + ')';
    const data = options && options.data ? options.data : null;
    const toast = new Toast('info', message, title, data);
    return this.show(toast, options);
  }

  success(message: string, title?: string, options?: any): Promise<Toast> {
    title = (title ? title : 'Success') + ' (' + (new Date()).toLocaleTimeString() + ')';
    const data = options && options.data ? options.data : null;
    const toast = new Toast('success', message, title, data);
    return this.show(toast, options);
  }

  warning(message: string, title?: string, options?: any): Promise<Toast> {
    title = (title ? title : 'Warning') + ' (' + (new Date()).toLocaleTimeString() + ')';
    const data = options && options.data ? options.data : null;
    if (!options) {
      options = { dismiss: 'click' };
    }
    const toast = new Toast('warning', message, title, data);
    toast.pinned = true;
    return this.show(toast, options);
  }

  // allow user define custom background color and image
  custom(message: string, title?: string, options?: any): Promise<Toast> {
    const data = options && options.data ? options.data : null;
    const toast = new Toast('custom', message, title, data);
    return this.show(toast, options);
  }
}
