import { Injectable }                  from "@angular/core";
import { HttpClient }                  from "@angular/common/http";
import { BehaviorSubject }             from "rxjs";
import { Base64 }                      from "js-base64";

import { environment } from "../../../environments/environment";
import { Credentials } from "../models/credentials";

@Injectable({
    providedIn: "root"
})

export class AuthService {
    private url: string;
    private userSubject: BehaviorSubject<Credentials>;

    constructor(private http: HttpClient) {
        this.url = environment.endpoint;
        this.userSubject = new BehaviorSubject<Credentials>(this.setUser());
    }

    public login(login: string, password: string) {
        return this.http.post(`${this.url}/api/auth`, { login, password });
    }

    public setSession(token: string) {
        localStorage.setItem("id_token", token);
        this.userSubject.next(this.setUser());
    }

    public setUser() {
        const token = localStorage.getItem("id_token");
        const payload = (!!token) ? JSON.parse(Base64.fromBase64(token.split(".")[1])) : {};
        return Object.assign(new Credentials(), payload);
    }

    public get user(): Credentials {
        return this.userSubject.value;
    }

    public logout() {
        localStorage.removeItem("id_token");
        this.userSubject.next(null);
    }

    public isLoggedIn() {
        const token = localStorage.getItem("id_token");
        return !!token;
    }
}
