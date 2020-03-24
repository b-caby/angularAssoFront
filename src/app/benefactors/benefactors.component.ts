import { MatTableDataSource, MatSort, MatPaginator, MatSortable } from "@angular/material";
import { Component, OnInit, ViewChild, OnDestroy }                from "@angular/core";
import { MediaObserver, MediaChange }                             from "@angular/flex-layout";
import { Subscription }                                           from "rxjs";

import { Benefactor }        from "../shared/models/benefactor";
import { ErrorsService }     from "../shared/services/errorsService";
import { BenefactorService } from "../shared/services/benefactorService";
import { AuthService }       from "../shared/services/authService";
import { Roles }             from "../shared/enums/roles";

@Component({
  selector:  "app-benefactors",
  templateUrl: "./benefactors.component.html"
})
export class BenefactorsComponent implements OnInit, OnDestroy {

  private onScreenSizeChanged: Subscription;
  private currentScreenWidth: string;

  public title: string;
  public dataSource: MatTableDataSource<Benefactor>;
  public displayedColumns: string[];
  public canAddBenefactors: boolean;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service: BenefactorService,
              private errorService: ErrorsService,
              private mediaObserver: MediaObserver,
              private auth: AuthService) {}

  ngOnInit() {
    this.title = "Bienfaiteurs";
    this.canAddBenefactors = false;

    // TODO_V2
    /*this.canAddBenefactors = this.auth.user.role === Roles.ADMIN;*/

    // Sorting starts with ascending names
    // Sorting is case-insensitive
    this.sort.sort(({ id: "name", start: "asc"}) as MatSortable);
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
    this.getAllBenefactors();
  }

  ngOnDestroy(): void {
    this.onScreenSizeChanged.unsubscribe();
  }

  private getAllBenefactors() {
    this.service.getAllBenefactors().subscribe((data: Benefactor[]) => {
      this.dataSource.data = data;
      console.log(data[0]);
    }, (err: any) => {
      this.errorService.show();
    });
  }

  public applyFilter(filter: string) {
    this.dataSource.filter = filter;
  }

  private setupTable() {
    this.displayedColumns = ["name", "firstname", "phone", "email"];
    if (this.currentScreenWidth === "xs" || this.currentScreenWidth === "ms") {
      this.displayedColumns = ["name", "firstname"];
    }
    if (this.currentScreenWidth === "sm") {
      this.displayedColumns = ["name", "firstname", "phone"];
    }
  }
}
