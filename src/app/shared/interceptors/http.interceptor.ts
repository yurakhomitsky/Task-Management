import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class HttpConfigInterceptor implements HttpConfigInterceptor {

    private baseURL = environment.apiUrl;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiReq = request.clone({ url: `${this.baseURL}/${request.url}` });
        return next.handle(apiReq);
    }
}