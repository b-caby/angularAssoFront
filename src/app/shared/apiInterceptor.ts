import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

import { LoaderService } from "./services/loaderService";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private loaderService: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();
        request = request.clone({
            setHeaders: {
                // tslint:disable-next-line: max-line-length
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwibG9naW4iOiJnLmNhbmVwYSIsInJvbGUiOiJtdXNpY2llbiIsImlhdCI6MTU2MTA1NDg1N30.48lEe2cCE9pB1NhbEyku8FUf-KMVw2PQhKCq0UOoub0`
            }
        });

        return next.handle(request).pipe(
            finalize(() => {
                this.loaderService.hide();
            })
        );
    }
}
