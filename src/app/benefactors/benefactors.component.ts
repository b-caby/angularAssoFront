import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { Component, OnInit, ViewChild, OnDestroy }   from "@angular/core";
import { MediaObserver, MediaChange }                from "@angular/flex-layout";
import { Subscription }                              from "rxjs";

import { Benefactor } from "../shared/models/benefactor";
import { ErrorsService } from "../shared/services/errorsService";
import { BenefactorService } from "../shared/services/benefactorService";

@Component({
  selector:  "app-benefactors",
  templateUrl: "./benefactors.component.html"
})
export class BenefactorsComponent implements OnInit {
  public title: string;
  public dataSource: MatTableDataSource<Benefactor>;
  public displayedColumns: string[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service: BenefactorService,
              private errorService: ErrorsService) { }

  ngOnInit() {
    this.title = "Bienfaiteurs";
    this.dataSource = new MatTableDataSource();
    this.displayedColumns = ["name", "firstname", "phone", "email"];
    this.getAllBenefactors();
  }

  private getAllBenefactors() {
    this.service.getAllBenefactors().subscribe((data: Benefactor[]) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (err: any) => {
      this.errorService.show();
    });
  }

  public applyFilter(filter: string) {
    this.dataSource.filter = filter;
  }
}
