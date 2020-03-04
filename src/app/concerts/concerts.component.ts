import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { Component, OnInit, ViewChild, OnDestroy }   from "@angular/core";
import { MediaObserver, MediaChange }                from "@angular/flex-layout";
import { Subscription }                              from "rxjs";

import { ConcertService } from "../shared/services/concertService";
import { Concert }        from "../shared/models/concert";
import { ErrorsService }  from "../shared/services/errorsService";
import { AuthService }    from "../shared/services/authService";
import { Roles }          from "../shared/enums/roles";

@Component({
  selector: "app-concerts",
  templateUrl: "./concerts.component.html"
})
export class ConcertsComponent implements OnInit, OnDestroy {

  private currentScreenWidth: string;
  private onScreenSizeChanged: Subscription;

  public title: string;
  public dataSource: MatTableDataSource<Concert>;
  public displayedColumns: string[];
  public canAddConcerts: boolean;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private mediaObserver: MediaObserver,
              private service: ConcertService,
              private errorService: ErrorsService,
              private auth: AuthService) { }

  ngOnInit() {
    this.title = "Concerts";
    this.dataSource = new MatTableDataSource();
    this.canAddConcerts = (this.auth.user.role === Roles.ADMIN || this.auth.user.role === Roles.OFFICER);
    this.onScreenSizeChanged = this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      if (change[0].mqAlias !== this.currentScreenWidth) {
        this.currentScreenWidth = change[0].mqAlias;
        this.setupTable();
      }
    });

    this.getAllConcerts();
  }

  ngOnDestroy() {
    this.onScreenSizeChanged.unsubscribe();
  }

  public applyFilter(filter: string) {
    this.dataSource.filter = filter;
  }

  private setupTable() {
    this.displayedColumns = ["date", "name", "location"];
    if (this.currentScreenWidth === "ms" || this.currentScreenWidth === "xs") {
      this.displayedColumns = ["date", "name"];
    }
  }

  private getAllConcerts() {
    this.service.getAllConcerts().subscribe((data: Concert[]) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (err: any) => {
      this.errorService.show();
    });
  }
}
