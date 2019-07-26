import { Component, OnInit, ViewChild, OnDestroy }   from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { MediaObserver, MediaChange }                from "@angular/flex-layout";
import { Subscription }                              from "rxjs";

import { Concert }        from "../shared/models/concert";
import { ConcertService } from "../shared/services/concertService";

@Component({
  selector: "app-concerts",
  templateUrl: "./concerts.component.html",
  styleUrls: ["./concerts.component.scss"]
})
export class ConcertsComponent implements OnInit, OnDestroy {
  private currentScreenWidth: string;
  private OnScreenSizeChanged: Subscription;
  public title: string;
  public dataSource: MatTableDataSource<Concert>;
  public displayedColumns: string[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private mediaObserver: MediaObserver,
              private service: ConcertService) { }

  ngOnInit() {
    this.getAllConcerts();
    this.title = "Concerts";
    this.dataSource = new MatTableDataSource([new Concert()]);
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

  private getAllConcerts() {
    this.service.getAllConcerts().subscribe((data: Concert[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
