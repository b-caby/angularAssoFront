import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class FilterService {
    private sheetFilter: string;
    private concertFilter: string;
    private benefactorFilter: string;
    private userFilter: string;

    getFilter(url: string): string {
        switch(url) {
            case "/sheets":
                return this.sheetFilter;
            case "/concerts":
                return this.concertFilter;
            case "/benefactors":
                return this.benefactorFilter;
            case "/users":
                return this.userFilter;
        }
    }

    setFilter(url: string, filter: string) {
        switch(url) {
            case "/sheets":
                this.sheetFilter = filter;
                break;
            case "/concerts":
                this.concertFilter = filter;
                break;
            case "/benefactors":
                this.benefactorFilter = filter;
                break;
            case "/users":
                this.userFilter = filter;
                break;
        }
    }
}