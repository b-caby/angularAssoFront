import { Component, OnInit, ViewChild, OnDestroy }                from "@angular/core";
import { MatTableDataSource, MatSort, MatSnackBar, MatSortable }  from "@angular/material";
import { MatDialog }                                              from "@angular/material/dialog";
import { ActivatedRoute, Router }                                 from "@angular/router";

import { Concert }                from "src/app/shared/models/concert";
import { ConcertService }         from "src/app/shared/services/concertService";
import { DeleteDialogComponent }  from "src/app/components/delete-dialog/delete-dialog.component";
import { ErrorsService }          from "src/app/shared/services/errorsService";
import { ErrorSnackbarComponent } from "src/app/components/error-snackbar/error-snackbar.component";
import { AuthService }            from "src/app/shared/services/authService";
import { Roles }                  from "src/app/shared/enums/roles";
import { Sheet }                  from "src/app/shared/models/sheet";

@Component({
  selector: "app-concert-detail",
  templateUrl: "./concert-detail.component.html",
  styleUrls: ["../../../../src/assets/css/itemsdetails.scss"]
})
export class ConcertDetailComponent implements OnInit {

  public concertInfos: Concert = new Concert();
  public title: string;
  public dataSource: MatTableDataSource<Sheet>;
  public displayedColumns: string[];
  public hasSheets: boolean;
  public canModify: boolean;
  public canDelete: boolean;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private service: ConcertService,
              private dialog: MatDialog,
              private errorService: ErrorsService,
              private router: Router,
              private snackbar: MatSnackBar,
              private auth: AuthService) { }

  ngOnInit() {
    this.title = "Détail concert";
    this.canModify = this.canDelete = false;
    this.displayedColumns = ["title", "author"];

    // TODO_V2
    /*this.canModify = this.auth.user.role === Roles.ADMIN || this.auth.user.role === Roles.OFFICER;
    this.canDelete = this.auth.user.role === Roles.ADMIN;*/

    // Sorting starts with ascending title
    // Sorting is case-insensitive
    this.sort.sort(({ id: "title", start: "asc"}) as MatSortable)
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();

    // Call to the API
    this.getConcertDetails(this.route.snapshot.params.id);
  }

  private getConcertDetails(id: number) {
    this.service.GetConcertDetails(id).subscribe((data: Concert) => {
      this.concertInfos = data;
      if (data.sheets) {
        this.hasSheets = true;
        this.dataSource.data = data.sheets;
      }
    }, (err: any) => {
      this.errorService.show();
    });
  }

  public modifyConcert() {
    this.router.navigateByUrl(`/concerts/steps/${this.concertInfos.id}`);
  }

  public openDeleteDialog() {
    const dialog = this.dialog.open(DeleteDialogComponent, {
      width: "250px",
    });

    dialog.afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.service.deleteConcert(this.concertInfos.id).subscribe(() => {
          this.router.navigateByUrl("/concerts");
        }, (err: any) => {
          this.snackbar.openFromComponent(ErrorSnackbarComponent, { duration: 3000 });
        });
      }
    });
  }
}
