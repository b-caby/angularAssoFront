import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./services/authService";

@Injectable({
    providedIn: "root"
})

export class AuthGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.isLoggedIn()) {
            return true;
        }

        this.router.navigate(["/auth"], { queryParams: { returnUrl: state.url } } );
        return false;
    }
}