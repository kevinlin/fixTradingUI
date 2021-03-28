import {Injectable} from '@angular/core';
import * as LogRocket from 'logrocket';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loginStatus = new BehaviorSubject(false);
  currentUser = new BehaviorSubject(null);

  constructor() {
    const storedCurrentUser = localStorage.getItem('currentUser');
    if (storedCurrentUser !== null) {
      const username = JSON.parse(storedCurrentUser).username;
      this.loginStatus.next(true);
      this.currentUser.next(username);

      if (environment.production) {
        LogRocket.identify(username);
      }
    }
  }

  login(username: string, password: string): Observable<User> {
    if (password === 'xinyi') {
      const user = new User();
      user.username = username;
      user.password = password;
      user.firstName = username;
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.loginStatus.next(true);
      this.currentUser.next(username);

      if (environment.production) {
        LogRocket.identify(username);
      }

      return of(user);
    }

    return throwError('Username or password is incorrect');
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loginStatus.next(false);
    this.currentUser.next(null);
  }

}
