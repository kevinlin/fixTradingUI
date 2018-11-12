import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {ErrorHandler, Injectable, InjectionToken, Injector} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {
  }

  handleError(error) {
    const snackBar = this.injector.get<MatSnackBar>(new InjectionToken<string>('MatSnackBar'));
    const location = this.injector.get<LocationStrategy>(new InjectionToken<string>('LocationStrategy'));

    const message = error.message ? error.message : error.toString();
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    console.log({ message, url });
    snackBar.open(url, message, { duration: 3000 });

    throw error;
  }

}
