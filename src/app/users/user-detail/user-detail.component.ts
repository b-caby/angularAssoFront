import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/userService';
import { ErrorsService } from 'src/app/shared/services/errorsService';
import { AuthService } from 'src/app/shared/services/authService';

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["../../../../src/assets/css/itemsdetails.scss"]
})
export class UserDetailComponent implements OnInit {

  public userInfos: User = new User();
  public title: string;
  public displayedColumns: string[];
  public canModify: boolean;
  public canDelete: boolean;
  
  constructor(private route: ActivatedRoute,
              private service: UserService,
              private errorService: ErrorsService,
              private auth: AuthService) {}

  ngOnInit() {
    this.title = "Détails musicien";
    this.canModify = this.canDelete = false;

    // TODO_V2
    /*this.canModify = this.auth.user.role === Roles.ADMIN;
    this.canDelete = this.auth.user.role === Roles.ADMIN;*/

    // Call to the API
    this.getUserDetails(this.route.snapshot.params.id);
  }

  private getUserDetails(id: number) {
    this.service.getuUserDetails(id).subscribe((data: User) => {
      this.userInfos = data;
    }, (err: any) => {
      this.errorService.show();
    });
  }
}