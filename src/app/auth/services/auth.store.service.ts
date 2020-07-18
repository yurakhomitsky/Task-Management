import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthCredentials } from '../types/authCredentials.interface';
import { SigninResponse } from '../types/signinResponse.interface';
import { AuthService } from './auth.service';
import * as jwt_decode from 'jwt-decode';
import { catchError, map, tap } from 'rxjs/operators';
import { MessagesService } from '../../shared/components/messages/messages.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessagesTypes } from 'src/app/shared/components/messages/messages.types.enum';
import { LocalStorageService } from '../../shared/services/localStorage.service';
export interface User {
  id: number;
  username: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private subject = new BehaviorSubject<User>(null);

  user$: Observable<User> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private messageService: MessagesService,
    private localStorageService: LocalStorageService
  ) {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    const user = this.localStorageService.getUser();

    if (user) {
      this.subject.next(user);
    }
  }

  login(body: AuthCredentials): Observable<User> {
    return this.authService.signin(body).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.messageService.showMessage(
            MessagesTypes.WARNING,
            'Incorrect login or password'
          );
        }
        this.messageService.showMessage(
          MessagesTypes.ALERT,
          'Opps something went wrong'
        );
        return throwError(error);
      }),
      tap((user) => {
        this.subject.next(user);
      })
    );
  }

  registr(body: AuthCredentials): Observable<any> {
    return this.authService.signUp(body);
  }

  logout() {
    this.subject.next(null);
    this.authService.logout();
  }
}
