import { Component, OnInit } from "@angular/core";

import { UserService }   from "src/app/shared/services/userService";
import { User }          from "src/app/shared/models/user";
import { ErrorsService } from "src/app/shared/services/errorsService";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["../../../../src/assets/css/itemsdetails.scss"]
})
export class AccountComponent implements OnInit {

  public title: string;
  public userInfos: User = new User();

  constructor(private service: UserService,
              private errorService: ErrorsService) { }

  ngOnInit() {
    this.title = "Mon compte";
    this.getUserAccount();
  }

  private getUserAccount() {
    this.service.getAccount().subscribe((data: User) => {
      this.userInfos = data;
    }, (err: any) => {
      this.errorService.show();
    });
  }
}
