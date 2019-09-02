import { Injectable }      from "@angular/core";
import { HttpClient }      from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { environment } from "../../../environments/environment";
import { AuthInfo }    from "../models/authInfo";

@Injectable({
    providedIn: "root"
})

export class AuthService {

    private url = environment.endpoint;

    public user = new BehaviorSubject<AuthInfo>(this.getUser());

    constructor(private http: HttpClient) { }

    public login(login: string, password: string) {
        return this.http.post(`${this.url}/api/auth`, { login, password });
    }

    public setSession(token: string) {
        localStorage.setItem("id_token", token);
    }

    public logout() {
        localStorage.removeItem("id_token");
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
