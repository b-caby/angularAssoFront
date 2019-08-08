import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit }                  from "@angular/core";
import { ActivatedRoute }                     from "@angular/router";

import { SheetService }  from "src/app/shared/services/sheetService";
import { Sheet }         from "src/app/shared/models/sheet";

@Component({
  selector: "app-sheet-steps",
  templateUrl: "./sheet-steps.component.html",
  styleUrls: ["../../../../src/assets/css/itemssteps-style.scss"]
})
export class SheetStepsComponent implements OnInit {

  private currentSheet: Sheet;

  public title: string;
  public infosFormGroup: FormGroup;
  public classificationFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private service: SheetService) {
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

  }
}
