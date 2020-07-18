import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { User } from '../../auth/services/auth.store.service';
const JWT_TOKEN = 'jwtToken';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  signOut() {
    localStorage.clear();
  }

  public saveToken(token: string) {
    localStorage.removeItem(JWT_TOKEN);
    localStorage.setItem(JWT_TOKEN, token);
  }

  public getToken(): string {
    return localStorage.getItem(JWT_TOKEN);
  }

  public saveUser(user) {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): User {
    const token = this.getToken();
    if (token) {
      const { id, username } = jwt_decode(this.getToken());
      return {
        id,
        username,
      } as User;
    }
    return null;
  }
}
