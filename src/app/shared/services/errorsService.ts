import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class ErrorsService {

    public hasErrors = new BehaviorSubject<boolean>(false);

    show() {
        this.hasErrors.next(true);
    }

    hide() {
       this.hasErrors.next(false);
    }
}
