import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {inject} from "@angular/core";

import {ToasterService, ToastTypes} from "../components/toaster";

export class ErrorsInterceptor implements HttpInterceptor {

    ts = inject(ToasterService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err) => {
                const {errors, Message} = err?.error
                // if (err.status === 400) {...}
                this.ts.create(errors || Message, ToastTypes.Error)
                throw err
            })
        )
    }
}