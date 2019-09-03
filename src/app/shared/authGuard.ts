import { Injectable }                                                       from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { AuthService } from "./services/authService";

@Injectable({
    providedIn: "root"
})

export class AuthGuard implements CanActivate {
    constructor(private router: Router,
                private auth: AuthService) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.isLoggedIn()) {
            const currentUser = this.auth.user;
            if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
                this.router.navigate(["/"]);
                return false;
            }

            return true;
        }

        this.router.navigate(["/auth"], { queryParams: { returnUrl: state.url } } );
        return false;
    }
}
