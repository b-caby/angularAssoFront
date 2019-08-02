import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute }                     from "@angular/router";

import { ConcertService } from "src/app/shared/services/concertService";
import { Concert } from "src/app/shared/models/concert";

@Component({
  selector: "app-concert-steps",
  templateUrl: "./concert-steps.component.html",
  styleUrls: ["./concert-steps.component.scss"]
})
export class ConcertStepsComponent implements OnInit {
  public infosFormGroup: FormGroup;
  public audienceFormGroup: FormGroup;
  public sheetFormGroup: FormGroup;
  public title: string;
  private currentConcert: Concert;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private service: ConcertService) { }

  ngOnInit() {
    this.title = "Ajouter un concert";
    this.currentConcert = new Concert();

    if (this.route.snapshot.params.id) {
      this.title = "Modifier un concert";
      this.getConcertDetails(this.route.snapshot.params.id);
    }

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
    this.sheetFormGroup = this.formBuilder.group({});
  }

  private getConcertDetails(id: number) {
    this.service.GetConcertDetails(id).subscribe((data: Concert) => {
      this.currentConcert = data;
      this.formSetValues();
    });
  }

  private formSetValues() {
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
}
