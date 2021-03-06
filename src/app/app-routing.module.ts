import { NgModule }             from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent }             from "./home/home.component";
import { ConcertsComponent }         from "./concerts/concerts.component";
import { SheetsComponent }           from "./sheets/sheets.component";
import { SheetDetailComponent }      from "./sheets/sheet-detail/sheet-detail.component";
import { ConcertDetailComponent }    from "./concerts/concert-detail/concert-detail.component";
import { SheetStepsComponent }       from "./sheets/sheet-steps/sheet-steps.component";
import { AuthComponent }             from "./auth/auth.component";
import { ShellComponent }            from "./shell/shell.component";
import { ConcertStepsComponent }     from "./concerts/concert-steps/concert-steps.component";
import { AuthGuard }                 from "./shared/authGuard";
import { Roles }                     from "./shared/enums/roles";
import { AccountComponent }          from "./users/account/account.component";
import { BenefactorsComponent }      from "./benefactors/benefactors.component";
import { BenefactorDetailComponent } from "./benefactors/benefactor-detail/benefactor-detail.component";
import { UsersComponent }            from "./users/users.component";
import { UserDetailComponent }       from "./users/user-detail/user-detail.component";

const routes: Routes = [
  { path: "", component: ShellComponent, children: [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    {
      path: "home",
      component: HomeComponent,
      canActivate: [AuthGuard]
    },
    {
      path: "sheets",
      component: SheetsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: "sheets/steps",
      component: SheetStepsComponent,
      canActivate: [AuthGuard], data: { roles: [Roles.OFFICER, Roles.ADMIN] }
    },
    {
      path: "sheets/steps/:id",
      component: SheetStepsComponent,
      canActivate: [AuthGuard], data: { roles: [Roles.OFFICER, Roles.ADMIN] }
    },
    {
      path: "sheets/:id",
      component: SheetDetailComponent,
      canActivate: [AuthGuard]
    },
    {
      path: "concerts",
      component: ConcertsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: "concerts/steps",
      component: ConcertStepsComponent,
      canActivate: [AuthGuard], data: { roles: [Roles.OFFICER, Roles.ADMIN] }
    },
    {
      path: "concerts/steps/:id",
      component: ConcertStepsComponent,
      canActivate: [AuthGuard], data: { roles: [Roles.OFFICER, Roles.ADMIN] }
    },
    {
      path: "concerts/:id",
      component: ConcertDetailComponent,
      canActivate: [AuthGuard]
    },
    {
      path: "benefactors",
      component: BenefactorsComponent,
      canActivate: [AuthGuard], data: { roles: [Roles.OFFICER, Roles.ADMIN] }
    },
    {
      path: "benefactors/:id",
      component: BenefactorDetailComponent,
      canActivate: [AuthGuard]
    },
    {
      path: "users",
      component: UsersComponent,
      canActivate: [AuthGuard], data: { roles: [Roles.OFFICER, Roles.ADMIN] }
    },
    {
      path: "users/:id",
      component: UserDetailComponent,
      canActivate: [AuthGuard]
    },
    {
      path: "account",
      component: AccountComponent,
      canActivate: [AuthGuard]
    }
  ]},
  { path: "auth", component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
