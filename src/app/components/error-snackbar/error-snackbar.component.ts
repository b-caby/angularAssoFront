import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-error-snackbar",
  template: `
    <span class="error-snackbar" style="font-family: 'Poppins', sans-serif">
      {{errorMessage}} 
    </span>
  `
})
export class ErrorSnackbarComponent implements OnInit {
  public errorMessage: string;

  constructor() { }

  ngOnInit() {
    this.errorMessage = "Une erreur est survénue. Merci de réessayer l'opération.";
  }

}
