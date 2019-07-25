import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatTableDataSource } from "@angular/material";
import { ActivatedRoute } from "@angular/router";

import { SheetConcert, Sheet } from "src/app/shared/models/sheet";
import { SheetService } from "src/app/shared/services/sheetService";


@Component({
  selector: "app-sheet-detail",
  templateUrl: "./sheet-detail.component.html",
  styleUrls: ["./sheet-detail.component.scss"]
})
export class SheetDetailComponent implements OnInit {
  public dataSource: MatTableDataSource<SheetConcert>;
  public sheetInfos: Sheet;
  public displayedColumns: string[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service: SheetService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([new SheetConcert()]);
    this.displayedColumns = ["date", "name", "location", "symbol"];
    this.dataSource.sort = this.sort;

    this.getSheetDetails(this.route.snapshot.params.id as number);
  }

  private getSheetDetails(id: number) {
    this.service.getSheetDetails(id).subscribe((data: Sheet) => {
      this.sheetInfos = data;
      this.dataSource = new MatTableDataSource([data.concerts]);
    });
  }
}
