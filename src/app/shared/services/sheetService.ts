import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})

export class SheetService {

  private url = environment.endpoint;

  constructor(private http: HttpClient) { }

  getAllSheets() {
    return this.http.get(`${this.url}/api/sheets`);
  }
}
