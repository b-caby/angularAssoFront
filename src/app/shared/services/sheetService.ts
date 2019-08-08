import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";
import { Sheet }       from "../models/sheet";

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

  public deleteSheet(id: number) {
    return this.http.delete(`${this.url}/api/sheets/${id}`);
  }

  public createSheet(sheet: Sheet) {
    return this.http.post(`${this.url}/api/sheets`, sheet);
  }

  public modifySheet(id: number, sheet: Sheet) {
    return this.http.post(`${this.url}/api/sheets/${id}`, sheet);
  }
}
