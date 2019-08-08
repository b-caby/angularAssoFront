import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MatSort, MatTableDataSource }  from "@angular/material";
import { MatDialog }                    from "@angular/material/dialog";
import { ActivatedRoute }               from "@angular/router";
import { MediaObserver, MediaChange }   from "@angular/flex-layout";
import { Subscription }                 from "rxjs";

import { DeleteDialogComponent } from "src/app/components/delete-dialog/delete-dialog.component";
import { SheetConcert, Sheet }   from "src/app/shared/models/sheet";
import { SheetService }          from "src/app/shared/services/sheetService";

@Component({
  selector: "app-sheet-detail",
  templateUrl: "./sheet-detail.component.html",
  styleUrls: ["../../../../src/assets/css/itemsdetails-style.scss"]
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

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service: SheetService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private mediaObserver: MediaObserver) { }

  ngOnInit() {
    this.title = "Détails partition";
    this.dataSource = new MatTableDataSource();
    this.sheetInfos = new Sheet();
    this.displayedColumns = ["date", "name", "location", "symbol"];
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
    });
  }

  private setupTable() {
    this.displayedColumns = ["date", "name", "location", "symbol"];
    if (this.currentScreenWidth === "xs") {
      this.displayedColumns = ["date", "name", "symbol"];
    }
  }

  public openDeleteDialog() {
    const dialog = this.dialog.open(DeleteDialogComponent, {
      width: "250px",
    });

    dialog.afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        /*this.service.deleteSheet(this.sheetId);*/
        console.log(`Delete Sheet with ID = ${this.sheetId}`);
      }
    });
  }
}
