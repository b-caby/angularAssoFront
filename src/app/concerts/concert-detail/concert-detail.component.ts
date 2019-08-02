import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort }  from "@angular/material";
import { MatDialog }                    from "@angular/material/dialog";
import { ActivatedRoute }               from "@angular/router";

import { ConcertSheets, Concert } from "src/app/shared/models/concert";
import { ConcertService }         from "src/app/shared/services/concertService";
import { DeleteDialogComponent }  from "src/app/dialog/delete-dialog/delete-dialog.component";


@Component({
  selector: "app-concert-detail",
  templateUrl: "./concert-detail.component.html",
  styleUrls: ["./concert-detail.component.scss"]
})
export class ConcertDetailComponent implements OnInit {
  public dataSource: MatTableDataSource<ConcertSheets>;
  public displayedColumns: string[];
  public concertInfos: Concert;
  public hasSheets: boolean;
  public title: string;
  private concertId: number;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private service: ConcertService,
              private dialog: MatDialog) { }

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
    });
  }

  public openDeleteDialog() {
    const dialog = this.dialog.open(DeleteDialogComponent, {
      width: "250px",
    });

    dialog.afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        /*this.service.deleteSheet(this.sheetId);*/
        console.log(`Delete Sheet with ID = ${this.concertId}`);
      }
    });
  }
}
