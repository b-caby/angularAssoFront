import { Injectable }                                           from "@angular/core";
import { Router }                                               from "@angular/router";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable, throwError }                               from "rxjs";
import { catchError }                                           from "rxjs/operators";

import { ErrorsService } from "./services/errorsService";

@Injectable({
    providedIn: "root"
})

export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router,
                private errorsService: ErrorsService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            /*if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }*/
            const error = err.error.message || err.statusText;
            this.errorsService.show();
            return throwError(error);
        }));
    }
}
