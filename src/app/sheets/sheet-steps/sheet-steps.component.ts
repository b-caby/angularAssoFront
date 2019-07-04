import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Sheet from "src/app/shared/models/sheet";
import { ActivatedRoute } from "@angular/router";

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
  selector: "app-sheet-steps",
  templateUrl: "./sheet-steps.component.html",
  styleUrls: ["./sheet-steps.component.scss"]
})
export class SheetStepsComponent implements OnInit {
  public infosFormGroup: FormGroup;
  public classificationFormGroup: FormGroup;
  public title = "Ajouter une partition";
  private currentSheet = new Sheet();

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
   }

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.title = "Modifier une partition";
      this.currentSheet = Object.assign(new Sheet(), query);
    }

    this.infosFormGroup = this.formBuilder.group({
      title: [this.currentSheet.title, Validators.required],
      author: [this.currentSheet.author],
      composer: [this.currentSheet.composer],
      genre: [this.currentSheet.genre],
      type: [this.currentSheet.type],
      publisher: [this.currentSheet.publisher],
      details: [this.currentSheet.details]
    });
    this.classificationFormGroup = this.formBuilder.group({
      boxNumber: [this.currentSheet.boxNumber],
      trayNumber: [this.currentSheet.trayNumber],
      recordingDate: [this.currentSheet.recordingDate]
    });
  }
}
