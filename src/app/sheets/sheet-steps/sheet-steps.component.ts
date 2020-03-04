import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit }                  from "@angular/core";
import { ActivatedRoute, Router }             from "@angular/router";
import { MatSnackBar }                        from "@angular/material";

import { ErrorSnackbarComponent } from "src/app/components/error-snackbar/error-snackbar.component";
import { SheetService }           from "src/app/shared/services/sheetService";
import { Sheet }                  from "src/app/shared/models/sheet";
import { ErrorsService }          from "src/app/shared/services/errorsService";

@Component({
  selector: "app-sheet-steps",
  templateUrl: "./sheet-steps.component.html",
  styleUrls: ["../../../../src/assets/css/itemssteps.scss"]
})
export class SheetStepsComponent implements OnInit {

  private currentSheet: Sheet;

  public title: string;
  public infosFormGroup: FormGroup;
  public classificationFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private service: SheetService,
              private errorService: ErrorsService,
              private snackbar: MatSnackBar) {
   }

  ngOnInit() {
    this.title = "Ajouter une partition";
    this.currentSheet = new Sheet();

    if (this.route.snapshot.params.id) {
      this.title = "Modifier une partition";
      this.getSheetDetails(this.route.snapshot.params.id);
    }

    this.infosFormGroup = this.formBuilder.group({
      title: ["", Validators.required],
      author: [""],
      composer: [""],
      genre: [""],
      type: [""],
      publisher: [""],
      details: [""]
    });
    this.classificationFormGroup = this.formBuilder.group({
      boxNumber: [""],
      trayNumber: [""],
      recordingDate: [""]
    });
  }

  private getSheetDetails(id: number) {
    this.service.getSheetDetails(id).subscribe((data: Sheet) => {
      this.currentSheet = data;
      this.formSetValues();
    }, (err: any) => {
      this.errorService.show();
    });
  }

  private formSetValues() {
    this.infosFormGroup.setValue({
      title: this.currentSheet.title,
      author: this.currentSheet.author,
      composer: this.currentSheet.composer,
      genre: this.currentSheet.genre,
      type: this.currentSheet.type,
      publisher: this.currentSheet.publisher,
      details: this.currentSheet.details
    });
    this.classificationFormGroup.setValue({
      boxNumber: this.currentSheet.boxNumber,
      trayNumber: this.currentSheet.trayNumber,
      recordingDate: this.currentSheet.recordingDate
    });
  }

  public saveSheet() {
    const sheet = new Sheet();
    sheet.title = this.infosFormGroup.get("title").value;
    sheet.author = this.infosFormGroup.get("author").value;
    sheet.composer = this.infosFormGroup.get("composer").value;
    sheet.genre = this.infosFormGroup.get("genre").value;
    sheet.type = this.infosFormGroup.get("type").value;
    sheet.publisher = this.infosFormGroup.get("publisher").value;
    sheet.details = this.infosFormGroup.get("details").value;
    sheet.boxNumber = this.classificationFormGroup.get("boxNumber").value;
    sheet.trayNumber = this.classificationFormGroup.get("trayNumber").value;
    sheet.recordingDate = this.classificationFormGroup.get("recordingDate").value;

    if (this.route.snapshot.params.id) {
      this.service.modifySheet(this.currentSheet.id, sheet).subscribe(() => {
        this.router.navigateByUrl(`/sheets/${this.currentSheet.id}`);
      }, (err: any) => {
        this.snackbar.openFromComponent(ErrorSnackbarComponent, { duration: 3000 });
      });
    } else {
      this.service.createSheet(sheet).subscribe(() => {
        this.router.navigateByUrl("/sheets");
      }, (err: any) => {
        this.snackbar.openFromComponent(ErrorSnackbarComponent, { duration: 3000 });
      });
    }
  }
}
