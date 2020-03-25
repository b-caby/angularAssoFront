import { MatTableDataSource, MatSort, MatSortable } from "@angular/material";
import { Component, OnInit, ViewChild, OnDestroy }  from "@angular/core";
import { ActivatedRoute }                           from "@angular/router";
import { Subscription }                             from "rxjs";
import { MediaObserver, MediaChange }               from "@angular/flex-layout";

import { BenefactorService } from "src/app/shared/services/benefactorService";
import { Benefactor }        from "src/app/shared/models/benefactor";
import { ErrorsService }     from "src/app/shared/services/errorsService";
import { Roles }             from "src/app/shared/enums/roles";
import { AuthService }       from "src/app/shared/services/authService";
import { Gift }              from "src/app/shared/models/gift";

@Component({
  selector: "app-benefactor-detail",
  templateUrl: "./benefactor-detail.component.html",
  styleUrls: ["../../../../src/assets/css/itemsdetails.scss"]
})
export class BenefactorDetailComponent implements OnInit, OnDestroy {

  private currentScreenWidth: string;
  private OnScreenSizeChanged: Subscription;

  public benefactorInfos: Benefactor = new Benefactor();
  public title: string;
  public dataSource: MatTableDataSource<Gift>;
  public displayedColumns: string[];
  public hasGifts: boolean;
  public canModify: boolean;
  public canDelete: boolean;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private service: BenefactorService,
              private errorService: ErrorsService,
              private auth: AuthService,
              private mediaObserver: MediaObserver) {}

  ngOnInit() {
    this.title = "Détails bienfaiteur";
    this.canModify = this.canDelete = false;

    // TODO_V2
    /*this.canModify = this.auth.user.role === Roles.ADMIN;
    this.canDelete = this.auth.user.role === Roles.ADMIN;*/

    // Sorting starts with descending dates
    this.sort.sort(({ id: "date", start: "desc"}) as MatSortable);
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;

    // Gets and sets the size of the current screen
    this.OnScreenSizeChanged = this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      if (change[0].mqAlias !== this.currentScreenWidth) {
        this.currentScreenWidth = change[0].mqAlias;
        this.setupTable();
      }
    });

    // Call to the API
    this.getBenefactorDetails(this.route.snapshot.params.id);
  }

  ngOnDestroy(): void {
    this.OnScreenSizeChanged.unsubscribe();
  }

  private getBenefactorDetails(id: number) {
    this.service.getBenefactorDetails(id).subscribe((data: Benefactor) => {
      this.benefactorInfos = data;
      if (data.gifts) {
        this.hasGifts = true;
        this.dataSource.data = data.gifts;
      }
    }, (err: any) => {
      this.errorService.show();
    });
  }

  private setupTable() {
    this.displayedColumns = ["giftDate", "mode", "bank", "amount"];
    if (this.currentScreenWidth === "xs") {
      this.displayedColumns = ["giftDate", "mode", "amount"];
    }
  }
}
