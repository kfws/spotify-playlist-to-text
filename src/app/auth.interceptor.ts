import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api/api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly apiService: ApiService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `${this.apiService.tokenType} ${this.apiService.token}`,
      },
    });
    return next.handle(request);
  }
}
