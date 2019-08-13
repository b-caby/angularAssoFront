import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit }                  from "@angular/core";
import { ActivatedRoute, Router }             from "@angular/router";

import { ConcertService } from "src/app/shared/services/concertService";
import { Concert }        from "src/app/shared/models/concert";

@Component({
  selector: "app-concert-steps",
  templateUrl: "./concert-steps.component.html",
  styleUrls: ["../../../../src/assets/css/itemssteps-style.scss"]
})
export class ConcertStepsComponent implements OnInit {

  private currentConcert: Concert;

  public title: string;
  public infosFormGroup: FormGroup;
  public audienceFormGroup: FormGroup;
  public sheetFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
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

  public saveConcert() {
    this.router.navigateByUrl("/sheets");
  }
}
