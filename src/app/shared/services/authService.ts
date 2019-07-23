import { Injectable } from "@angular/core";
import { JwtToken } from "../models/jwtToken";

@Injectable({
    providedIn: "root"
})

export class AuthService {

    constructor() { }

    public login() {
        // CALL THE API
        this.setSession();
    }

    public isLoggedIn() {
        const token = localStorage.getItem("id_token");
        return !!token;
    }

    public getUser(): JwtToken {
        // DECODE THE JWT
        const tokenInfos =  {
            id: 1,
            firstname: "Bérenger",
            lastname: "C.",
            role: "musicien"
        };
        return Object.assign(new JwtToken(), tokenInfos);
    }

    public logout() {
        localStorage.removeItem("id_token");
    }

    private setSession() {
        localStorage.setItem("id_token", "OK");
    }
}
