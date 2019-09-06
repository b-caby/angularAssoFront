import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})

export class UserService {

  private url = environment.endpoint;

  constructor(private http: HttpClient) { }

  public getAccount() {
    return this.http.get(`${this.url}/api/users/account`);
  }

  public getAttendance() {
    return this.http.get(`${this.url}/api/users/attendance`);
  }
}
