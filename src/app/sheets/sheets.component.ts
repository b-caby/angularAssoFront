import { Component, OnInit, ViewChild, OnDestroy }   from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { MediaObserver, MediaChange }                from "@angular/flex-layout";
import { Subscription }                              from "rxjs";

import { SheetService } from "../shared/services/sheetService";
import { Sheet }        from "../shared/models/sheet";

@Component({
  selector: "app-sheets",
  templateUrl: "./sheets.component.html",
  styleUrls: ["./sheets.component.scss"]
})
export class SheetsComponent implements OnInit, OnDestroy {
  private currentScreenWidth: string;
  private OnScreenSizeChanged: Subscription;
  public title: string;
  public dataSource: MatTableDataSource<Sheet>;
  public displayedColumns: string[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private mediaObserver: MediaObserver,
              private service: SheetService) {
  }

  ngOnInit() {
    this.title = "Partitions";
    this.getAllSheets();
  }

  private getAllSheets() {
    this.service.getAllSheets().subscribe((data: Sheet[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.OnScreenSizeChanged = this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
        if (change[0].mqAlias !== this.currentScreenWidth) {
          this.currentScreenWidth = change[0].mqAlias;
          this.setupTable();
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.OnScreenSizeChanged.unsubscribe();
  }

  public applyFilter(filter: string) {
    this.dataSource.filter = filter;
  }

  private setupTable() {
    this.displayedColumns = ["id", "title", "author", "composer", "genre", "symbol"];
    if (this.currentScreenWidth === "xs") {
      this.displayedColumns = ["title", "author", "symbol"];
    }
  }
}
