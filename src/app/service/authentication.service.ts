import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() {
  }

  login(username: string, password: string): Observable<User> {
    if (password == "sanhua") {
      const user = new User();
      user.username = username;
      user.password = password;
      user.firstName = username;
      localStorage.setItem('currentUser', JSON.stringify(user));

      return of(user);
    }

    return throwError('Username or password is incorrect');
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

}
