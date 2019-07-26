import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort }  from "@angular/material";
import { ActivatedRoute }               from "@angular/router";

import { ConcertSheets, Concert }  from "src/app/shared/models/concert";
import { ConcertService }          from "src/app/shared/services/concertService";


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

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private service: ConcertService) { }

  ngOnInit() {
    this.getConcertDetails(this.route.snapshot.params.id);

    this.concertInfos = new Concert();
    this.dataSource = new MatTableDataSource([new ConcertSheets()]);
    this.displayedColumns = ["title", "author", "symbol"];
  }

  private getConcertDetails(id: number) {
    this.service.GetConcertDetails(id).subscribe((data: Concert[]) => {
      console.log(data);
      this.concertInfos = data[0];
      if (data[0].sheets) {
        this.hasSheets = true;
        this.dataSource = new MatTableDataSource(data[0].sheets);
        this.dataSource.sort = this.sort;
      }
    });
  }
}
