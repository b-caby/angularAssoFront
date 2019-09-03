import { Component, OnInit }                  from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute }             from "@angular/router";
import { MatSnackBar }                        from "@angular/material";

import { AuthService }            from "../shared/services/authService";
import { ErrorSnackbarComponent } from "../components/error-snackbar/error-snackbar.component";

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
              private service: AuthService,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.authFormGroup = this.formBuilder.group({
      login: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || "";
  }

  public submit() {
    const login = this.authFormGroup.get("login").value;
    const password = this.authFormGroup.get("password").value;

    this.service.login(login, password).subscribe((data: string) => {
      if (data === "") {
        this.snackbar.openFromComponent(ErrorSnackbarComponent, { duration: 3000 });
      } else {
        this.service.setSession(data);
        this.router.navigateByUrl(this.returnUrl);
      }
    }, (err: any) => {
      this.snackbar.openFromComponent(ErrorSnackbarComponent, { duration: 3000 });
    });
    this.router.navigate([this.returnUrl]);
  }
}
