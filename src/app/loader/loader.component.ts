import { Component, OnInit } from "@angular/core";
import { LoaderService } from "../shared/services/loaderService";
import { Subject } from "rxjs";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"]
})
export class LoaderComponent implements OnInit {
  public color: string;
  public mode: string;
  public value: number;
  public isLoading: Subject<boolean>;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.color = 'primary';
    this.mode = 'indeterminate';
    this.value = 50;
    this.isLoading = this.loaderService.isLoading;
  }
}
