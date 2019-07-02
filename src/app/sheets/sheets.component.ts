import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { MediaObserver, MediaChange } from "@angular/flex-layout";
import { Subscription } from "rxjs";

const data = [
  { id: 1, title: "Air d'automne", author: "CREPIN Alain", composer: "CREPIN Alain", genre: "Moderne calme" },
  { id: 2, title: "Air varié pour trombone ou cornet à pistons", author: "LEGENDRE/BOUSQUET", composer: null, genre: null },
  { id: 3, title: "Alba Rosa (SC)", author: "FARIGOUL A.", composer: "", genre: " ouverture" },
  { id: 6, title: "Au pays Lorrain - ouverture", author: "BALAY G.", composer: null, genre: null },
  { id: 7, title: "L'Arlésienne - ouverture", author: "BOUCHEL J.", composer: "G.Bizet", genre: "Classique" },
  { id: 8, title: "Andante (Flugelhorn)", author: "Warren BARKER", composer: null, genre: null },
  { id: 9, title: "Avicodos Marche", author: "CREPIN Alain", composer: null, genre: null },
  { id: 10, title: "Allegro con  brio - Cornet Solo", author: "Warren BARKER", composer: null, genre: null },
  { id: 11, title: "Air dithyrambique ", author: "DEVOGEL Jacques", composer: "", genre: "" },
  { id: 12, title: "A travers nos provinces", author: "DELBECQ", composer: "", genre: "" },
  { id: 13, title: "Adeste fideles ", author: "", composer: "PENDERS J", genre: "" },
  { id: 14, title: "Abba Gold", author: "Abba", composer: "Ron Sebregts", genre: "Pop" },
  { id: 15, title: "Allways look on the bright side of the life", author: "IDLE E", composer: null, genre: null },
  { id: 16, title: "Marche D'ATHALIE", author: "F.Mendelssohns", composer: "CHIC L.", genre: "Musique militaire" }
];

@Component({
  selector: "app-sheets",
  templateUrl: "./sheets.component.html",
  styleUrls: ["./sheets.component.scss"]
})
export class SheetsComponent implements OnInit, OnDestroy {
  public title = "Partitions";
  public dataSource = new MatTableDataSource(data);
  public displayedColumns: string[];

  private currentScreenWidth = "";
  private OnScreenSizeChanged: Subscription;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private mediaObserver: MediaObserver) {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.OnScreenSizeChanged = this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      if (change[0].mqAlias !== this.currentScreenWidth) {
        this.currentScreenWidth = change[0].mqAlias;
        this.setupTable();
      }
    });
  }

  ngOnDestroy(): void {
    this.OnScreenSizeChanged.unsubscribe();
  }

  public applyFilter(filter: string) {
    this.dataSource.filter = filter;
  }

  private setupTable() {
    this.displayedColumns = ["id", "title", "author", "composer", "genre", "symbol"];
    console.log(this.currentScreenWidth);
    if (this.currentScreenWidth === "xs") {
      this.displayedColumns = ["title", "author", "symbol"];
    }
  }
}
