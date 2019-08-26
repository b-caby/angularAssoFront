import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-error-snackbar",
  templateUrl: "./error-snackbar.component.html"
})
export class ErrorSnackbarComponent implements OnInit {
  public errorMessage: string;

  constructor() { }

  ngOnInit() {
    this.errorMessage = "Une erreur est survénue. Merci de réessayer l'opération.";
  }

}
