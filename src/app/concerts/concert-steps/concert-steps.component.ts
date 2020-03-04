import { FormGroup, FormBuilder, Validators }            from "@angular/forms";
import { Component, OnInit, ViewChild, OnDestroy }       from "@angular/core";
import { ActivatedRoute, Router }                        from "@angular/router";
import { MatTableDataSource, MatSort, MatSnackBar }      from "@angular/material";
import { MediaObserver, MediaChange }                    from "@angular/flex-layout";
import { Subscription }                                  from "rxjs";

import { Concert, ConcertSheets } from "src/app/shared/models/concert";
import { ConcertService }         from "src/app/shared/services/concertService";
import { ErrorsService }          from "src/app/shared/services/errorsService";
import { SheetService }           from "src/app/shared/services/sheetService";
import { Sheet }                  from "src/app/shared/models/sheet";
import { ErrorSnackbarComponent } from "src/app/components/error-snackbar/error-snackbar.component";

@Component({
  selector: "app-concert-steps",
  templateUrl: "./concert-steps.component.html",
  styleUrls: ["../../../../src/assets/css/itemssteps.scss"]
})
export class ConcertStepsComponent implements OnInit, OnDestroy {

  private currentScreenWidth: string;
  private onScreenSizeChanged: Subscription;
  private currentConcert: Concert;
  private allSheets: Sheet[];

  public title: string;
  public infosFormGroup: FormGroup;
  public audienceFormGroup: FormGroup;
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<ConcertSheets>;
  public hasSheets: boolean;
  public filteredSheets: Sheet[];
  public hasSearchResults: boolean;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private service: ConcertService,
              private errorservice: ErrorsService,
              private mediaObserver: MediaObserver,
              private sheetService: SheetService,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.title = "Ajouter un concert";
    this.currentConcert = new Concert();
    this.dataSource = new MatTableDataSource();
    this.getAllSheets();
    this.setupForms();

    // Handle concert modification
    if (this.route.snapshot.params.id) {
      this.title = "Modifier un concert";
      this.getConcertDetails(this.route.snapshot.params.id);
    }

    this.onScreenSizeChanged = this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      if (change[0].mqAlias !== this.currentScreenWidth) {
        this.currentScreenWidth = change[0].mqAlias;
        this.setupTable();
      }
    });
  }

  ngOnDestroy() {
    this.onScreenSizeChanged.unsubscribe();
  }

  private setupTable() {
    this.displayedColumns = ["sheetTitle", "author", "symbol"];
    if (this.currentScreenWidth === "sm" || this.currentScreenWidth === "xs") {
      this.displayedColumns = ["sheetTitle", "symbol"];
    }
  }

  private getAllSheets() {
    this.sheetService.getAllSheets().subscribe((data: Sheet[]) => {
      this.allSheets = data;
    }, (err: any) => {
      this.errorservice.show();
    });
  }

  private setupForms() {
    this.infosFormGroup = this.formBuilder.group({
      name: ["", Validators.required],
      location: [""],
      date: [""]
    });
    this.audienceFormGroup = this.formBuilder.group({
      playerNumber: [""],
      spectatorNumber: [""],
      length: [""]
    });
  }

  private getConcertDetails(id: number) {
    this.service.GetConcertDetails(id).subscribe((data: Concert) => {
      this.currentConcert = data;
      if (data.sheets) {
        this.hasSheets = true;
        this.dataSource.data = data.sheets;
        this.dataSource.sort = this.sort;
      }
      this.setFormValues();
    }, (err: any) => {
      this.errorservice.show();
    });
  }

  private setFormValues() {
    this.infosFormGroup.setValue({
      name: this.currentConcert.name,
      location: this.currentConcert.location,
      date: this.currentConcert.date
    });
    this.audienceFormGroup.setValue({
      playerNumber: this.currentConcert.playerNumber,
      spectatorNumber: this.currentConcert.spectatorNumber,
      length: this.currentConcert.length
    });
  }

  public searchSheet(filter: string) {
    if (filter.length > 2) {
      this.filteredSheets = this.allSheets.filter(sheet => sheet.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
    } else {
      this.filteredSheets = [];
    }
    this.hasSearchResults = (this.filteredSheets.length > 0);
  }

  public removeSheet(index: number) {
    const data = this.dataSource.data;
    data.splice(index, 1);
    this.dataSource.data = data;

    this.hasSheets = (this.dataSource.data.length > 0);
  }

  public addSheet(selectedSheets: any) {
    selectedSheets.forEach((sheet: { value: ConcertSheets; }) => {
      const data = this.dataSource.data;
      data.push(sheet.value);
      this.dataSource.data = data;

      this.hasSheets = (this.dataSource.data.length > 0);
    });
  }

  public saveConcert() {
    const concert = new Concert();
    concert.date = this.infosFormGroup.get("date").value;
    concert.name = this.infosFormGroup.get("name").value;
    concert.location = this.infosFormGroup.get("location").value;
    concert.playerNumber = this.audienceFormGroup.get("playerNumber").value;
    concert.spectatorNumber = this.audienceFormGroup.get("spectatorNumber").value;
    concert.length = this.audienceFormGroup.get("length").value;
    concert.sheets = this.dataSource.data;

    if (this.route.snapshot.params.id) {
      this.service.modifyConcert(this.currentConcert.id, concert).subscribe(() => {
        this.router.navigateByUrl(`/concerts/${this.currentConcert.id}`);
      }, (err: any) => {
        this.snackbar.openFromComponent(ErrorSnackbarComponent, { duration: 3000 });
      });
    } else {
      this.service.createConcert(concert).subscribe(() => {
        this.router.navigateByUrl("/concerts");
      }, (err: any) => {
        this.snackbar.openFromComponent(ErrorSnackbarComponent, { duration: 3000 });
      });
    }
  }
}
