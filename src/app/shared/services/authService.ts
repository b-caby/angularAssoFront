import { Injectable }                  from "@angular/core";
import { HttpClient }                  from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { environment } from "../../../environments/environment";
import { AuthInfo }    from "../models/authInfo";

@Injectable({
    providedIn: "root"
})

export class AuthService {
    private url: string;
    private userSubject: BehaviorSubject<AuthInfo>;

    constructor(private http: HttpClient) {
        this.url = environment.endpoint;
        this.userSubject = new BehaviorSubject<AuthInfo>(this.getUser());
    }

    public get user(): AuthInfo {
        return this.userSubject.value;
    }

    public login(login: string, password: string) {
        return this.http.post(`${this.url}/api/auth`, { login, password });
    }

    public setSession(token: string) {
        localStorage.setItem("id_token", token);
        this.userSubject.next(this.getUser());
    }

    public logout() {
        localStorage.removeItem("id_token");
        this.userSubject.next(null);
    }

    public isLoggedIn() {
        const token = localStorage.getItem("id_token");
        return !!token;
    }

    public getUser() {
        const payload = localStorage.getItem("id_token");
        const decoded = (!!payload) ? JSON.parse(window.atob(payload.split(".")[1])) : {};
        return Object.assign(new AuthInfo(), decoded);
    }
}
