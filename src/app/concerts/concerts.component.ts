import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { Subscription } from "rxjs";
import { MediaObserver, MediaChange } from "@angular/flex-layout";

const data = [
  { id: 1, date: "06/01/2016", name: "Concert annuel", location: "Conservatoire Reims" },
  { id: 2, date: "07/01/2016", name: "Concert annuel", location: "Conservatoire Reims" },
  { id: 3, date: "19/03/2016", name: "Concert de Tinqueux", location: "Salles des Fêtes Guy Hallet" },
  { id: 4, date: "28/06/2016", name: "Flâneries musicales", location: "Cryptoportique" },
  { id: 5, date: "23/09/2016", name: "Concert de Bazancourt", location: "Filature de Bazancourt" }
];

@Component({
  selector: "app-concerts",
  templateUrl: "./concerts.component.html",
  styleUrls: ["./concerts.component.scss"]
})
export class ConcertsComponent implements OnInit, OnDestroy {
  public title = "Concerts";
  public dataSource = new MatTableDataSource(data);
  public displayedColumns: string[];

  private currentScreenWidth = "";
  private OnScreenSizeChanged: Subscription;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private mediaObserver: MediaObserver) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.OnScreenSizeChanged = this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      if (change[0].mqAlias !== this.currentScreenWidth) {
        this.currentScreenWidth = change[0].mqAlias;
        this.setupTable();
      }
    });
  }

  ngOnDestroy() {
    this.OnScreenSizeChanged.unsubscribe();
  }

  public applyFilter(filter: string) {
    this.dataSource.filter = filter;
  }

  private setupTable() {
    this.displayedColumns = ["id", "date", "name", "location", "symbol"];
    if (this.currentScreenWidth === "xs") {
      this.displayedColumns.shift();
    }
  }
}
