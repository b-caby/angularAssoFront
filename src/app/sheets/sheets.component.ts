import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { MediaObserver, MediaChange } from "@angular/flex-layout";
import { Subscription } from "rxjs";

const data = [
  { id: 1, author: "Berenger", composer: "Caby" },
  { id: 2, author: "Marinus", composer: "Schreurs" },
  { id: 3, author: "James", composer: "Hyland" }
];

@Component({
  selector: "app-sheets",
  templateUrl: "./sheets.component.html",
  styleUrls: ["./sheets.component.scss"]
})
export class SheetsComponent implements OnInit, OnDestroy {
  public title = "Partitions";
  public dataSource = new MatTableDataSource(data);
  public displayedColumns: string[];

  private currentScreenWidth = "";
  private OnScreenSizeChanged: Subscription;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private mediaObserver: MediaObserver) {
  }

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

  ngOnDestroy(): void {
    this.OnScreenSizeChanged.unsubscribe();
  }

  public applyFilter(filter: string) {
    this.dataSource.filter = filter;
  }

  private setupTable() {
    this.displayedColumns = ["id", "author", "composer", "symbol"];
    if (this.currentScreenWidth === "xs") {
      this.displayedColumns.shift();
    }
  }
}
