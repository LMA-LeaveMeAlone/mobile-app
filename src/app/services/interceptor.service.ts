import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest  } from '@angular/common/http';
import { AuthService } from './auth.service';
import { from } from 'rxjs/';
@Injectable()
export class InterceptorService implements HttpInterceptor{

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // convert promise to observable using 'from' operator
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const accessToken = await this.auth.getAccessToken();
    const authReq = req.clone({
      setHeaders: {
        authorization: 'Bearer ' + accessToken.value
      }
    });
    return next.handle(authReq).toPromise();
  }
}
