import { Component, OnInit } from "@angular/core";

import { UserService }   from "../shared/services/userService";
import { Attendance }    from "../shared/models/attendance";
import { ErrorsService } from "../shared/services/errorsService";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["../../../src/assets/css/home.scss"]
})
export class HomeComponent implements OnInit {
  
  public title: string;
  public attendances: Attendance[];
  public isEdited: boolean;

  constructor(private service: UserService,
              private errorService: ErrorsService) { }

  ngOnInit() {
    this.title = "Planning";
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
    this.isEdited = true;
  }

  public modifyComment() {
    this.isEdited = true;
  }

  public isAttendanceYes(attendance: Attendance) {
    return attendance.status === 1;
  }

  public isAttendanceMaybe(attendance: Attendance) {
    return attendance.status === 3;
  }

  public isAttendanceNo(attendance: Attendance) {
    return attendance.status === 2;
  }
}
