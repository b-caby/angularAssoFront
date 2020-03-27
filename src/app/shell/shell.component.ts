import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { MatSidenav }                              from "@angular/material";
import { Subscription }                            from "rxjs";
import { Router }                                  from "@angular/router";

import { AuthService } from "../shared/services/authService";
import { Credentials } from "../shared/models/credentials";
import { Roles }       from "../shared/enums/roles";

@Component({
  selector: "app-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["../../../src/assets/css/shell.scss"]
})
export class ShellComponent implements OnInit, OnDestroy {

  @ViewChild("sidenav", {static: true}) sidenav: MatSidenav;
  private onOpened: Subscription;
  private onClosed: Subscription;

  public menuButtonStyle: string;
  public user: Credentials;
  public isOfficerOrAdmin: boolean;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.auth.user;
    this.isOfficerOrAdmin = this.user.role === Roles.OFFICER || this.user.role === Roles.ADMIN;

    // Sidenav behaviour management
    this.onOpened = this.sidenav.openedStart.subscribe(() => {
      this.menuButtonStyle = "open";
    });
    this.onClosed = this.sidenav.closedStart.subscribe(() => {
      this.menuButtonStyle = "";
    });
  }

  ngOnDestroy() {
    this.onOpened.unsubscribe();
    this.onClosed.unsubscribe();
  }

  public logout() {
    this.auth.logout();
    this.router.navigate(["/auth"]);
  }
}

