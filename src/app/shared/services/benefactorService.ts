import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})

export class BenefactorService {

  private url = environment.endpoint;

  constructor(private http: HttpClient) { }

  public getAllBenefactors() {
    return this.http.get(`${this.url}/api/benefactors`);
  }
}
