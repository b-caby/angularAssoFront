import { Component, OnInit, ViewChild, OnDestroy }  from "@angular/core";
import { MatSort, MatTableDataSource, MatSnackBar } from "@angular/material";
import { MatDialog }                                from "@angular/material/dialog";
import { ActivatedRoute, Router }                   from "@angular/router";
import { MediaObserver, MediaChange }               from "@angular/flex-layout";
import { Subscription }                             from "rxjs";

import { DeleteDialogComponent }  from "src/app/components/delete-dialog/delete-dialog.component";
import { SheetConcert, Sheet }    from "src/app/shared/models/sheet";
import { SheetService }           from "src/app/shared/services/sheetService";
import { ErrorsService }          from "src/app/shared/services/errorsService";
import { ErrorSnackbarComponent } from "src/app/components/error-snackbar/error-snackbar.component";
import { AuthService }            from "src/app/shared/services/authService";
import { Roles }                  from "src/app/shared/enums/roles";

@Component({
  selector: "app-sheet-detail",
  templateUrl: "./sheet-detail.component.html",
  styleUrls: ["../../../../src/assets/css/itemsdetails.scss"]
})
export class SheetDetailComponent implements OnInit, OnDestroy {

  private sheetId: number;
  private currentScreenWidth: string;
  private OnScreenSizeChanged: Subscription;

  public title: string;
  public dataSource: MatTableDataSource<SheetConcert>;
  public sheetInfos: Sheet;
  public displayedColumns: string[];
  public hasConcerts: boolean;
  public canModify: boolean;
  public canDelete: boolean;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service: SheetService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private mediaObserver: MediaObserver,
              private errorService: ErrorsService,
              private snackbar: MatSnackBar,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.title = "Détails partition";
    this.dataSource = new MatTableDataSource();
    this.sheetInfos = new Sheet();
    this.canModify = (this.auth.user.role === Roles.ADMIN || this.auth.user.role === Roles.OFFICER);
    this.canDelete = (this.auth.user.role === Roles.ADMIN);
    this.OnScreenSizeChanged = this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      if (change[0].mqAlias !== this.currentScreenWidth) {
        this.currentScreenWidth = change[0].mqAlias;
        this.setupTable();
      }
    });

    this.sheetId = this.route.snapshot.params.id;
    this.getSheetDetails(this.sheetId);
  }

  ngOnDestroy(): void {
    this.OnScreenSizeChanged.unsubscribe();
  }

  private getSheetDetails(id: number) {
    this.service.getSheetDetails(id).subscribe((data: Sheet) => {
      this.sheetInfos = data;
      if (data.concerts) {
        this.hasConcerts = true;
        this.dataSource.data = data.concerts;
        this.dataSource.sort = this.sort;
      }
    }, (err: any) => {
      this.errorService.show();
    });
  }

  private setupTable() {
    this.displayedColumns = ["date", "name", "location"];
    if (this.currentScreenWidth === "sm" || this.currentScreenWidth === "xs") {
      this.displayedColumns = ["date", "name"];
    }
  }

  public openDeleteDialog() {
    const dialog = this.dialog.open(DeleteDialogComponent, {
      width: "250px",
    });

    dialog.afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.service.deleteSheet(this.sheetId).subscribe(() => {
          this.router.navigateByUrl("/sheets");
        }, (err: any) => {
          this.snackbar.openFromComponent(ErrorSnackbarComponent, { duration: 3000 });
        });
      }
    });
  }
}
