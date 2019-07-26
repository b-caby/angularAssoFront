import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})

export class ConcertService {

  private url = environment.endpoint;

  constructor(private http: HttpClient) { }

  public getAllConcerts() {
    return this.http.get(`${this.url}/api/concerts`);
  }

  public GetConcertDetails(id: number) {
    return this.http.get(`${this.url}/api/concerts/${id}`);
  }
}
