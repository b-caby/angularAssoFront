import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatTableDataSource } from "@angular/material";

const query =  {
  id: 1022,
  title: "The Danserye",
  author: "MELLAERTS Manu",
  composer: "Tylman Susato",
  genre: "classique moyen âge",
  type: "",
  publisher: "",
  details: "Très dur/solo de saxo alto",
  boxNumber: "1",
  trayNumber: "2",
  recordingDate: "2019",
  concerts: [
    { id: 1, date: "06/01/2016", name: "Concert annuel", location: "Conservatoire Reims" },
    { id: 2, date: "07/01/2016", name: "Concert annuel", location: "Conservatoire Reims" }
  ]
};

@Component({
  selector: "app-sheet-detail",
  templateUrl: "./sheet-detail.component.html",
  styleUrls: ["./sheet-detail.component.scss"]
})
export class SheetDetailComponent implements OnInit {
  public data = query;
  public dataSource = new MatTableDataSource(query.concerts);
  public displayedColumns = ["date", "name", "location", "symbol"];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
