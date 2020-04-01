import { Component, OnInit, Input } from "@angular/core";
import { Router }                   from "@angular/router";

import { FilterService } from "src/app/shared/services/filterService";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {

  public filterValue: string;

  @Input() dataSource;
  constructor(private router: Router,
              private service: FilterService) { }

  ngOnInit() {
    this.filterValue = this.service.getFilter(this.router.url);
    this.initializeFilter(this.filterValue);
  }

  public applyFilter(filter: string) {
    this.dataSource.filter = filter;
    this.service.setFilter(this.router.url, filter);
  }

  private initializeFilter(filter: string) {
    this.dataSource.filter = filter;
  }
}
