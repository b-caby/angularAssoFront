import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatTableDataSource } from "@angular/material";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

import { SheetConcert, Sheet } from "src/app/shared/models/sheet";
import { SheetService } from "src/app/shared/services/sheetService";
import { DeleteDialogComponent } from "src/app/dialog/delete-dialog/delete-dialog.component";

@Component({
  selector: "app-sheet-detail",
  templateUrl: "./sheet-detail.component.html",
  styleUrls: ["./sheet-detail.component.scss"]
})
export class SheetDetailComponent implements OnInit {
  public dataSource: MatTableDataSource<SheetConcert>;
  public sheetInfos: Sheet;
  public displayedColumns: string[];
  public hasConcerts: boolean;
  public title: string;
  private sheetId: number;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service: SheetService,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.title = "Détails partition";
    this.dataSource = new MatTableDataSource();
    this.sheetInfos = new Sheet();
    this.displayedColumns = ["date", "name", "location", "symbol"];

    this.sheetId = this.route.snapshot.params.id;
    this.getSheetDetails(this.sheetId);
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
