import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"]
})
export class ShellComponent implements OnInit, OnDestroy {
  @ViewChild("sidenav", {static: true}) sidenav: MatSidenav;
  public className = "";
  public firstname = "Bérenger";
  public lastname = "C.";

  private onOpened: Subscription;
  private onClosed: Subscription;

  ngOnInit() {
    // Sidenav behaviour management
    this.onOpened = this.sidenav.openedStart.subscribe(() => {
      this.className = "open";
    });
    this.onClosed = this.sidenav.closedStart.subscribe(() => {
      this.className = "";
    });
  }

  ngOnDestroy() {
    this.onOpened.unsubscribe();
    this.onClosed.unsubscribe();
  }
}

