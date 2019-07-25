import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})

export class SheetService {

  private url = environment.endpoint;

  constructor(private http: HttpClient) { }

  public getAllSheets() {
    return this.http.get(`${this.url}/api/sheets`);
  }

  public getSheetDetails(id: number) {
    return this.http.get(`${this.url}/api/sheets/${id}`);
  }
}
