import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoaderService } from '../components/loader/loader.service';
import { finalize, delay, catchError } from 'rxjs/operators';
import { LocalStorageService } from '../services/localStorage.service';
import { Router } from '@angular/router';
import { MessagesService } from '../components/messages/messages.service';
import { MessagesTypes } from '../components/messages/messages.types.enum';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class HttpConfigInterceptor implements HttpConfigInterceptor {
    requestCount = 0;
    constructor(
        private loaderService: LoaderService, 
        private token: LocalStorageService, 
        private router: Router, 
        private messageService: MessagesService) { }

    private baseURL = environment.apiUrl;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.requestCount++;
        this.loaderService.show();

        let apiReq = request.clone({ url: `${this.baseURL}/${request.url}` });

        const token = this.token.getToken();
        if (token !== null) {
            apiReq = apiReq.clone({
                headers: request.headers.set(TOKEN_HEADER_KEY,
                    "Bearer " + token)
            });
        }

        return next.handle(apiReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 || error.status === 403) {
                    this.router.navigate(['login']);
                    this.messageService.showMessage(MessagesTypes.INFO, 'You are not login')
                }
                 return throwError(error);
            }),
            finalize(() => {
                this.requestCount--;
                if (this.requestCount === 0) {
                    this.loaderService.hide();
                }
            })
        );
    }
}
