import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from'@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service'
import { nextTick } from 'q';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
   constructor(private auth: AuthenticationService) {}

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       console.log("intercept called");
       const authHeader  = 'Bearer' + this.auth.getToken();
       const authReq = req.clone({setHeaders: {Authorization: authHeader}})
       return next.handle(authReq)    
    }
}   