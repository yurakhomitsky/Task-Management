import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthCredentials } from '../types/authCredentials.interface';
import { SigninResponse } from '../types/signinResponse.interface';
import { LocalStorageService } from '../../shared/services/localStorage.service';
import { catchError, map, tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { User } from './auth.store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endPoint = 'auth/';
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  signUp(body: AuthCredentials): Observable<any> {
    return this.httpClient.post(`${this.endPoint}signUp`, body);
  }

  signin(body: AuthCredentials): Observable<User> {
    return this.httpClient
      .post<SigninResponse>(`${this.endPoint}signin`, body)
      .pipe(
        tap((token) => this.localStorageService.saveToken(token.accessToken)),
        map((data) => {
          const { id, username } = jwt_decode(data.accessToken);
          return {
            id,
            username,
          } as User;
        })
      );
  }

  logout() {
    this.localStorageService.signOut();
  }
}
