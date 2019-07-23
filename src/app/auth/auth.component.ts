import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../shared/services/authService";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  public authFormGroup: FormGroup;
  private returnUrl: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService) { }

  ngOnInit() {
    this.authFormGroup = this.formBuilder.group({
      login: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || "";
  }

  public submit() {
    this.auth.login();
    this.router.navigate([this.returnUrl]);
  }
}
