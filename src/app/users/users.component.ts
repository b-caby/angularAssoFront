import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator, MatSortable } from '@angular/material';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

import { User } from '../shared/models/user';
import { ErrorsService } from '../shared/services/errorsService';
import { AuthService } from '../shared/services/authService';
import { UserService } from '../shared/services/userService';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html"
})
export class UsersComponent implements OnInit, OnDestroy {

  private currentScreenWidth: string;
  private onScreenSizeChanged: Subscription;

  public title: string;
  public dataSource: MatTableDataSource<User>;
  public displayedColumns: string[];
  public canAddUsers: boolean;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private mediaObserver: MediaObserver,
              private service: UserService,
              private errorService: ErrorsService,
              private auth: AuthService) {}

  ngOnInit() {
    this.title = "Musiciens";
    this.canAddUsers = false;

    // TODO_V2
    /*this.canAddUsers = this.auth.user.role === Roles.ADMIN || this.auth.user.role === Roles.OFFICER;*/

    // Sorting starts with ascending titles
    // Sorting is case-insensitive
    this.sort.sort(({ id: "name", start: "asc" }) as MatSortable);
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();
    this.dataSource.paginator = this.paginator;

    // Gets and sets the size of the current screen
    this.onScreenSizeChanged = this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      if (change[0].mqAlias !== this.currentScreenWidth) {
        this.currentScreenWidth = change[0].mqAlias;
        this.setupTable();
      }
    });

    // Call to the API
    this.getAllUsers();
  }

  ngOnDestroy() {
    this.onScreenSizeChanged.unsubscribe();
  }

  private getAllUsers() {
    this.service.getAllUsers().subscribe((data: User[]) => {
      this.dataSource.data = data;
    }, (err: any) => {
      this.errorService.show();
    });
  }

  public applyFilter(filter: string) {
    this.dataSource.filter = filter;
  }

  private setupTable() {
    this.displayedColumns = ["name", "firstname", "phone", "email"];
    if (this.currentScreenWidth === "xs") {
      this.displayedColumns = ["name", "firstname"];
    }
    if (this.currentScreenWidth === "sm") {
      this.displayedColumns = ["name", "firstname", "phone"];
    }
  }
}