import { Component, OnInit } from "@angular/core";
import { Subject }           from "rxjs";

import { ErrorsService } from "src/app/shared/services/errorsService";

@Component({
  selector: "app-error-handler",
  templateUrl: "./error-handler.component.html",
  styleUrls: ["./error-handler.component.scss"]
})
export class ErrorHandlerComponent implements OnInit {
  public hasErrors: Subject<boolean>;

  constructor(private service: ErrorsService) { }

  ngOnInit() {
    this.hasErrors = this.service.hasErrors;
  }
}
