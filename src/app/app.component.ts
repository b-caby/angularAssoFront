import { Component, ViewChild, OnInit } from "@angular/core";
import { MatSidenav } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})

export class AppComponent implements OnInit {
  @ViewChild("sidenav", {static: true}) sidenav: MatSidenav;
  public className = "";
  public firstname = "Bérenger";
  public lastname = "C.";

  ngOnInit() {
    // Sidenav behaviour management 
    this.sidenav.openedStart.subscribe(() => {
      this.className = "open";
    });
    this.sidenav.closedStart.subscribe(() => {
      this.className = "";
    });
  }
}
