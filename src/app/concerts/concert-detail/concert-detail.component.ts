import { Component, OnInit, ViewChild }              from "@angular/core";
import { MatTableDataSource, MatSort, MatSnackBar }  from "@angular/material";
import { MatDialog }                                 from "@angular/material/dialog";
import { ActivatedRoute, Router }                    from "@angular/router";

import { ConcertSheets, Concert } from "src/app/shared/models/concert";
import { ConcertService }         from "src/app/shared/services/concertService";
import { DeleteDialogComponent }  from "src/app/components/delete-dialog/delete-dialog.component";
import { ErrorsService }          from "src/app/shared/services/errorsService";
import { ErrorSnackbarComponent } from "src/app/components/error-snackbar/error-snackbar.component";

@Component({
  selector: "app-concert-detail",
  templateUrl: "./concert-detail.component.html",
  styleUrls: ["../../../../src/assets/css/itemsdetails-style.scss"]
})
export class ConcertDetailComponent implements OnInit {

  private concertId: number;

  public title: string;
  public concertInfos: Concert;
  public dataSource: MatTableDataSource<ConcertSheets>;
  public displayedColumns: string[];
  public hasSheets: boolean;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private service: ConcertService,
              private dialog: MatDialog,
              private errorService: ErrorsService,
              private router: Router,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.title = "Détail concert";
    this.concertInfos = new Concert();
    this.dataSource = new MatTableDataSource();
    this.displayedColumns = ["title", "author", "symbol"];

    this.concertId = this.route.snapshot.params.id;
    this.getConcertDetails(this.concertId);
  }

  private getConcertDetails(id: number) {
    this.service.GetConcertDetails(id).subscribe((data: Concert) => {
      this.concertInfos = data;
      if (data.sheets) {
        this.hasSheets = true;
        this.dataSource.data = data.sheets;
        this.dataSource.sort = this.sort;
      }
    }, (err: any) => {
      this.errorService.show();
    });
  }

  public openDeleteDialog() {
    const dialog = this.dialog.open(DeleteDialogComponent, {
      width: "250px",
    });

    dialog.afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.service.deleteConcert(this.concertId).subscribe(() => {
          this.router.navigateByUrl("/concerts");
        }, (err: any) => {
          this.snackbar.openFromComponent(ErrorSnackbarComponent, { duration: 3000 });
        });
      }
    });
  }
}
