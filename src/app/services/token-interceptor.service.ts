import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const authToken = this.authService.getToken();
    if (authToken) {
      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      // send cloned request with header to the next handler.
      return next.handle(authReq);
    } else {
      // otherwise send request without token
      return next.handle(req);
    }
  }
}
