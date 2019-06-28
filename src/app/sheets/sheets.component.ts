import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";

const data = [
  { id: 1, author: "Berenger", composer: "Caby" },
  { id: 2, author: "Marinus", composer: "Schreurs" },
  { id: 3, author: "James", composer: "Hyland" }
];

@Component({
  selector: "app-sheets",
  templateUrl: "./sheets.component.html",
  styleUrls: ["./sheets.component.scss"]
})
export class SheetsComponent implements OnInit {
  title = "Partitions";
  dataSource = new MatTableDataSource(data);
  displayedColumns = ["id", "author", "composer"];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter;
  }
}
