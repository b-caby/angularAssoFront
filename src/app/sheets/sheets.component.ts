import { MatTableDataSource, MatSort, MatPaginator, MatSortable } from "@angular/material";
import { Component, OnInit, ViewChild, OnDestroy }                from "@angular/core";
import { MediaObserver, MediaChange }                             from "@angular/flex-layout";
import { Subscription }                                           from "rxjs";

import { SheetService }  from "../shared/services/sheetService";
import { Sheet }         from "../shared/models/sheet";
import { ErrorsService } from "../shared/services/errorsService";
import { AuthService }   from "../shared/services/authService";
import { Roles }         from "../shared/enums/roles";

@Component({
  selector: "app-sheets",
  templateUrl: "./sheets.component.html"
})
export class SheetsComponent implements OnInit, OnDestroy {

  private currentScreenWidth: string;
  private onScreenSizeChanged: Subscription;

  public title: string;
  public dataSource: MatTableDataSource<Sheet>;
  public displayedColumns: string[];
  public canAddSheets: boolean;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private mediaObserver: MediaObserver,
              private service: SheetService,
              private errorService: ErrorsService,
              private auth: AuthService) {}

  ngOnInit() {
    this.title = "Partitions";
    this.canAddSheets = false;

    // TODO_V2
    /*this.canAddSheets = this.auth.user.role === Roles.ADMIN || this.auth.user.role === Roles.OFFICER;*/

    // Sorting starts with ascending titles
    // Sorting is case-insensitive
    this.sort.sort(({ id: "title", start: "asc" }) as MatSortable);
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();
    this.dataSource.paginator = this.paginator;

    // Gets and sets the size of the current screen
    this.onScreenSizeChanged = this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      if (change[0].mqAlias !== this.currentScreenWidth) {
        this.currentScreenWidth = change[0].mqAlias;
        this.setupTable();
      }
    });

    // Call to the API
    this.getAllSheets();
  }

  ngOnDestroy() {
    this.onScreenSizeChanged.unsubscribe();
  }

  private getAllSheets() {
    this.service.getAllSheets().subscribe((data: Sheet[]) => {
      this.dataSource.data = data;
    }, (err: any) => {
      this.errorService.show();
    });
  }

  public applyFilter(filter: string) {
    this.dataSource.filter = filter;
  }

  private setupTable() {
    this.displayedColumns = ["title", "author", "composer", "genre"];
    if (this.currentScreenWidth === "xs" || this.currentScreenWidth === "ms") {
      this.displayedColumns = ["title", "author"];
    }
    if (this.currentScreenWidth === "sm") {
      this.displayedColumns = ["title", "author", "composer"];
    }
  }
}
