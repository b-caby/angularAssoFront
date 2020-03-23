import { Component, OnInit } from "@angular/core";
import { ActivatedRoute }    from "@angular/router";

import { BenefactorService } from "src/app/shared/services/benefactorService";
import { Benefactor } from "src/app/shared/models/benefactor";
import { ErrorsService } from "src/app/shared/services/errorsService";

@Component({
  selector: "app-benefactor-detail",
  templateUrl: "./benefactor-detail.component.html",
  styleUrls: ["../../../../src/assets/css/itemsdetails.scss"]
})
export class BenefactorDetailComponent implements OnInit {
  private benefactorId: number;
  public title: string;

  public benefactorInfos: Benefactor;

  constructor(private route: ActivatedRoute,
              private service: BenefactorService,
              private errorService: ErrorsService) { }

  ngOnInit() {
    this.title = "Détails bienfaiteur";
    this.benefactorId = this.route.snapshot.params.id;
    this.getBenefactorDetails(this.benefactorId);
  }

  private getBenefactorDetails(id: number) {
    this.service.getBenefactorDetails(id).subscribe((data: Benefactor) => {
      console.log(data);
      this.benefactorInfos = data[0];
    }, (err: any) => {
      this.errorService.show();
    });
  }

}
