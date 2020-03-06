import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-auth-error",
  template: `
    <div style="text-align: center">
        <span style="font-family: 'Poppins', sans-serif">
            {{errorMessage}}
        </span>
    </div>
  `
})
export class AuthErrorComponent implements OnInit {
  public errorMessage: string;

  constructor() {}

  ngOnInit() {
      this.errorMessage = "Login/mot de passe incorrect.";
  }
}
