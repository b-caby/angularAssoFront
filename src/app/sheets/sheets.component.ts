import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { Component, OnInit, ViewChild, OnDestroy }   from "@angular/core";
import { MediaObserver, MediaChange }                from "@angular/flex-layout";
import { Subscription }                              from "rxjs";

import { SheetService }  from "../shared/services/sheetService";
import { Sheet }         from "../shared/models/sheet";
import { ErrorsService } from "../shared/services/errorsService";

@Component({
  selector: "app-sheets",
  templateUrl: "./sheets.component.html",
  styleUrls: ["../../../src/assets/css/itemslist-style.scss"]
})
export class SheetsComponent implements OnInit, OnDestroy {

  private currentScreenWidth: string;
  private onScreenSizeChanged: Subscription;

  public title: string;
  public dataSource: MatTableDataSource<Sheet>;
  public displayedColumns: string[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private mediaObserver: MediaObserver,
              private service: SheetService,
              private errorService: ErrorsService) {
  }

  ngOnInit() {
    this.title = "Partitions";
    this.dataSource = new MatTableDataSource();
    this.onScreenSizeChanged = this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      if (change[0].mqAlias !== this.currentScreenWidth) {
        this.currentScreenWidth = change[0].mqAlias;
        this.setupTable();
      }
    });

    this.getAllSheets();
  }

  ngOnDestroy() {
    this.onScreenSizeChanged.unsubscribe();
  }

  private getAllSheets() {
    this.service.getAllSheets().subscribe((data: Sheet[]) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (err: any) => {
      this.errorService.show();
    });
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
