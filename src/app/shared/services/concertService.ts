import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";
import { Concert }     from "../models/concert";

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

  public createConcert(concert: Concert) {
    return this.http.post(`${this.url}/api/concerts`, concert);
  }

  public modifyConcert(id: number, concert: Concert) {
    return this.http.post(`${this.url}/api/concerts/${id}`, concert);
  }

  public deleteConcert(id: number) {
    return this.http.delete(`${this.url}/api/concerts/${id}`);
  }
}
