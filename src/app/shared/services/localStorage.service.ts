import { Injectable } from '@angular/core';

const JWT_TOKEN = 'jwtToken';
const USER_KEY = 'auth-user'
@Injectable({
    providedIn: 'root'
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
    
      public getUser() {
        return JSON.parse(sessionStorage.getItem(USER_KEY));
      }
}