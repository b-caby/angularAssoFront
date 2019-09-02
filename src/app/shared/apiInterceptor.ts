import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Injectable }                                           from "@angular/core";
import { Observable }                                           from "rxjs";
import { finalize }                                             from "rxjs/operators";

import { LoaderService } from "./services/loaderService";
import { ErrorsService } from "./services/errorsService";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private loaderService: LoaderService,
                private errorsService: ErrorsService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.errorsService.hide();
        this.loaderService.show();
        const token = localStorage.getItem("id_token");
        request = request.clone({
            setHeaders: {
                // tslint:disable-next-line: max-line-length
                Authorization: `Bearer ${token}`
            }
        });

        return next.handle(request).pipe(
            finalize(() => {
                this.loaderService.hide();
            })
        );
    }
}
