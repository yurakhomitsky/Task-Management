import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthCredentials } from '../types/authCredentials.interface';
import { SigninResponse } from '../types/signinResponse.interface';
import { LocalStorageService } from '../../shared/services/localStorage.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private endPoint = 'auth/'
    constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {
    }

    signUp(body: AuthCredentials): Observable<any> {
        return this.httpClient.post(`${this.endPoint}signUp`, body);
    }

    signin(body: AuthCredentials): Observable<SigninResponse> {
        return this.httpClient.post<SigninResponse>(`${this.endPoint}signin`, body).pipe(
            tap((token) => this.localStorageService.saveToken(token.accessToken))
        );
    }
}