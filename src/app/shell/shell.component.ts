import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { MatSidenav }                              from "@angular/material";
import { Subscription }                            from "rxjs";
import { Router }                                  from "@angular/router";

import { AuthService } from "../shared/services/authService";
import { AuthInfo }    from "../shared/models/authInfo";

@Component({
  selector: "app-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"]
})
export class ShellComponent implements OnInit, OnDestroy {

  @ViewChild("sidenav", {static: true}) sidenav: MatSidenav;
  private onOpened: Subscription;
  private onClosed: Subscription;

  public menuButtonStyle: string;
  public user: AuthInfo;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.auth.user;

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

