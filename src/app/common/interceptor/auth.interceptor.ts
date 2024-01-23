import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Injectable} from "@angular/core";

import {AuthService} from "../services/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept<T>(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const jwt = this.authService.token;

        if (!!jwt) {
            req = req.clone({setHeaders: {Authorization: `Bearer ${jwt}`}})
        }

        return next.handle(req).pipe(
            tap(() =>{})
            //REFRESH TOKEN
        );
    }

}