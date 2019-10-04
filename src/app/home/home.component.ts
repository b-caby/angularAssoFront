import { Component, OnInit } from "@angular/core";

import { UserService }   from "../shared/services/userService";
import { Attendance }    from "../shared/models/attendance";
import { ErrorsService } from "../shared/services/errorsService";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public title: string;
  public attendances: Attendance[];

  constructor(private service: UserService,
              private errorService: ErrorsService) { }

  ngOnInit() {
    this.title = "Accueil";
    this.getAttendance();
  }

  private getAttendance() {
    this.service.getAttendance().subscribe((data: Attendance[]) => {
      this.attendances = data;
    }, (err: any) => {
      this.errorService.show();
    });
  }

  public modifyAttendance(attendance: Attendance, value: number) {
    attendance.status = value;
    attendance.isEdited = true;
  }

  public modifyComment(attendance: Attendance) {
    attendance.isEdited = true;
  }
}
