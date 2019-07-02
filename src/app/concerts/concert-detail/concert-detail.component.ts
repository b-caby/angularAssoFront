import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort } from "@angular/material";

const query =  {
  id: 12,
  date: "19/11/2016",
  name: "Sainte Cécile",
  location: "Basilique Saint Remi",
  playerNumber: 50,
  spectatorNumber: 1000,
  length: 75,
  sheets: [
    { id: 1131, title: "Marche pour la Cérémonie des Turcs", author: "John Doe" },
    { id: 1038, title: "Orégon", author: "Jane Doe" },
    { id: 1517, title: "AVE MARIA ", author: "James Smith" },
    { id: 1518, title: "HALLELUJAH ", author: "Sarah Smith" }
  ]
}

@Component({
  selector: "app-concert-detail",
  templateUrl: "./concert-detail.component.html",
  styleUrls: ["./concert-detail.component.scss"]
})
export class ConcertDetailComponent implements OnInit {
  public data = query;
  public dataSource = new MatTableDataSource(query.sheets);
  public displayedColumns = ["title", "author", "symbol"];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
}
