import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { Subscription } from "rxjs";
import { AuthService } from "../shared/services/authService";
import { Router } from "@angular/router";

@Component({
  selector: "app-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"]
})
export class ShellComponent implements OnInit, OnDestroy {
  @ViewChild("sidenav", {static: true}) sidenav: MatSidenav;
  public firstname: string;
  public lastname: string;
  private onOpened: Subscription;
  private onClosed: Subscription;

  public menuButtonStyle = "";

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    // Sidenav behaviour management
    this.onOpened = this.sidenav.openedStart.subscribe(() => {
      this.menuButtonStyle = "open";
    });
    this.onClosed = this.sidenav.closedStart.subscribe(() => {
      this.menuButtonStyle = "";
    });

    const tokenInfos = this.auth.getUser();
    this.firstname = tokenInfos.firstname;
    this.lastname = tokenInfos.lastname;
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

